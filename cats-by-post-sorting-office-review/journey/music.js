/* Sample-clock soundtrack playback. The supplied edits already contain their joins. */
(function(root){
 'use strict';
 const rooms={office:'sorting_office',depot:'town_depot',train:'mail_train',cityhall:'city_hall',hall:'city_hall',parcel:'parcel_room',christmas:'christmas_post',winter:'christmas_post',boxroom:'box_room',box:'box_room'};
 function cueFor(view){if(!view?.active)return null;if(!view.game)return 'main';if(view.service==='night')return 'night_shift';if(view.service==='box')return 'box_room';return rooms[view.location]||'sorting_office'}
 function loopEndTime(frame){const time=frame/48000;return time*48000>frame?time-Number.EPSILON*Math.max(1,time):time}
 function create({base,fetcher,context,output,decode,canPlay}){
  let wanted=null,run='',ending=false,version=0,manifest=null,voice=null,pending=null,completed=null,lastError=null,decoding=false,queuedDecode=null;
  const cache=new Map(),voices=new Set(),stats={starts:0,errors:0,cancelled:0};
  function catalogue(){if(!manifest)manifest=fetcher(new URL('cues.json',base)).then(r=>{if(!r.ok)throw Error('Music catalogue unavailable');return r.json()}).then(data=>{if(data.sampleRate!==48000||data.channels!==2||!data.cues)throw Error('Invalid music timeline');return data}).catch(error=>{manifest=null;throw error});return manifest}
  function position(v,time=context().currentTime){const elapsed=Math.max(0,time-v.started)+v.offset;if(v.finishing&&time>=v.endingAt)return Math.min(v.buffer.duration,v.end+(time-v.endingAt));return elapsed<v.end?elapsed:v.start+(elapsed-v.end)%(v.end-v.start)}
  function retire(v,fade=.45){if(!v||v.stopped)return;v.stopped=true;const now=context().currentTime;const parameter=v.gain.gain,value=parameter.value;if(parameter.cancelAndHoldAtTime)parameter.cancelAndHoldAtTime(now);else{parameter.cancelScheduledValues(now);parameter.setValueAtTime(value,now)}v.gain.gain.linearRampToValueAtTime(0,now+fade);try{v.source.stop(now+fade)}catch{}if(voice===v)voice=null}
  function valid(task){return task.token===version&&task.id===wanted&&!task.controller.signal.aborted&&canPlay()}
  function discardQueued(){if(queuedDecode){queuedDecode.bytes=null;queuedDecode.resolve(null);queuedDecode=null}}
  async function decodeTask(task){
   if(!valid(task)){task.bytes=null;task.resolve(null);return}
   decoding=true;const bytes=task.bytes;task.bytes=null;
   try{task.resolve(await decode(bytes,48000))}catch(error){task.reject(error)}
   finally{decoding=false;const next=queuedDecode;queuedDecode=null;if(next)void decodeTask(next)}
  }
  function decodeLatest(bytes,id,token,controller){
   return new Promise((resolve,reject)=>{const task={bytes,id,token,controller,resolve,reject};if(decoding){discardQueued();queuedDecode=task}else void decodeTask(task)});
  }
  function invalidate(){version++;pending?.controller.abort();pending=null;discardQueued()}
  function finish(v){if(!v||v.finishing)return;const now=context().currentTime;v.endingAt=Math.max(now,v.started)+(v.end-position(v,now));v.finishing=true;v.source.loop=false}
  function start(id,buffer,cue,offset=0){
   const ctx=context(),source=ctx.createBufferSource(),gain=ctx.createGain(),now=ctx.currentTime,when=now+.025;
   // WebKit can read one outro sample when seconds round just past the loop-end frame.
   source.buffer=buffer;source.loop=true;source.loopStart=cue.introFrames/48000;source.loopEnd=loopEndTime(cue.introFrames+cue.loopFrames);
   gain.gain.value=0;source.connect(gain);gain.connect(output());
   const v={id,buffer,cue,source,gain,start:source.loopStart,end:source.loopEnd,started:when,offset,finishing:false,stopped:false};
   // Keep at most one departing voice, even during a burst of navigation.
   for(const old of voices)if(old!==voice){try{old.source.stop(now+.015)}catch{}}
   retire(voice);voice=v;voices.add(v);completed=null;
   source.onended=()=>{voices.delete(v);source.disconnect();gain.disconnect();if(voice===v){voice=null;if(!v.stopped)completed={id,run}}};
   source.start(when,offset);gain.gain.setValueAtTime(0,when);gain.gain.linearRampToValueAtTime(1,when+.45);stats.starts++;
   if(ending)finish(v);return true;
  }
  async function wake(){
   if(!wanted){invalidate();retire(voice);return false}
   if(!canPlay()){invalidate();return false}
   if(voice?.id===wanted){
    if(ending)finish(voice);
    else if(voice.finishing){if(context().currentTime<voice.endingAt){voice.finishing=false;voice.source.loop=true}else{const v=voice;return start(v.id,v.buffer,v.cue,v.start)}}
    return true;
   }
   if(completed?.id===wanted&&completed.run===run)return false;
   if(pending?.id===wanted)return pending.promise;
   const id=wanted,token=version,controller=new AbortController();
   const promise=(async()=>{
    try{
     const data=await catalogue(),cue=data.cues[id];if(!cue)throw Error('Unknown music cue');
     if(![cue.frames,cue.introFrames,cue.loopFrames,cue.endingFrames].every(x=>Number.isSafeInteger(x)&&x>0)||cue.frames!==cue.introFrames+cue.loopFrames+cue.endingFrames)throw Error('Invalid music frame counts');
     let buffer=cache.get(id);
     if(!buffer){
      if(!valid({id,token,controller})){stats.cancelled++;return false}
      const response=await fetcher(new URL(cue.file,base),{signal:controller.signal});if(!response.ok)throw Error('Music asset unavailable');const bytes=await response.arrayBuffer();
      if(!valid({id,token,controller})){stats.cancelled++;return false}
      // Native decode cannot be aborted. Keep one decode and only the latest waiting bytes.
      buffer=await decodeLatest(bytes,id,token,controller);if(!buffer){stats.cancelled++;return false}
     }
     // Source MP3 delay was removed before the lossless edits. Never trim these buffers again.
     if(buffer.sampleRate!==data.sampleRate||buffer.numberOfChannels!==data.channels||buffer.length!==cue.frames)throw Error('Decoded music does not match its sample timeline');
     if(token!==version||id!==wanted||!canPlay()||controller.signal.aborted){stats.cancelled++;return false}
     cache.delete(id);cache.set(id,buffer);while(cache.size>2)cache.delete(cache.keys().next().value);
     lastError=null;const ok=start(id,buffer,cue,completed?.id===id?cue.introFrames/48000:0);voice.cue=cue;return ok;
    }catch(error){if(controller.signal.aborted||token!==version){stats.cancelled++;return false}stats.errors++;lastError=String(error.message||error);return false}
    finally{if(pending?.controller===controller)pending=null}
   })();pending={id,promise,controller};return promise;
  }
  function select(id,options={}){
   const nextRun=options.run||'',nextEnding=options.ending===true,changed=id!==wanted||nextRun!==run||nextEnding!==ending;
   if(!changed)return !!voice;const changedCue=id!==wanted;
   if(changedCue){invalidate();if(!canPlay())retire(voice,.015)}
   wanted=id;run=nextRun;ending=nextEnding;return wake();
  }
  function inspect(){const ctx=context(),pos=voice&&ctx?position(voice):0;return{wanted,cue:voice?.id||completed?.id||null,phase:voice?(voice.finishing&&ctx.currentTime>=voice.endingAt?'ending':pos<voice.start?'intro':'loop'):completed?'finished':pending?'loading':lastError?'error':'idle',position:pos,endingAt:voice?.endingAt??null,bufferCount:cache.size,decoding,queued:queuedDecode?.id||null,pending:pending?.id||null,voices:voices.size,lastError,...stats}}
  return{select,wake,inspect,destroy(){wanted=null;invalidate();for(const v of voices)retire(v,.015);cache.clear()}};
 }
 const api={create,cueFor,loopEndTime};if(typeof module==='object'&&module.exports)module.exports=api;else root.PostMusic=api;
})(globalThis);
