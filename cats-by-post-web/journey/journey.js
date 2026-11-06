(() => {
 'use strict';
 const params=new URLSearchParams(location.search),STUDY=null;
 const $=id=>document.getElementById(id),M=JourneyModel,EXAMPLE='office',KEY='catsByPost.web.navigation.v2';
 const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const number=id=>id.replace('-','–');
 const uiIcon=(name,cls='')=>`<img class="menu-icon ${cls}" src="icons/${name}.svg" alt="" width="24" height="24">`;
 const places=[
  {id:'office',title:'The sorting office',label:'Sorting office',chapters:[1,2],count:15,x:.238,y:.687,focus:[.238,.592],art:'office'},
  {id:'depot',title:'The town depot',label:'Town depot',chapters:[3,4],count:25,x:.819,y:.515,focus:[.819,.417],art:'depot'},
  {id:'train',title:'The mail train',label:'Mail train',chapters:[5],count:15,x:.270,y:.40,focus:[.270,.334],art:'train'},
  {id:'hall',title:'The city hall',label:'City hall',chapters:[6],count:15,x:.617,y:.35,focus:[.617,.274],art:'hall'},
  {id:'parcel',title:'The parcel room',label:'Parcel room',chapters:[7],count:15,x:.488,y:.54,focus:[.488,.466],art:'parcel'},
  {id:'winter',title:'The Christmas post',label:'Christmas post',chapters:[8],count:15,x:.766,y:.70,focus:[.766,.626],art:'winter'}
 ];
 const chapters={1:['First post',5],2:['Ginger and blue',10],3:['The town depot',10],4:['Doors of their own',15],5:['A change of points',15],6:['Under the city',15],7:['Special delivery',15],8:['Home for Christmas',15]};
 const WORLD={width:2048,height:2048};
 let model,hadSave=false;try{const raw=localStorage.getItem(KEY);model=M.read(raw,{empty:STUDY==='first'});hadSave=!!raw&&JSON.parse(raw)?.version===2}catch{model=M.read(null,{empty:STUDY==='first'})}
 let lastDelivery=null,levels=[],view=null,returnView=null,focusReturn=null,zoom=1,drag=null,dragClick=false,gameIsReady=false,gamePromiseResolve,gamePromiseReject,openingToken=0,toastTimer,loadingTimer,serviceReturn='map',letterGeneration=0;
 const gamePromise=new Promise((resolve,reject)=>{gamePromiseResolve=resolve;gamePromiseReject=reject});gamePromise.catch(()=>{});
 const frame=$('game'),vp=$('map-window'),world=$('map-world'),wide=matchMedia('(min-width:740px)');
 const progressListeners=new Set();
 const company=CompanyBox.create({dialog:$('cats-dialog'),getProgress:async()=>{const app=gameIsReady?frame.contentWindow.APP:await gamePromise;const s=app.engine.state();return{...s.progress,collection:s.collection}},getSeenKey:()=> 'catsByPost.web.photographs.seen.v1',onNight:()=>service('night'),getReturnFocus:()=>$('cats-button')});
 const allLevels=()=>levels;
 const next=()=>M.next(allLevels(),model.done);
 const active=()=>model.active&&levels.find(l=>l.id===model.active);
 const current=()=>active()||next()||allLevels().at(-1);
 const placeFor=id=>typeof id==='string'?places.find(p=>p.chapters.includes(+id.split('-')[0])):null;
 function deliveryContext(id){const context=M.continuation(model,allLevels(),id),letter=context.letter,p=letter&&placeFor(letter.id);return{...context,placeId:placeFor(id)?.id,chapterJustCompleted:lastDelivery?.id===id?lastDelivery.chapterJustCompleted:context.chapterJustCompleted,chapterTitle:chapters[+id.split('-')[0]]?.[0],placeChanged:!!letter&&placeFor(id)?.id!==p.id,letter:letter?{id:letter.id,title:letter.title,place:p.label,planned:!!letter.planned}:null}}
 const count=p=>Object.keys(model.done).filter(id=>p.chapters.includes(+id.split('-')[0])).length;
 const chapterDone=ch=>Object.keys(model.done).filter(id=>+id.split('-')[0]===ch).length;
 const toast=text=>{clearTimeout(toastTimer);$('toast').textContent=text;$('toast').hidden=false;toastTimer=setTimeout(()=>$('toast').hidden=true,3200)};
 const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(M.navigation(model)))}catch{toast('Your post will stay with you for this visit.')}};
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
  $('map-pins').innerHTML=places.map(p=>`<button class="map-pin ${p.id===currentPlace?'current':''} ${view?.place===p.id?'selected':''}" style="left:${p.x*100}%;top:${p.y*100}%" data-place="${p.id}" aria-label="${p.title}, ${count(p)} of ${p.count} posted">${PostalIdentity.mark(p.id,{className:"pin-mark",earned:PostalIdentity.earnedChapters(p.id,model.done).length>0,decorative:true})}<span class="pin-copy">${p.label}<small>${count(p)===p.count?'All posted':count(p)?count(p)+' of '+p.count+' posted':p.art?'Not reached yet':'Still to come'}</small></span></button>`).join('');
  $('map-pins').querySelectorAll('button').forEach(b=>b.onclick=e=>{if(dragClick){e.preventDefault();return}openPacket(b.dataset.place)});
 }
 function updateDock(){
  const l=current();if(!l)return;
  $('next-dock').querySelector('.dock-mark')?.remove();$('next-dock').insertAdjacentHTML('beforeend',PostalIdentity.mark(placeFor(l.id).id,{className:'dock-mark',decorative:true}));
  const planned=l.planned,p=placeFor(l.id);
  if(!active()&&!next()){$('next-dock').setAttribute('aria-label','All letters posted. Browse your places.');$('next-dock').querySelector('.dock-address').innerHTML='<strong>All letters posted</strong><span>Your places</span><small>Visit the map</small>';return}
  $('next-dock').setAttribute('aria-label',planned?'See the next stop, '+p.title+'. Not reached yet.':(active()?'Continue delivery ':'Open next delivery ')+number(l.id)+', '+l.title);
  $('next-dock').querySelector('.dock-address').innerHTML=planned?`<strong>The next stop</strong><span>${esc(p.title)}</span><small>More post is on the way</small>`:`<strong>${active()?'Continue':'Next delivery'} ${number(l.id)}</strong><span>${esc(l.title)}</span><small>Open the letter</small>`;
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
  returnView=back;view={type:'letter',id,place:placeFor(id).id};renderPane();setPaneState();PaperMotion.letter($('pane-content').querySelector('.mail-preview'));$('pane-back').focus({preventScroll:true});renderPins();
 }
 function backToMap(){
  view=null;returnView=null;renderPane();setPaneState();renderPins();
  if(focusReturn?.isConnected&&!focusReturn.closest('#post-pane'))focusReturn.focus({preventScroll:true});else $('current-place').focus({preventScroll:true});
 }
 function paneBack(){
  if(view?.type==='letter'&&returnView){const old=returnView;returnView=null;view=old;renderPane();setPaneState();$('pane-content').scrollTop=old.scroll||0;return}
  if(wide.matches&&view?.type==='letter'){openPacket(view.place,+view.id.split('-')[0]);return}
  backToMap();
 }
 function roomArt(p,cls='room-postcard'){
  return `<figure class="${cls}"><img src="images/level-prints/${p.chapters[0]}-1.webp" alt="${p.title}" width="960" height="640"></figure>`;
 }
 function envelope(l,p){return `<div class="letter-object"><img src="images/envelope.webp" alt="An addressed postal envelope" width="1561" height="1008"><span class="return-address">The postmistress<br>Cats by Post</span><div class="recipient"><span>${esc(l.title)}</span><span class="letter-place">${number(l.id)} · ${esc(p.label)}</span></div>${PostalIdentity.mark(p.id,{className:"envelope-mark",earned:PostalIdentity.chapterEarned(+l.id.split("-")[0],model.done),decorative:true})}</div>`}
 function print(l,p){return `<img class="print-paper" src="images/print-paper.webp" alt="" width="1470" height="1070">${l.planned?`<span class="print-scene print-concept">${roomArt(p)}</span>`:`<img class="print-scene" src="images/level-prints/${l.id}.webp?v=${document.querySelector('meta[name=cbp-build]')?.content||'web'}" alt="The starting arrangement for ${esc(l.title)}" width="960" height="640">`}${l.id==='1-4'?'<span class="print-detail"><span class="print-detail-plane"><img class="trolley-cat" src="images/observations/trolley-cat.webp" alt="A ginger cat is already asleep on a parcel on the trolley" width="160" height="130"></span></span>':''}<span class="print-reference">${number(l.id)}</span>`}
 function mailPreview(l,p){return `<div class="mail-preview"><img class="envelope-rear" src="images/envelope-open.webp" alt="" width="1301" height="1209"><img class="envelope-flap" src="images/envelope-open.webp" alt="" width="1301" height="1209"><button class="preview-print" id="preview-print" aria-label="Take a closer look at ${esc(l.title)}">${print(l,p)}<span class="print-loupe"><img src="icons/magnifying-glass-plus.svg" alt="" width="24" height="24"></span></button>${envelope(l,p)}</div>`}
 function inspectPrint(l,p){PaperMotion.finish($('pane-content'));$('print-title').textContent=l.title;$('print-content').innerHTML=`<figure class="inspection-print">${print(l,p)}</figure>`;showDialog('print-dialog')}
 function paneBackLabel(label){$('pane-back').innerHTML=uiIcon('arrow-left')+`<span class="sr-only">${label}</span>`;$('pane-back').title=label}
 function inspectPostmark(p,ch){
  PaperMotion.finish($('pane-content'));$('print-title').textContent=chapters[ch][0];
  $('print-content').innerHTML=`<figure class="postmark-inspection">${PostalIdentity.mark(p.id,{earned:true,reference:'Chapter '+ch,label:chapters[ch][0]+' chapter postmark earned'})}<figcaption>${esc(chapters[ch][0])}</figcaption><p>${chapters[ch][1]} letters posted.</p></figure>`;showDialog('print-dialog');
 }
 function chapterPostmarks(p,onlyChapter){
  const earned=PostalIdentity.earnedChapters(p.id,model.done).filter(ch=>!onlyChapter||ch===onlyChapter);if(!PostalIdentity.forPlace(p.id)?.art||!earned.length)return '';
  return `<div class="chapter-postmarks" aria-label="Earned chapter postmarks">${earned.map(ch=>`<button class="chapter-postmark" data-inspect-postmark="${ch}" aria-label="Inspect ${esc(chapters[ch][0])} chapter postmark">${PostalIdentity.mark(p.id,{earned:true,reference:'Chapter '+ch,decorative:true})}<span>${esc(chapters[ch][0])}</span></button>`).join('')}</div>`;
 }
 function packetPreview(p,ch){const list=allLevels().filter(l=>+l.id.split('-')[0]===ch);return list.find(l=>l.id===current().id)||list.find(l=>!model.done[l.id])||list.at(-1)}
 function menu(){
  const l=levels.length?current():null;$('menu-current').hidden=!l;if(!l){showDialog('menu-dialog');return}$('menu-current').innerHTML=`${uiIcon('envelope-open')}<span><strong>${l.planned?'The next stop':active()?'Continue sorting':'Your next letter'}</strong><small>${l.planned?esc(placeFor(l.id).title):number(l.id)+' · '+esc(l.title)}</small></span>${uiIcon('arrow-right','row-arrow')}`;
  $('menu-current').onclick=()=>{closeDialogs();if(l.planned)openPacket(placeFor(l.id).id);else if(active())startLetter(l.id);else openLetter(l.id)};showDialog('menu-dialog');
 }
 function earned(id){const stars=model.done[id]?.stars||{},keys=['delivered','tidy','firstPost'],labels=['Delivered','Tidy','First post'],crops=['20 70 576 752','600 70 578 752','1180 70 576 752'];return `<div class="earned-postage" aria-label="Earned postage">${keys.map((k,i)=>stars[k]?`<svg viewBox="${crops[i]}" role="img" aria-label="${labels[i]} stamp earned"><image href="../assets/cats-postage.png" width="1774" height="887"/></svg>`:'').join('')}</div>`}
 function renderPane(){
  if(!levels.length)return;
  const content=$('pane-content');$('current-letter').hidden=true;
  if(view?.type==='packet'){
   const p=places.find(p=>p.id===view.place),ch=view.chapter,preview=packetPreview(p,ch);let list=allLevels().filter(l=>+l.id.split('-')[0]===ch);
   $('pane-title').textContent=p.title;paneBackLabel('Map');
   $('current-letter').hidden=!!current().planned||(!active()&&!next());$('current-letter').textContent=active()?'Continue '+number(active().id):'Next '+number(next()?.id||current().id);
   content.innerHTML=`<div class="packet-hero"><button class="preview-print packet-print" id="packet-print" aria-label="Take a closer look at ${esc(preview.title)}">${print(preview,p)}<span class="print-loupe">${uiIcon('magnifying-glass-plus')}</span></button><div class="packet-postal-line">${chapterPostmarks(p,ch)||PostalIdentity.mark(p.id,{className:"packet-place-mark",decorative:true})}<p class="packet-progress">${count(p)} of ${p.count} posted</p></div></div><div class="chapter-tabs" role="group" aria-label="Chapter packets">${p.chapters.map(c=>`<button data-chapter="${c}" aria-pressed="${c===ch}"><span class="chapter-name">${chapters[c][0]}</span><span class="chapter-caption"><small>${chapterDone(c)} of ${chapters[c][1]} posted</small></span></button>`).join('')}</div>${!p.art?'<p class="planned-note">Not reached yet.</p>':''}<ol class="letters">${list.map(l=>{const delivered=!!model.done[l.id],ready=!l.planned&&(l.id===next()?.id||l.id===active()?.id),available=!l.planned&&(delivered||ready);return `<li><button data-letter="${l.id}" class="${ready?'letter-current':''} ${delivered?'letter-posted':''}" ${ready?'aria-current="step"':''} ${available?'':'disabled'}><span class="route-number">${number(l.id)}</span><span class="route-name">${esc(l.title)}<small>${l.planned?'Still to come':delivered?'Posted':l.id===active()?.id?'Your unfinished letter':ready?'Ready to open':'After earlier post'}</small></span>${uiIcon(delivered?'check':ready?'envelope-open':'lock-simple','letter-state')}</button></li>`}).join('')}</ol>`;
   $('packet-print').onclick=()=>inspectPrint(preview,p);
   content.querySelectorAll('[data-letter]').forEach(b=>b.onclick=()=>openLetter(b.dataset.letter,{...view,scroll:content.scrollTop}));
   content.querySelectorAll('[data-chapter]').forEach(b=>b.onclick=()=>{view={...view,chapter:+b.dataset.chapter};renderPane();content.querySelector(`[data-chapter="${view.chapter}"]`).focus({preventScroll:true})});
  }else{
   const l=allLevels().find(x=>x.id===(view?.id||current().id)),p=placeFor(l.id),isActive=l.id===active()?.id,done=!!model.done[l.id],replacing=!!active()&&!isActive;
   $('pane-title').textContent=p.title;paneBackLabel(returnView?'Letters':wide.matches?'All letters':'Map');
   const cats=l.hatches?.reduce((sum,h)=>sum+h.cats.length,0),hatches=l.hatches?.length;
   const action=l.planned?'Still to come':isActive?'Continue sorting':done?'Replay this letter':replacing?'Switch to this letter':'Start sorting';
   content.innerHTML=`<article class="letter-view" aria-label="${esc((done?'Posted letter ':isActive?'Unfinished letter ':'Letter ')+number(l.id)+', '+l.title)}">${mailPreview(l,p)}${done?earned(l.id)+chapterPostmarks(p,+l.id.split('-')[0]):''}${cats?`<div class="letter-facts"><span>${cats} ${cats===1?'cat':'cats'}</span><span>${hatches} ${hatches===1?'hatch':'hatches'}</span>${l.bigCount?`<span>${l.bigCount} large</span>`:''}</div>`:''}${l.planned?'<p class="planned-note">Not reached yet.</p><p>This place will have its own room and deliveries.</p>':`${replacing?`<p class="route-warning">Opening this letter starts a fresh arrangement. Your unfinished ${number(active().id)} will be put away.</p>`:''}<button id="open-letter" class="primary">${action}</button><div class="letter-secondary"><button id="browse-packet">${done?'Other letters':'Browse this packet'}</button>${replacing?`<button id="keep-current">Keep sorting ${number(active().id)}</button>`:''}</div>`}</article>`;
   $('preview-print').onclick=()=>inspectPrint(l,p);
   $('open-letter')?.addEventListener('click',()=>startLetter(l.id));$('browse-packet')?.addEventListener('click',()=>openPacket(p.id,+l.id.split('-')[0]));$('keep-current')?.addEventListener('click',()=>openLetter(active().id));
  }
  content.querySelectorAll('[data-inspect-postmark]').forEach(b=>b.onclick=()=>inspectPostmark(places.find(p=>p.id===(view?.place||placeFor(current().id).id)),+b.dataset.inspectPostmark));
  content.scrollTop=0;
 }
 function placeIndex(){
  $('index-content').innerHTML=`<ul class="place-index">${places.map(p=>`<li><button data-index-place="${p.id}" ${p.id===placeFor(current().id).id?'aria-current="location"':''}><span class="index-art">${p.art?`<img src="../assets/${p.art}.png" alt="" width="1280" height="880">`:`<img class="index-map-crop" src="images/route.webp" alt="" style="left:${40-p.focus[0]*240}px;top:${32-p.focus[1]*240}px">`}</span><span>${p.title}<small>${count(p)?count(p)+' of '+p.count+' posted':p.art?'Not reached yet':'Still to come'}</small></span>${uiIcon('caret-right','row-arrow')}</button></li>`).join('')}</ul>`;
  $('index-content').querySelectorAll('button').forEach(b=>b.onclick=()=>{$('index-dialog').close();centreAt(places.find(p=>p.id===b.dataset.indexPlace).focus);openPacket(b.dataset.indexPlace)});showDialog('index-dialog');
 }
 function closeDialogs(){document.querySelectorAll('dialog[open]').forEach(d=>d.close())}
 function syncProgress(){
  if(!gameIsReady)return;const s=frame.contentWindow.APP.engine.state(),before=JSON.stringify(model.done);if(s.mode==='won'&&s.lifecycle?.winRecorded&&!model.done[s.id])lastDelivery={id:s.id,chapterJustCompleted:M.continuation(model,allLevels(),s.id).chapterJustCompleted};model=M.fromProgress(model,s.progress);
  if(before!==JSON.stringify(model.done)){renderPins();updateDock();if(!$('game-stage').classList.contains('active'))renderPane();for(const fn of progressListeners)fn()}
 }
 function gameReady(){
  if(gameIsReady)return;gameIsReady=true;clearTimeout(loadingTimer);const app=frame.contentWindow.APP;model=M.fromProgress(model,app.engine.state().progress);
  const info=app.savedInfo;if(model.active&&(!info||info.id!==model.active||info.mode==='won'||info.kind!=='story'))model.active=null;
  save();gamePromiseResolve(app);updateDock();renderPane();renderPins();
 }
 function setPlaying(on){
  $('game-stage').classList.toggle('active',on);$('game-stage').setAttribute('aria-hidden',String(!on));$('journey-app').inert=on;
  if(on){frame.focus();frame.contentWindow.focus()}else $('current-place').focus({preventScroll:true});
 }
 async function readyForGame(text){
  const token=++openingToken;$('journey-app').inert=true;$('opening-text').textContent=text;$('opening').hidden=false;$('cancel-opening').focus({preventScroll:true});$('retry-game').hidden=true;
  if(!gameIsReady)loadingTimer=setTimeout(()=>{if(token!==openingToken)return;$('opening-text').textContent='The post is taking a moment.';$('retry-game').hidden=false},15000);
  const app=await gamePromise;if(token!==openingToken)return null;
  clearTimeout(loadingTimer);return app;
 }
 async function startLetter(id){
  const request=++letterGeneration,l=levels.find(x=>x.id===id);if(!l)return;lastDelivery=null;closeDialogs();
  try{const app=await readyForGame('Opening '+l.title+'…');if(!app||request!==letterGeneration)return;
   const saved=app.savedInfo,isResume=saved?.id===id&&saved.mode!=='won'&&saved.kind==='story';
   const opened=isResume?await app.continueGame():await app.start('story',levels.indexOf(l));
   if(request!==letterGeneration)return;if(!opened)throw Error('This letter could not be opened.');
   if(isResume){app.engine.pause(true);app.engine.unsuspend('navigation');app.engine.freeze(false)}
   $('opening').hidden=true;model={...model,active:id,selected:id};save();updateDock();setPlaying(true);
  }catch(e){if(request===letterGeneration)openingError('The letter could not be opened.',e)}
 }
 function openingError(message,error){clearTimeout(loadingTimer);setPlaying(false);$('journey-app').inert=true;$('opening-text').textContent=message;$('opening').hidden=false;$('retry-game').hidden=false;$('retry-game').focus({preventScroll:true});console.error(error)}
 async function resumeSaved(){
  const request=++letterGeneration;
  try{const app=await readyForGame('Continuing your post…');if(!app||request!==letterGeneration)return;if(!app.saved)throw Error('No saved post');
   const opened=await app.continueGame();if(request!==letterGeneration)return;if(!opened)throw Error('The saved post could not be resumed.');
   app.engine.pause(true);app.engine.unsuspend('navigation');app.engine.freeze(false);const s=app.engine.state();
   if(!s.shift&&!s.daily&&!s.practice&&!s.sample){model={...model,active:s.id,selected:s.id};save();updateDock()}
   $('opening').hidden=true;setPlaying(true);
  }catch(e){if(request===letterGeneration)openingError('Your saved post could not be opened.',e)}
 }
 function delivered(id,stars){if(lastDelivery?.id!==id)lastDelivery={id,chapterJustCompleted:M.continuation(model,allLevels(),id).chapterJustCompleted};syncProgress();save();renderPins();updateDock()}
 function mainMenu(){
  closeDialogs();if(gameIsReady&&$('game-stage').classList.contains('active'))leave('map');
  let navigation;try{navigation=parent!==window&&parent.InterfaceNavigation}catch{}
  if(typeof navigation?.mainMenu==='function'){navigation.mainMenu();return}
  const url=new URL('start.html',location.href);url.searchParams.set('v',document.querySelector('meta[name=cbp-build]')?.content||'web');
  if(['first','returning','postmarks','photographs'].includes(STUDY))url.searchParams.set('visit',STUDY);else if(EXAMPLE==='depot')url.searchParams.set('example','depot');
  location.href=url.href;
 }
 function leave(destination='map'){
  if(!gameIsReady)return;const app=frame.contentWindow.APP,s=app.engine.state(),wasPlaying=app.view==='play';setPlaying(false);app.engine.pause(true);app.save();app.closeSheet(false);app.engine.suspend('navigation');
  syncProgress();if(wasPlaying&&(s.shift||s.daily||s.practice||s.sample)){model.active=null;save()}else if(wasPlaying&&s.mode!=='won'&&!model.done[s.id]&&destination!=='next'){model.active=s.id;save()}
  updateDock();
  const destinationPlace=placeFor(current().id),changedPlace=s.mode==='won'&&!s.shift&&!s.daily&&!s.practice&&!s.sample&&placeFor(s.id)?.id!==destinationPlace.id;
  const orient=()=>{if(changedPlace)centreAt(destinationPlace.focus);if(s.mode==='won')announce(s.title+' posted. '+(current().planned?'Not reached yet.':'Next letter '+number(current().id)+', '+current().title+'.'))};
  if(destination==='next'&&!current().planned){openLetter(current().id);orient();return}
  if(destination==='packet'){openPacket(placeFor(s.id)?.id||placeFor(current().id).id);return}
  if(destination==='cats'){view=null;returnView=null;renderPane();setPaneState();renderPins();company.open();return}
  view=null;returnView=null;renderPane();setPaneState();renderPins();orient();
 }
 function returnFromService(){if(serviceReturn==='main-menu')mainMenu();else leave('map')}
 async function service(action,{returnTo='map'}={}){
  const request=++letterGeneration;
  serviceReturn=returnTo==='main-menu'?'main-menu':'map';
  closeDialogs();try{const app=await readyForGame(action==='night'?'Opening the late post…':action==='daily'?'Opening today’s post…':'Opening the sorting desk…');if(!app||request!==letterGeneration)return;
   if(action==='settings'||action==='help'){app.home();app.dispatch(action)}
   else{const saved=app.savedInfo,canContinue=saved&&saved.kind===(action==='night'?'night':'daily')&&saved.mode!=='won'&&saved.phase!=='ended';if(canContinue){const opened=await app.continueGame();if(request!==letterGeneration)return;if(!opened)throw Error('The saved service could not be resumed.');app.engine.pause(true)}else{app.home();app.dispatch(action)}}
   $('opening').hidden=true;setPlaying(true);
  }catch(e){if(request===letterGeneration)openingError('The post could not be opened.',e)}
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
 $('current-place').onclick=()=>{recenter();if(wide.matches)backToMap()};$('place-index').onclick=placeIndex;$('cats-button').onclick=()=>company.open();$('menu-button').onclick=menu;
 $('pane-back').onclick=()=>{if(wide.matches&&!view)openPacket(placeFor(current().id).id);else paneBack()};$('current-letter').onclick=()=>openLetter(current().id,view?.type==='packet'?{...view,scroll:$('pane-content').scrollTop}:null);
 $('next-dock').onclick=()=>!active()&&!next()?placeIndex():current().planned?openPacket(placeFor(current().id).id):openLetter(current().id);$('zoom-out').onclick=()=>changeZoom(zoom-.16);$('zoom-in').onclick=()=>changeZoom(zoom+.16);
 document.querySelectorAll('[data-service]').forEach(b=>b.onclick=()=>service(b.dataset.service));$('about-study').onclick=()=>{closeDialogs();showDialog('about-dialog')};
 document.querySelectorAll('[data-menu-destination]').forEach(b=>b.onclick=()=>{closeDialogs();if(b.dataset.menuDestination==='main-menu')mainMenu();else if(b.dataset.menuDestination==='places')placeIndex();else company.open()});
 $('cancel-opening').onclick=()=>{openingToken++;letterGeneration++;if(gameIsReady)frame.contentWindow.APP.cancelOpening();clearTimeout(loadingTimer);$('opening').hidden=true;setPlaying(false)};
 $('retry-game').onclick=()=>{openingToken++;$('opening').hidden=true;location.reload()};
 window.Journey={company,syncProgress,onProgress(fn){progressListeners.add(fn);return()=>progressListeners.delete(fn)},startLetter,resumeSaved,openPacket,openLetter,backToMap,recenter,placeIndex,leave,mainMenu,delivered,resetDeliveryContext:()=>{lastDelivery=null},deliveryContext,gameReady,service,returnFromService,isDelivered:id=>!!model.done[id],get state(){return{model,view,returnView,zoom,camera:camera(),gameReady:gameIsReady,wide:wide.matches,next:next()?.id}},get levels(){return levels}};
 fetch('levels.json').then(r=>{if(!r.ok)throw Error('Level index unavailable');return r.json()}).then(data=>{
  if(!Array.isArray(data)||data.length!==100||new Set(data.map(l=>l.id)).size!==100)throw Error('The campaign index is incomplete');
  levels=data;updateDock();renderPane();renderPins();setPaneState();requestAnimationFrame(()=>{changeZoom(!wide.matches&&vp.clientHeight<650?.72:.85,placeFor(current().id).focus);recenter()});{const url=new URL('play/index.html',location.href);url.searchParams.set('v',document.querySelector('meta[name=cbp-build]')?.content||'local');frame.contentWindow.location.replace(url.href)};
 }).catch(e=>{toast('The letter index could not be opened. Please reload.');console.error(e)});
})();
