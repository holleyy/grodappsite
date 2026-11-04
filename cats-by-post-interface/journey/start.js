/* Reversible entrance studies. Only the explicitly scoped example saves are used. */
(() => {
 'use strict';
 const $=id=>document.getElementById(id),params=new URLSearchParams(location.search),wait=ms=>new Promise(r=>setTimeout(r,ms));
 const studyMode=['scene','material','visit','compare'].some(key=>params.has(key)),example=params.get('example')==='depot'?'depot':'office';
 let scene=params.get('scene')==='desk'?'desk':'office',visit=params.get('visit')==='first'?'first':'returning',material=params.get('material')==='illustrated'?'illustrated':'paper',generation=0,storyReady=null,serviceReady=null,shown=null,context=null;
 const compare=scene==='office'&&params.has('material');
 const company=CompanyBox.create({dialog:$('cats-dialog'),getProgress:async()=>{await storyReady;return(serviceReady&&$('service-frame').contentWindow.Journey?.state.gameReady?appFor('service'):appFor('story')).engine.state().progress},onNight:()=>openService('night'),getReturnFocus:()=>$('collection-button')});
 function appFor(role){return $(role+'-frame').contentWindow.document.getElementById('game').contentWindow.APP}
 function journey(role='story'){return $(role+'-frame').contentWindow.Journey}
 function status(text){$('entry-status').textContent=text;$('entry-status').hidden=!text}
 function setScene(next){scene=next==='desk'?'desk':'office';document.body.dataset.scene=scene;renderArt();document.querySelectorAll('button[data-scene]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.scene===scene)));updateUrl()}
 function renderArt(){const art=scene==='office'&&material==='paper'?'office-paper':scene;document.body.dataset.material=material;$('wide-art').src='images/start/'+art+'-wide.webp';$('portrait-art').srcset='images/start/'+art+'-portrait.webp';document.querySelectorAll('[data-material]').forEach(b=>{if(b.tagName==='BUTTON')b.setAttribute('aria-pressed',String(b.dataset.material===material))})}
 function setMaterial(value){material=value==='paper'?'paper':'illustrated';renderArt();updateUrl()}
 function updateUrl(){const url=new URL(location.href);if(studyMode){url.searchParams.set('scene',scene);url.searchParams.set('visit',visit);if(compare)url.searchParams.set('material',material)}url.searchParams.set('v','home-21');history.replaceState(null,'',url)}
 function show(role){shown=role;for(const name of ['story','service']){const on=name===role;$(name+'-host').classList.toggle('open',on);$(name+'-host').inert=!on;$(name+'-host').setAttribute('aria-hidden',String(!on))}$('start-app').inert=!!role;$('back-to-start').hidden=!role;$('back-to-prototype').hidden=!!role;if(role)$(role+'-frame').focus()}
 function renderPrimary(){
  if(!storyReady||!journey()?.state.gameReady)return;
  const j=journey(),s=j.state,id=s.model.active||s.next,level=j.levels.find(l=>l.id===id),active=!!s.model.active;
  const saved=appFor('story').saved,g=saved?.game?.gm,service=!studyMode&&!active&&(g?.shift&&g.shift.phase!=='ended'?'night':g?.daily&&g.mode!=='won'?'daily':g?.practice&&g.mode!=='won'?'practice':null);
  const savedStory=!studyMode&&!active&&saved?.kind==='story'&&g?.mode!=='won'&&j.levels.find(l=>l.id===g?.L?.id);
  if(service||savedStory){context={id:savedStory?.id||null,active:true,planned:false,complete:false,service,resumeSaved:true};const title=savedStory?.title||{night:'Night Shift',daily:'Today’s post',practice:'Practice route'}[service];$('primary-heading').textContent=savedStory?'Continue '+savedStory.id.replace('-','–'):'Continue';$('primary-title').textContent=title;$('primary-detail').firstChild.textContent=savedStory?'Back to your arrangement ':service==='night'?'Back to your shift ':'Back to your route ';$('primary-letter').setAttribute('aria-label','Continue '+title);document.body.classList.toggle('reduced',appFor('story').prefs.reduced);return}
  context={id,active,planned:!!id&&!level,complete:!id};
  $('primary-heading').textContent=active?'Continue '+id.replace('-','–'):!level?'Places to post':id==='1-1'?'Your first letter':'Next delivery '+id.replace('-','–');
  $('primary-title').textContent=level?.title||'The next stop';
  $('primary-detail').firstChild.textContent=active?'Back to your arrangement ':!level?'Visit the map ':id==='1-1'?'Open the letter ':'Open your next letter ';
  $('primary-letter').setAttribute('aria-label',active?'Continue sorting '+level.title+', delivery '+id:!level?'Visit the postal map':'Open '+level.title+', delivery '+id);
  document.body.classList.toggle('reduced',appFor('story').prefs.reduced);
 }
 async function prepare(role,type){
  const frame=$(role+'-frame');frame.contentWindow.__startOldDocument=true;frame.src='index.html?v=home-21&example='+example+(type?'&study='+type:'');
  for(let i=0;i<250;i++){
   await wait(80);const j=frame.contentWindow.Journey;if(!frame.contentWindow.__startOldDocument&&j?.state.gameReady)return j;
  }
  throw Error('The example could not be opened. Please refresh to try again.');
 }
 async function bootStory(){
  const mine=++generation,type=visit;context=null;
  document.querySelectorAll('[data-visit]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.visit===visit)));
  $('primary-heading').textContent=visit==='first'?'Your first letter':'Continue 1–4';$('primary-title').textContent=visit==='first'?'First post':'Ginger and blue';$('primary-detail').firstChild.textContent=visit==='first'?'Open the letter ':'Back to your arrangement ';
  storyReady=(async()=>{
   const j=await prepare('story',studyMode?type:null);if(mine!==generation)return null;
   const app=appFor('story');
   if(studyMode&&type==='returning'&&!app.saved){
    await j.startLetter('1-4');app.engine.select('ginger');app.engine.tap(2,1);
    for(let i=0;i<4&&app.state.chutes.find(p=>p.x===2&&p.y===1)?.dir!=='D';i++)app.engine.tap(2,1);
    app.dispatch('send');app.engine.pause(true);app.save();j.leave('map');
   }
   if(mine===generation){renderPrimary();status('')}return j;
  })();
  storyReady.catch(e=>{if(mine===generation){status(e.message);console.error(e)}});
 }
 async function readyAction(fn){
  const mine=generation;try{if(!journey()?.state.gameReady)status('Bringing your post to the counter…');await storyReady;if(mine!==generation)return;status('');await fn()}catch(e){status(e.message);console.error(e)}
 }
 async function primary(){await readyAction(async()=>{renderPrimary();const j=journey();if(context.resumeSaved){await j.resumeSaved();show('story')}else if(context.active){await j.startLetter(context.id);show('story')}else if(context.planned||context.complete){j.backToMap();show('story')}else{j.openLetter(context.id);show('story')}})}
 async function back(){if(shown){const j=journey(shown);if(j?.state.gameReady&&$(shown+'-frame').contentDocument.getElementById('game-stage').classList.contains('active'))j.leave('map');show(null);renderPrimary();$('primary-letter').focus({preventScroll:true})}}
 async function openService(action){
  if(!studyMode&&context?.service===action){await primary();return}
  if(action==='settings'){await readyAction(async()=>{await journey().service(action,{returnTo:'main-menu'});show('story')});return}
  try{if(!serviceReady){status('Opening the post…');serviceReady=prepare('service','services')}const j=await serviceReady;await j.service(action,{returnTo:'main-menu'});status('');show('service')}catch(e){serviceReady=null;status(e.message);console.error(e)}
 }
 $('primary-letter').onclick=primary;$('back-to-start').onclick=back;
 if(compare){const nav=document.querySelector('.study-bar nav');nav.setAttribute('aria-label','Compare office artwork');nav.innerHTML='<button data-material="illustrated" aria-pressed="false">Illustrated</button><button data-material="paper" aria-pressed="true">Papercraft</button>';$('options-title').textContent='Try the office';document.querySelectorAll('button[data-material]').forEach(b=>b.onclick=async()=>{await back();setMaterial(b.dataset.material)})}
 document.querySelectorAll('button[data-scene]').forEach(b=>b.onclick=async()=>{await back();setScene(b.dataset.scene)});
 document.querySelectorAll('[data-service]').forEach(b=>b.onclick=()=>openService(b.dataset.service));
 $('places-button').onclick=()=>readyAction(()=>{journey().backToMap();show('story')});
 $('collection-button').onclick=()=>readyAction(()=>company.open());$('settings-button').onclick=()=>openService('settings');
 $('study-options').onclick=()=>$('options-dialog').showModal();$('close-options').onclick=()=>$('options-dialog').close();
 document.querySelectorAll('[data-visit]').forEach(b=>b.onclick=async()=>{await back();visit=b.dataset.visit;$('options-dialog').close();updateUrl();bootStory()});
 $('reset-study').onclick=async()=>{try{await back();const frame=$('story-frame');await new Promise(resolve=>{frame.addEventListener('load',resolve,{once:true});frame.src='about:blank'});const prefix='cats-by-post.start-study.'+visit+'.';for(const key of Object.keys(localStorage))if(key.startsWith(prefix))localStorage.removeItem(key);$('options-dialog').close();bootStory()}catch(e){status('This example could not be reset. Please refresh to try again.');console.error(e)}};
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&shown&&!document.querySelector('dialog[open]')){e.preventDefault();back()}});
 window.addEventListener('pageshow',()=>{if(storyReady)storyReady.then(renderPrimary,()=>{})});
 window.InterfaceNavigation={mainMenu:back};
 window.StartStudy={back,primary,setScene,setMaterial,openService,get state(){return{scene,material,compare,studyMode,visit,shown,context,ready:!!context&&!!journey()?.state.gameReady}},get journey(){return journey()},get serviceJourney(){return journey('service')}};
 document.body.classList.toggle('prototype-mode',studyMode);document.title=studyMode?'Cats by Post · The office':'Cats by Post';
 setScene(scene);bootStory();
})();
