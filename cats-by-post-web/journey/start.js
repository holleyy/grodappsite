/* The office is the entrance to one authoritative game session. */
(() => {
 'use strict';
 const $=id=>document.getElementById(id),frame=$('story-frame');
 let shown=false,context=null,ready=false,waiting=null;
 const journey=()=>frame.contentWindow.Journey;
 const app=()=>frame.contentWindow.document.getElementById('game')?.contentWindow.APP;
 const cat=OfficeCat.create({button:$('office-cat'),art:$('wide-art'),container:$('start-app'),active:()=>!shown&&!document.hidden&&!document.querySelector('dialog[open]')});
 const company=CompanyBox.create({dialog:$('cats-dialog'),getProgress:async()=>{await waiting;const s=app().engine.state();return{...s.progress,collection:s.collection}},onNight:()=>openService('night'),getSeenKey:()=> 'catsByPost.web.photographs.seen.v1',getReturnFocus:()=>$('collection-button')});
 function status(text){$('entry-status').textContent=text;$('entry-status').hidden=!text}
 function show(value){
  shown=!!value;$('story-host').classList.toggle('open',shown);$('story-host').inert=!shown;$('story-host').setAttribute('aria-hidden',String(!shown));$('start-app').inert=shown;
  if(shown)frame.focus();cat.refresh();
 }
 function renderPrimary(){
  if(!ready)return;journey().syncProgress();
  const j=journey(),state=j.state,info=app().savedInfo;
  const hasArrangement=state.model.active===info?.id||app().engine.state().chutes.length>0||app().engine.state().attempts>0;
  const presentationContinuing=info&&['intro','demo','enter','growth','exit','station','finale','thanks','credits'].includes(info.phase);
  const continuing=info&&(info.kind!=='story'||hasArrangement||presentationContinuing)&&(info.mode!=='won'||presentationContinuing)&&info.phase!=='ended';
  const id=continuing&&info.kind==='story'?info.id:state.model.active||state.next;
  const level=j.levels.find(l=>l.id===id);
  const service=continuing&&['night','daily','practice'].includes(info.kind)?info.kind:null;
  context={id,active:!!continuing||!!state.model.active,resume:!!continuing,service,complete:!level&&!service};
  $('primary-letter').querySelector('.entry-mark')?.remove();
  const identity=PostalIdentity.forLevel(id);
  if(identity&&!service)$('primary-letter').insertAdjacentHTML('beforeend',PostalIdentity.mark(identity.id,{className:'entry-mark',earned:PostalIdentity.chapterEarned(+id.split('-')[0],state.model.done),decorative:true}));
  $('primary-heading').textContent=service?'Continue':context.complete?'Every letter posted':context.active?'Continue '+id.replace('-','–'):id==='1-1'?'Your first letter':'Next delivery '+id.replace('-','–');
  $('primary-title').textContent=service?{night:'Night Shift',daily:'Today’s post',practice:'Practice'}[service]:level?.title||'Every cat, home at last';
  $('primary-detail').firstChild.textContent=context.complete?'Visit your places ':context.active?'Back to your arrangement ':'Open the letter ';
  $('primary-letter').setAttribute('aria-label',[$('primary-heading').textContent,$('primary-title').textContent].join(', '));
  document.body.classList.toggle('reduced',app().prefs.reduced);
 }
 async function action(fn){try{if(!ready)status('Bringing your post to the counter…');await waiting;status('');await fn()}catch(error){status('The post could not be opened. Please reload to try again.');console.error(error)}}
 async function primary(){await action(async()=>{renderPrimary();const j=journey();if(context.resume){show(true);await j.resumeSaved()}else if(context.active){show(true);await j.startLetter(context.id)}else if(context.complete){j.backToMap();show(true)}else{j.openLetter(context.id);show(true)}})}
 async function back(){if(ready){const j=journey();if(frame.contentDocument.getElementById('game-stage').classList.contains('active'))j.leave('map');show(false);renderPrimary();$('primary-letter').focus({preventScroll:true})}}
 async function openService(type){await action(async()=>{show(true);await journey().service(type,{returnTo:'main-menu'})})}
 $('primary-letter').onclick=primary;
 $('places-button').onclick=()=>action(()=>{journey().backToMap();show(true)});
 $('collection-button').onclick=()=>action(()=>company.open());
 $('settings-button').onclick=()=>openService('settings');
 document.querySelectorAll('[data-service]').forEach(b=>b.onclick=()=>openService(b.dataset.service));
 window.InterfaceNavigation={mainMenu:back};
 window.StartStudy={back,primary,openService,get state(){return{scene:'office',material:'paper',shown:shown?'story':null,context,ready}},get journey(){return journey()},get cat(){return cat.state}};
 waiting=new Promise((resolve,reject)=>{
  let deadline=setTimeout(()=>reject(Error('Game preparation timed out')),90000);
  const loaded=()=>{const j=journey();if(j?.state.gameReady){clearTimeout(deadline);ready=true;j.onProgress?.(renderPrimary);renderPrimary();status('');resolve(j)}else setTimeout(loaded,100)};
  frame.addEventListener('load',loaded,{once:true});{const url=new URL('index.html',location.href);url.searchParams.set('v',document.querySelector('meta[name=cbp-build]')?.content||'local');frame.contentWindow.location.replace(url.href)};
 });
 waiting.catch(error=>{status('The post is taking a moment. Reload to try again.');console.error(error)});
 window.addEventListener('pageshow',()=>{if(ready)renderPrimary()});
 document.addEventListener('keydown',event=>{if(event.key==='Escape'&&shown&&!document.querySelector('dialog[open]')){event.preventDefault();back()}});
 cat.refresh();
})();
