(() => {
 'use strict';
 const $=id=>document.getElementById(id),M=JourneyModel,EXAMPLE=new URLSearchParams(location.search).get('example')==='depot'?'depot':'office',KEY='cats-by-post.journey.'+EXAMPLE+'.navigation.v1';
 const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const number=id=>id.replace('-','–');
 const places=[
  {id:'office',title:'The sorting office',label:'Sorting office',chapters:[1,2],count:15,x:.238,y:.687,focus:[.238,.592],art:'office'},
  {id:'depot',title:'The town depot',label:'Town depot',chapters:[3,4],count:25,x:.819,y:.515,focus:[.819,.417],art:'depot'},
  {id:'train',title:'The mail train',label:'Mail train',chapters:[5],count:15,x:.270,y:.40,focus:[.270,.334]},
  {id:'hall',title:'The city hall',label:'City hall',chapters:[6],count:15,x:.617,y:.35,focus:[.617,.274]},
  {id:'parcel',title:'The parcel room',label:'Parcel room',chapters:[7],count:15,x:.488,y:.54,focus:[.488,.466]},
  {id:'winter',title:'The Christmas post',label:'Christmas post',chapters:[8],count:15,x:.766,y:.70,focus:[.766,.626]}
 ];
 const chapters={1:['First post',5],2:['Ginger and blue',10],3:['The town depot',10],4:['Doors of their own',15],5:['A change of points',15],6:['Under the city',15],7:['Special delivery',15],8:['Home for Christmas',15]};
 const WORLD={width:2048,height:2048};
 let model,hadSave=false;try{const raw=localStorage.getItem(KEY);model=M.read(raw);hadSave=!!raw&&JSON.parse(raw)?.version===1}catch{model=M.read(null)}
 let levels=[],view=null,returnView=null,focusReturn=null,zoom=1,drag=null,dragClick=false,gameIsReady=false,gamePromiseResolve,gamePromiseReject,openingToken=0,toastTimer,loadingTimer;
 const gamePromise=new Promise((resolve,reject)=>{gamePromiseResolve=resolve;gamePromiseReject=reject});gamePromise.catch(()=>{});
 const frame=$('game'),vp=$('map-window'),world=$('map-world'),wide=matchMedia('(min-width:740px)');
 const allLevels=()=>Object.keys(chapters).flatMap(ch=>Array.from({length:chapters[ch][1]},(_,i)=>levels.find(l=>l.id===ch+'-'+(i+1))||{id:ch+'-'+(i+1),title:'Delivery '+number(ch+'-'+(i+1)),planned:true}));
 const next=()=>M.next(allLevels(),model.done);
 const active=()=>model.active&&levels.find(l=>l.id===model.active);
 const current=()=>active()||next()||levels.at(-1);
 const placeFor=id=>typeof id==='string'?places.find(p=>p.chapters.includes(+id.split('-')[0])):null;
 const count=p=>Object.keys(model.done).filter(id=>p.chapters.includes(+id.split('-')[0])).length;
 const chapterDone=ch=>Object.keys(model.done).filter(id=>+id.split('-')[0]===ch).length;
 const toast=text=>{clearTimeout(toastTimer);$('toast').textContent=text;$('toast').hidden=false;toastTimer=setTimeout(()=>$('toast').hidden=true,3200)};
 const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(model))}catch{toast('Your post will stay with you for this visit.')}};
 const announce=text=>{$('announcement').textContent=text};
 const showDialog=id=>{if(!$(id).open)$(id).showModal()};
 document.querySelectorAll('[data-close]').forEach(b=>b.onclick=()=>$(b.dataset.close).close());
 function mapAnchor(width=vp.clientWidth,height=vp.clientHeight,isWide=wide.matches){
  const lower=isWide?0:Math.min(235,$('next-dock').getBoundingClientRect().height+15);
  return [width/2,(Math.min(120,height*.25)+height-lower)/2];
 }
 function camera(){const a=mapAnchor();return[(vp.scrollLeft+a[0])/(WORLD.width*zoom),(vp.scrollTop+a[1])/(WORLD.height*zoom)]}
 function centreAt(p){const a=mapAnchor();vp.scrollTo({left:p[0]*WORLD.width*zoom-a[0],top:p[1]*WORLD.height*zoom-a[1],behavior:'instant'})}
 function minZoom(){return Math.max(.55,vp.clientWidth/WORLD.width,vp.clientHeight/WORLD.height)+.005}
 function changeZoom(value,point=camera()){
  zoom=Math.min(1.9,Math.max(minZoom(),value));world.style.width=WORLD.width*zoom+'px';world.style.height=WORLD.height*zoom+'px';centreAt(point);
  $('zoom-out').disabled=zoom<=minZoom()+.001;$('zoom-in').disabled=zoom>=1.9;
 }
 function recenter(){if(!current())return;const p=placeFor(current().id);if(vp.clientHeight<650)changeZoom(minZoom(),[p.focus[0],p.focus[1]+.05]);else centreAt(p.focus);announce('Back at '+p.title)}
 function renderPins(){
  if(!levels.length)return;const currentPlace=placeFor(current().id).id;
  $('map-pins').innerHTML=places.map(p=>`<button class="map-pin ${p.id===currentPlace?'current':''} ${view?.place===p.id?'selected':''}" style="left:${p.x*100}%;top:${p.y*100}%" data-place="${p.id}" aria-label="${p.title}, ${count(p)} of ${p.count} posted">${p.label}<small>${count(p)===p.count?'All posted':count(p)?count(p)+' of '+p.count+' posted':p.art?'Not reached yet':'Still to come'}</small></button>`).join('');
  $('map-pins').querySelectorAll('button').forEach(b=>b.onclick=e=>{if(dragClick){e.preventDefault();return}openPacket(b.dataset.place)});
 }
 function updateDock(){
  const l=current();if(!l)return;
  $('next-dock').setAttribute('aria-label',(active()?'Continue delivery ':'Open next delivery ')+number(l.id)+', '+l.title);
  $('next-dock').querySelector('.dock-address').innerHTML=`<strong>${active()?'Continue':'Next delivery'} ${number(l.id)}</strong><span>${esc(l.title)}</span><small>${l.planned?'More post is on the way':'Open the letter'}</small>`;
 }
 function setPaneState(){
  const open=wide.matches||!!view;$('post-pane').classList.toggle('open',open);
  const modal=!wide.matches&&!!view;$('post-pane').setAttribute('role',modal?'dialog':'region');
  if(modal)$('post-pane').setAttribute('aria-modal','true');else $('post-pane').removeAttribute('aria-modal');
  $('map-region').inert=modal;$('map-header').inert=modal;
 }
 function openPacket(id,ch){
  const p=places.find(p=>p.id===id);focusReturn=document.activeElement;
  let chapter=ch||p.chapters.find(c=>chapterDone(c)<chapters[c][1])||p.chapters.at(-1);
  view={type:'packet',place:id,chapter};returnView=null;renderPane();setPaneState();$('pane-back').focus({preventScroll:true});renderPins();
 }
 function openLetter(id,back=null){
  if(!M.valid(id))return;focusReturn=document.activeElement;model=M.select(model,id);
  returnView=back;view={type:'letter',id,place:placeFor(id).id};renderPane();setPaneState();$('pane-back').focus({preventScroll:true});renderPins();
 }
 function backToMap(){
  view=null;returnView=null;renderPane();setPaneState();renderPins();
  if(focusReturn?.isConnected&&!focusReturn.closest('#post-pane'))focusReturn.focus({preventScroll:true});else $('current-place').focus({preventScroll:true});
 }
 function paneBack(){
  if(view?.type==='letter'&&returnView){const old=returnView;returnView=null;view=old;renderPane();setPaneState();$('pane-content').scrollTop=old.scroll||0;return}
  backToMap();
 }
 function roomArt(p,cls='room-postcard'){
  return p.art?`<figure class="${cls}"><img src="../assets/${p.art}.png" alt="${p.title}" width="1280" height="880"></figure>`:`<div class="future-art"><img src="images/route.webp" alt="An illustration of ${p.title.toLowerCase()}" style="left:${-(p.focus[0]*800-155)}px;top:${-(p.focus[1]*800-105)}px"></div>`;
 }
 function envelope(l,p){return `<div class="letter-object"><img src="images/envelope.webp" alt="An addressed postal envelope" width="1561" height="1008"><span class="return-address">The postmistress<br>Cats by Post</span><div class="recipient"><span>${esc(l.title)}</span><span class="letter-place">${number(l.id)} · ${esc(p.label)}</span></div></div>`}
 function print(l,p){return `<img class="print-paper" src="images/print-paper.webp" alt="" width="1470" height="1070">${l.planned?`<span class="print-scene print-concept">${roomArt(p)}</span>`:`<img class="print-scene" src="images/level-prints/${l.id}.webp" alt="The starting arrangement for ${esc(l.title)}" width="960" height="640">`}<span class="print-reference">${number(l.id)}</span>`}
 function mailPreview(l,p){return `<div class="mail-preview"><img class="envelope-rear" src="images/envelope-open.webp" alt="" width="1301" height="1209"><button class="preview-print" id="preview-print" aria-label="Take a closer look at ${esc(l.title)}">${print(l,p)}<span class="print-loupe"><img src="icons/magnifying-glass-plus.svg" alt="" width="24" height="24"></span></button>${envelope(l,p)}</div>`}
 function inspectPrint(l,p){$('print-title').textContent=l.title;$('print-content').innerHTML=`<figure class="inspection-print">${print(l,p)}</figure>`;showDialog('print-dialog')}
 function earned(id){const stars=model.done[id]?.stars||{},keys=['delivered','tidy','firstPost'],labels=['Delivered','Tidy','First post'],crops=['20 70 576 752','600 70 578 752','1180 70 576 752'];return `<div class="earned-postage" aria-label="Earned postage">${keys.map((k,i)=>stars[k]?`<svg viewBox="${crops[i]}" role="img" aria-label="${labels[i]} stamp earned"><image href="../assets/cats-postage.png" width="1774" height="887"/></svg>`:'').join('')}</div>`}
 function renderPane(){
  if(!levels.length)return;
  const content=$('pane-content');$('current-letter').hidden=true;
  if(view?.type==='packet'){
   const p=places.find(p=>p.id===view.place),ch=view.chapter;let list=allLevels().filter(l=>+l.id.split('-')[0]===ch);
   $('pane-title').textContent=p.title;$('pane-back').textContent='Map';
   $('current-letter').hidden=false;$('current-letter').textContent=active()?'Continue '+number(active().id):'Next '+number(next()?.id||current().id);
   content.innerHTML=`${roomArt(p)}<p>${count(p)} of ${p.count} posted</p>${p.id===placeFor(current().id).id?`<button class="packet-current" data-letter="${current().id}">${active()?'Continue':'Next delivery'} ${number(current().id)}<small>${esc(current().title)}</small></button>`:''}<div class="chapter-tabs" role="group" aria-label="Chapter packets">${p.chapters.map(c=>`<button data-chapter="${c}" aria-pressed="${c===ch}">${chapters[c][0]}<small>${chapterDone(c)} of ${chapters[c][1]} posted</small></button>`).join('')}</div>${!p.art?'<p class="planned-note">A place for later post.</p><p>This part of the journey is still being drawn.</p>':''}<ol class="letters">${list.map(l=>{const delivered=!!model.done[l.id],ready=l.id===next()?.id||l.id===active()?.id,available=!l.planned&&(delivered||ready);return `<li><button data-letter="${l.id}" class="${ready?'letter-current':''}" ${available?'':'disabled'}><span class="route-number">${number(l.id)}</span><span class="route-name">${esc(l.title)}<small>${l.planned?'Still to come':delivered?'Delivered · revisit':l.id===active()?.id?'Your unfinished letter':ready?'Ready to open':'After earlier post'}</small></span></button></li>`}).join('')}</ol>`;
   content.querySelectorAll('[data-letter]').forEach(b=>b.onclick=()=>openLetter(b.dataset.letter,{...view,scroll:content.scrollTop}));
   content.querySelectorAll('[data-chapter]').forEach(b=>b.onclick=()=>{view={...view,chapter:+b.dataset.chapter};renderPane();content.querySelector(`[data-chapter="${view.chapter}"]`).focus({preventScroll:true})});
  }else{
   const l=allLevels().find(x=>x.id===(view?.id||current().id)),p=placeFor(l.id),isActive=l.id===active()?.id,done=!!model.done[l.id],replacing=!!active()&&!isActive;
   $('pane-title').textContent=p.title;$('pane-back').textContent=returnView?'Letters':wide.matches?'All letters':'Map';
   const cats=l.hatches?.reduce((sum,h)=>sum+h.cats.length,0),hatches=l.hatches?.length;
   const action=l.planned?'Still to come':isActive?'Continue sorting':done?'Replay this letter':replacing?'Switch to this letter':'Start sorting';
   content.innerHTML=`<article class="letter-view">${mailPreview(l,p)}${done?earned(l.id):''}${cats?`<div class="letter-facts"><span>${cats} ${cats===1?'cat':'cats'}</span><span>${hatches} ${hatches===1?'hatch':'hatches'}</span></div>`:''}${l.planned?'<p class="planned-note">More post is on the way.</p><p>This place will have its own room and deliveries.</p>':`${replacing?`<p class="route-warning">Opening this letter starts a fresh arrangement. Your unfinished ${number(active().id)} will be put away.</p>`:''}<button id="open-letter" class="primary">${action}</button><div class="letter-secondary"><button id="browse-packet">${done?'Other letters':'Browse this packet'}</button>${replacing?`<button id="keep-current">Keep sorting ${number(active().id)}</button>`:''}</div>`}</article>`;
   $('preview-print').onclick=()=>inspectPrint(l,p);
   $('open-letter')?.addEventListener('click',()=>startLetter(l.id));$('browse-packet')?.addEventListener('click',()=>openPacket(p.id,+l.id.split('-')[0]));$('keep-current')?.addEventListener('click',()=>openLetter(active().id));
  }
  content.scrollTop=0;
 }
 function placeIndex(){
  $('index-content').innerHTML=`<ul class="place-index">${places.map(p=>`<li><button data-index-place="${p.id}">${p.title}<small>${count(p)?count(p)+' of '+p.count+' posted':p.art?'Not reached yet':'Still to come'}</small></button></li>`).join('')}</ul>`;
  $('index-content').querySelectorAll('button').forEach(b=>b.onclick=()=>{$('index-dialog').close();centreAt(places.find(p=>p.id===b.dataset.indexPlace).focus);openPacket(b.dataset.indexPlace)});showDialog('index-dialog');
 }
 function closeDialogs(){document.querySelectorAll('dialog[open]').forEach(d=>d.close())}
 function gameReady(){
  gameIsReady=true;clearTimeout(loadingTimer);gamePromiseResolve(frame.contentWindow.APP);updateDock();
  const s=frame.contentWindow.APP.saved;if(model.active&&(!s||s.game.gm.L.id!==model.active||s.game.gm.mode==='won'||s.kind==='night')){model.active=null;save();updateDock();if(!view)renderPane()}
 }
 function setPlaying(on){
  $('game-stage').classList.toggle('active',on);$('game-stage').setAttribute('aria-hidden',String(!on));$('journey-app').inert=on;
  if(on){frame.focus();frame.contentWindow.focus()}else $('current-place').focus({preventScroll:true});
 }
 async function readyForGame(text){
  const token=++openingToken;$('journey-app').inert=true;$('opening-text').textContent=text;$('opening').hidden=false;$('cancel-opening').focus({preventScroll:true});$('retry-game').hidden=true;
  if(!gameIsReady)loadingTimer=setTimeout(()=>{if(token!==openingToken)return;$('opening-text').textContent='The post is taking a moment.';$('retry-game').hidden=false},15000);
  const app=await gamePromise;if(token!==openingToken)return null;
  clearTimeout(loadingTimer);$('opening').hidden=true;return app;
 }
 async function startLetter(id){
  const l=levels.find(x=>x.id===id);if(!l)return;closeDialogs();
  try{const app=await readyForGame('Opening '+l.title+'…');if(!app)return;
   const saved=app.saved,isResume=model.active===id&&saved?.game?.gm?.L?.id===id&&saved.game.gm.mode!=='won';
   if(isResume){app.dispatch('continue');app.engine.pause(true);app.engine.freeze(false)}else app.start('story',levels.indexOf(l));
   model={...model,active:id,selected:id};save();updateDock();setPlaying(true);
  }catch(e){openingError('The letter could not be opened.',e)}
 }
 function openingError(message,error){clearTimeout(loadingTimer);setPlaying(false);$('journey-app').inert=true;$('opening-text').textContent=message;$('opening').hidden=false;$('retry-game').hidden=false;$('retry-game').focus({preventScroll:true});console.error(error)}
 function delivered(id,stars){model=M.delivered(model,id,stars);save();renderPins();updateDock()}
 function leave(destination='map'){
  if(!gameIsReady)return;const app=frame.contentWindow.APP,s=app.engine.state();app.engine.pause(true);app.save();app.closeSheet(false);app.engine.freeze(true);
  if(s.shift||s.daily||s.practice||s.sample){model.active=null;save()}else if(s.mode!=='won'&&!model.done[s.id]){model.active=s.id;save()}
  setPlaying(false);updateDock();
  if(destination==='next'){openLetter(current().id);return}
  if(destination==='packet'){openPacket(placeFor(s.id)?.id||placeFor(current().id).id);return}
  if(destination==='cats'){showDialog('cats-dialog');return}
  view=null;returnView=null;renderPane();setPaneState();renderPins();
 }
 async function service(action){
  closeDialogs();try{const app=await readyForGame(action==='night'?'Opening the late post…':action==='daily'?'Opening today’s post…':'Opening the sorting desk…');if(!app)return;
   if(action==='settings'||action==='help'){app.home();app.dispatch(action)}
   else{const saved=app.saved,canContinue=saved&&((action==='night'&&saved.game.gm.shift&&saved.game.gm.shift.phase!=='ended')||(action==='daily'&&saved.kind==='daily'&&saved.game.gm.mode!=='won'));if(canContinue){app.dispatch('continue');app.engine.pause(true)}else{app.home();app.dispatch(action)}}
   setPlaying(true);
  }catch(e){openingError('The post could not be opened.',e)}
 }
 function resetExample(){
  if(!confirm('Start this example journey again? This clears only this prototype’s deliveries and saved route.'))return;
  try{Object.keys(localStorage).filter(k=>k.startsWith('cats-by-post.journey.')).forEach(k=>localStorage.removeItem(k))}catch{}location.reload();
 }
 function keys(e){
  if(document.querySelector('dialog[open]')||$('game-stage').classList.contains('active'))return;
  if(e.key==='Escape'&&view){e.preventDefault();paneBack();return}
  if(e.target===vp){const delta={ArrowLeft:[-100,0],ArrowRight:[100,0],ArrowUp:[0,-100],ArrowDown:[0,100]}[e.key];if(delta){e.preventDefault();vp.scrollBy(...delta)}}
  if(e.key==='Tab'&&!wide.matches&&view){const tabs=[...$('post-pane').querySelectorAll('button:not(:disabled),a,[tabindex="0"]')].filter(x=>!x.hidden),first=tabs[0],last=tabs.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}
 }
 vp.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse'||e.button!==0)return;drag={x:e.clientX,y:e.clientY,left:vp.scrollLeft,top:vp.scrollTop,moved:false};dragClick=false});
 vp.addEventListener('pointermove',e=>{if(!drag)return;const dx=e.clientX-drag.x,dy=e.clientY-drag.y;if(!drag.moved&&Math.hypot(dx,dy)>5){drag.moved=true;vp.setPointerCapture(e.pointerId);vp.classList.add('dragging')}if(drag.moved){vp.scrollLeft=drag.left-dx;vp.scrollTop=drag.top-dy}});
 const dragEnd=()=>{if(!drag)return;dragClick=drag.moved;drag=null;vp.classList.remove('dragging');setTimeout(()=>dragClick=false,0)};
 window.addEventListener('pointerup',dragEnd);vp.addEventListener('pointercancel',dragEnd);
 let size=[vp.clientWidth,vp.clientHeight,wide.matches];new ResizeObserver(()=>{const a=mapAnchor(...size),point=[(vp.scrollLeft+a[0])/(WORLD.width*zoom),(vp.scrollTop+a[1])/(WORLD.height*zoom)];size=[vp.clientWidth,vp.clientHeight,wide.matches];changeZoom(zoom,point)}).observe(vp);
 wide.addEventListener('change',()=>{setPaneState();if(levels.length)renderPane()});document.addEventListener('keydown',keys);
 $('current-place').onclick=()=>{recenter();if(wide.matches)backToMap()};$('place-index').onclick=placeIndex;$('cats-button').onclick=()=>showDialog('cats-dialog');$('menu-button').onclick=()=>showDialog('menu-dialog');
 $('pane-back').onclick=()=>{if(wide.matches&&!view)openPacket(placeFor(current().id).id);else paneBack()};$('current-letter').onclick=()=>openLetter(current().id,view?.type==='packet'?{...view,scroll:$('pane-content').scrollTop}:null);
 $('next-dock').onclick=()=>openLetter(current().id);$('zoom-out').onclick=()=>changeZoom(zoom-.16);$('zoom-in').onclick=()=>changeZoom(zoom+.16);
 document.querySelectorAll('[data-service]').forEach(b=>b.onclick=()=>service(b.dataset.service));$('cats-night').onclick=()=>service('night');$('about-study').onclick=()=>{closeDialogs();showDialog('about-dialog')};$('reset-example').onclick=resetExample;
 $('cancel-opening').onclick=()=>{openingToken++;clearTimeout(loadingTimer);$('opening').hidden=true;setPlaying(false)};
 $('retry-game').onclick=()=>{openingToken++;$('opening').hidden=true;location.reload()};
 window.Journey={startLetter,openPacket,openLetter,backToMap,recenter,placeIndex,leave,delivered,gameReady,service,isDelivered:id=>!!model.done[id],get state(){return{model,view,returnView,zoom,camera:camera(),gameReady:gameIsReady,wide:wide.matches,next:next()?.id}},get levels(){return levels}};
 fetch('levels.json').then(r=>{if(!r.ok)throw Error('Level index unavailable');return r.json()}).then(data=>{
  levels=data;if(EXAMPLE==='depot'&&!hadSave){levels.slice(0,33).forEach(l=>model.done[l.id]={stars:{delivered:true}});save()}updateDock();renderPane();renderPins();setPaneState();requestAnimationFrame(()=>{changeZoom(!wide.matches&&vp.clientHeight<650?.72:.85,placeFor(current().id).focus);recenter()});frame.src='play/index.html?v=journey-3&example='+EXAMPLE;
 }).catch(e=>{toast('The letter index could not be opened. Please reload.');console.error(e)});
})();
