/* One presentation-only mixer is shared by the office, map, host and chapter frame. */
(function(root){
 'use strict';
 const Music=typeof module==='object'&&module.exports?require('./music.js'):root.PostMusic;
 function create({base,fetcher,Audio,Offline=root.OfflineAudioContext||root.webkitOfflineAudioContext,now=()=>performance.now()}){
  let ambienceEnabled=false,musicEnabled=false,effectsVolume=1,ambienceVolume=1,musicVolume=.35,effectsBus=null,ambienceBus=null,musicBus=null,decoder=null,musicScene=null,musicRun='',musicEnding=false;
  let enabled=false,unlocked=false,hidden=false,paused=false,gameActive=false,gameGeneration=0,volume=1,ctx=null,master=null,cues=null,manifest=null,generation=0,ambientGeneration=0,location=null,ambient=null,ambienceQueued=false,resuming=null,warmed=false;
  const buffers=new Map(),loading=new Map(),voices=new Set(),beds=new Set(),last=new Map(),recent=new Map(),keys=new Map(),views=new Map(),listeners=new Set();
  const stats={started:0,dropped:0,errors:0},critical=['ui_select','ui_back','turntable_place','turntable_rotate','turntable_pickup','run_send','stamp_apply'];
  const locations={office:'sorting_office',depot:'town_depot',train:'mail_train',cityhall:'city_hall',hall:'city_hall',parcel:'parcel_room',christmas:'christmas_post',winter:'christmas_post'};
  const music=Music.create({base:new URL('../music/',base),fetcher,context:()=>ctx,output:()=>musicBus,canPlay:()=>musicEnabled&&unlocked&&!hidden&&ctx?.state==='running',decode(bytes,rate){if(!decoder){if(!Offline)throw Error('Source-rate music decoding unavailable');decoder=new Offline(2,1,rate)}return decoder.decodeAudioData(bytes)}});
  function publish(event,file){stats.started++;for(const fn of listeners)try{fn({event,file})}catch{};}
  function ready(){if(!manifest)manifest=fetcher(new URL('cues.json',base)).then(r=>{if(!r.ok)throw Error('Audio catalogue unavailable');return r.json()}).then(data=>{cues=data;return data}).catch(()=>{manifest=null;stats.errors++;return null});return manifest;}
  function context(){if(!ctx&&Audio){ctx=new Audio();master=ctx.createGain();master.gain.value=.55*volume;effectsBus=ctx.createGain();ambienceBus=ctx.createGain();musicBus=ctx.createGain();effectsBus.gain.value=effectsVolume;ambienceBus.gain.value=ambienceVolume;musicBus.gain.value=musicEnabled?musicVolume:0;effectsBus.connect(master);ambienceBus.connect(master);musicBus.connect(master);const limiter=ctx.createDynamicsCompressor?.();if(limiter){limiter.threshold.value=-6;limiter.knee.value=12;limiter.ratio.value=4;limiter.attack.value=.003;limiter.release.value=.12;master.connect(limiter);limiter.connect(ctx.destination)}else master.connect(ctx.destination)}return ctx;}
  function eligible(domain='effects'){return (domain==='ambience'?ambienceEnabled:enabled)&&unlocked&&!hidden&&ctx?.state==='running';}
  function stopVoice(v,fade=.015){if(v.stopped){try{v.source.stop(ctx.currentTime+.01)}catch{}beds.delete(v);return}v.stopped=true;try{v.gain.gain.cancelScheduledValues(ctx.currentTime);v.gain.gain.setTargetAtTime(0,ctx.currentTime,Math.max(.003,fade/4));v.source.stop(ctx.currentTime+fade)}catch{}voices.delete(v);if(!v.source.loop||fade<=.02)beds.delete(v);}
  function stop(domain){for(const v of new Set([...voices,...beds]))if(!domain||v.domain===domain)stopVoice(v);}
  function gainFor(cue,file){return Math.pow(10,(cue.gains_db?.[file]??cue.gain_db??-18)/20);}
  function load(file,loop=false){
   if(buffers.has(file))return Promise.resolve(buffers.get(file).buffer);if(loading.has(file))return loading.get(file);
   const pending=fetcher(new URL(file,base)).then(r=>{if(!r.ok)throw Error('Audio asset unavailable');return r.arrayBuffer()}).then(bytes=>ctx.decodeAudioData(bytes)).then(buffer=>{buffers.set(file,{buffer,loop});if(loop){const cached=[...buffers].filter(([key,v])=>v.loop&&key!==file);while(cached.length>1)buffers.delete(cached.shift()[0])}return buffer}).catch(()=>{stats.errors++;return null}).finally(()=>loading.delete(file));loading.set(file,pending);return pending;
  }
  function start(buffer,event,file,level,domain,loop=false){
   const source=ctx.createBufferSource(),gain=ctx.createGain();source.buffer=buffer;source.loop=loop;gain.gain.value=loop?0:level;source.connect(gain);gain.connect(domain==='ambience'?ambienceBus:effectsBus);
   const v={source,gain,domain,event,file,stopped:false};voices.add(v);if(loop)beds.add(v);source.onended=()=>{voices.delete(v);beds.delete(v);try{source.disconnect();gain.disconnect()}catch{}};
   source.start();if(loop)gain.gain.setTargetAtTime(level,ctx.currentTime,.18);publish(event,file);return v;
  }
  async function warm(){const data=await ready();if(!data||!eligible()||warmed)return;warmed=true;for(const event of critical)for(const file of data[event]?.files||[])void load(file);for(const [event,cue]of Object.entries(data))if(!cue.loop&&event!=='cat_yawn'&&!critical.includes(event))for(const file of cue.files)void load(file);}
  async function unlock(){
   unlocked=true;if(!(enabled||ambienceEnabled||musicEnabled)||hidden||!Audio)return false;
   try{context();const pending=(ctx.state==='running'?Promise.resolve():Promise.resolve(ctx.resume())).then(()=>{if(hidden||ctx.state!=='running')return false;if(eligible())void warm();void ambience();void music.wake();return true}).catch(()=>{stats.errors++;return false});resuming=pending;
    try{return await pending}finally{if(resuming===pending)resuming=null}
   }catch{stats.errors++;return false}
  }
  function configure(p={}){
   const next=p.sound===true,nextAmbience=typeof p.ambience==='boolean'?p.ambience:next,nextMusic=p.music===true;
   const level=(value,previous)=>typeof value==='number'&&Number.isFinite(value)?Math.max(0,Math.min(1,value)):previous;
   volume=level(p.volume,volume);effectsVolume=level(p.effectsVolume,effectsVolume);ambienceVolume=level(p.ambienceVolume,ambienceVolume);musicVolume=level(p.musicVolume,musicVolume);
   if(next!==enabled){enabled=next;generation++;if(!enabled){stop('ui');stop('game')}}
   if(nextAmbience!==ambienceEnabled){ambienceEnabled=nextAmbience;ambientGeneration++;if(!ambienceEnabled){stop('ambience');ambient=null}}
   musicEnabled=nextMusic;
   if(ctx){master.gain.setTargetAtTime(.55*volume,ctx.currentTime,.03);effectsBus.gain.setTargetAtTime(effectsVolume,ctx.currentTime,.03);ambienceBus.gain.setTargetAtTime(ambienceVolume,ctx.currentTime,.03);musicBus.gain.setTargetAtTime(musicEnabled?musicVolume:0,ctx.currentTime,.03)}
   void music.wake();if(unlocked&&!hidden&&(enabled||ambienceEnabled||musicEnabled))void unlock();
  }

  async function play(event,{key,domain='ui',maxAge=450}={}){
   const requested=now(),token=generation,gameToken=gameGeneration;if(!enabled||!unlocked||hidden||domain==='game'&&(paused||!gameActive)){stats.dropped++;return false}
   if(key){if(keys.has(key))return false;keys.set(key,true);if(keys.size>512)keys.delete(keys.keys().next().value)}
   const gap=event==='cat_purr'?1200:event==='dog_woof'?650:event==='cat_arrive'||event==='parcel_heavy_arrive'?75:event==='cat_settle'||event==='ui_unavailable'?140:20;
   if(requested-(recent.get(event)??-Infinity)<gap){stats.dropped++;return false}recent.set(event,requested);
   const data=await ready();if(resuming){let timeout;await Promise.race([resuming,new Promise(resolve=>{timeout=setTimeout(resolve,Math.max(0,maxAge-(now()-requested)))})]);clearTimeout(timeout)}
   if(!data?.[event]||token!==generation||domain==='game'&&gameToken!==gameGeneration||!eligible()||now()-requested>maxAge){stats.dropped++;return false}const cue=data[event],files=cue.files;
   let available=files.filter(file=>buffers.has(file));
   if(!available.length){const first=await Promise.any(files.map(file=>load(file).then(buffer=>{if(!buffer)throw Error('Unavailable audio take');return file}))).catch(()=>null);if(first)available=[first]}
   if(token!==generation||domain==='game'&&gameToken!==gameGeneration||!eligible()||domain==='game'&&(paused||!gameActive)||now()-requested>maxAge){stats.dropped++;return false}
   if(!available.length)return false;const index=(available.indexOf(last.get(event))+1)%available.length,file=available[index];
   if([...voices].filter(v=>!v.source.loop).length>=10){stats.dropped++;return false}last.set(event,file);start(buffers.get(file).buffer,event,file,gainFor(cue,file),domain);for(const other of files)if(other!==file)void load(other);return true;
  }
  async function ambience(){
   const wanted=locations[location]?'ambience_'+locations[location]:null;if(!wanted||!eligible('ambience')){if(ambient)stopVoice(ambient,.65);ambient=null;return}
   if(ambient?.event===wanted&&!ambient.stopped)return;const token=++ambientGeneration,data=await ready();if(!data?.[wanted]||token!==ambientGeneration||!eligible('ambience'))return;
   const cue=data[wanted],file=cue.files[0],buffer=await load(file,true);if(!buffer||token!==ambientGeneration||!eligible('ambience'))return;
   for(const bed of beds)if(bed!==ambient)stopVoice(bed);if(ambient)stopVoice(ambient,.65);ambient=start(buffer,wanted,file,gainFor(cue,file),'ambience',true);
  }
  function updateAmbience(){if(ambienceQueued)return;ambienceQueued=true;queueMicrotask(()=>{ambienceQueued=false;void ambience()});}
  function setView(id,value){
   views.set(id,value);let best=null;for(const v of views.values())if(v.active&&(!best||v.priority>best.priority))best=v;
   const next=best?.location||null,nextPaused=!!best?.paused,nextGame=!!best?.game;if(nextPaused&&!paused||gameActive&&!nextGame){gameGeneration++;stop('game')}paused=nextPaused;gameActive=nextGame;
   if(next!==location){location=next;ambientGeneration++;updateAmbience()}
   for(const v of views.values())if(v.musicHold&&(!best||v.priority>=best.priority))return;
   const cue=best?Music.cueFor(best):'main',run=best?.musicRun||'',end=best?.musicEnding===true;if(cue!==musicScene||run!==musicRun||end!==musicEnding){musicScene=cue;musicRun=run;musicEnding=end;void music.select(cue,{run,ending:end})}
  }
  function visibility(value){hidden=!!value;generation++;ambientGeneration++;if(hidden){stop();ambient=null;ctx?.suspend().catch(()=>{})}else if((enabled||ambienceEnabled||musicEnabled)&&unlocked)void unlock();void music.wake();}
  return{configure,unlock,play,setView,visibility,stopGame(){gameGeneration++;stop('game')},subscribe(fn){listeners.add(fn);return()=>listeners.delete(fn)},inspect(){return{music:music.inspect(),mix:{music:musicEnabled?musicVolume:0,ambience:ambienceEnabled?ambienceVolume:0,effects:enabled?effectsVolume:0},enabled,unlocked,hidden,paused,gameActive,location,context:ctx?.state||'absent',voices:voices.size,beds:beds.size,bufferCount:buffers.size,ambienceBuffers:[...buffers.values()].filter(v=>v.loop).length,...stats}},destroy(){generation++;ambientGeneration++;music.destroy();stop();void ctx?.close();buffers.clear();loading.clear();listeners.clear()}};
 }
 if(typeof module==='object'&&module.exports){module.exports={create};return}
 let shared;try{shared=parent!==window&&parent.PostAudio}catch{}
 if(!shared){const script=document.currentScript.src;shared=create({base:new URL('../assets/audio/',script),fetcher:(url,options)=>{const asset=new URL(url),version=new URL(script).searchParams.get('v');if(version)asset.searchParams.set('v',version);return fetch(asset,options)},Audio:root.AudioContext||root.webkitAudioContext});shared.configure(root.PostPreferences?.read());document.addEventListener('visibilitychange',()=>shared.visibility(document.hidden));root.addEventListener('pagehide',()=>shared.visibility(true));root.addEventListener('pageshow',()=>shared.visibility(document.hidden));root.addEventListener('storage',e=>{if(e.key==='catsByPost.web.preferences.v1'||e.key===null)shared.configure(root.PostPreferences?.read())})}
 root.PostAudio=shared;
 for(const type of ['pointerdown','touchend','keydown'])document.addEventListener(type,e=>{if(e.isTrusted)void shared.unlock()},{capture:true,passive:true});
 const semantic=new Set(['send','pause','resume','stop','arrange','piece','undo','clear','confirm-hint','place-tile','flip-mail','stamp-info','next','next-unsolved','closer','zoom','pan','place','level','start-practice','start-daily','start-random','start-weekly']);
 document.addEventListener('click',e=>{
  const b=e.target.closest?.('button,summary,a[href]');if(!e.isTrusted||!b||b.disabled||b.closest('[inert]')||b.closest('.company-dialog')||semantic.has(b.dataset.action))return;
  if(b.matches('#primary-letter,#next-dock,#current-letter,#open-letter,#collection-button,#cats-button,#office-cat,#preview-print,#packet-print,[data-letter]'))return;
  void shared.play(/back|close|cancel|put.away/i.test(b.id+' '+(b.dataset.action||''))?'ui_back':'ui_select');
 });
})(globalThis);
