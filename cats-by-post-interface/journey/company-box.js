/* Collection presentation only. Progress enters through a read-only adapter. */
'use strict';
window.CompanyBox={create({dialog,getProgress,onNight,getReturnFocus,getSeenKey}){
 const M=CompanyModel,H=PhotoHandling,esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const icon=n=>`<img src="icons/${n}.svg" alt="" width="24" height="24">`;
 let state=M.read(null),selected=null,reverse=false,viewed=[],seen=[],ready=false,token=0,wellScroll=0,boxScroll=0,swipe=null,wellObserver=null;
 const portrait=c=>`images/coats/${c.id}.webp`;
 const label=c=>c.at?`${c.at} Night Shift cats home`:'Here from the start';
 function photo(c,thumb=false){return `<span class="coat-print ${thumb?'coat-thumb':''}" data-paper-coat="${c.id}"><img class="coat-paper" src="images/photo-mount.webp" alt="" width="1090" height="1244"><img class="coat-picture" src="${portrait(c)}" alt="${esc(c.name)} coat, pictured at the sorting office" width="1254" height="1254" ${thumb?'loading="lazy"':''} draggable="false"><span class="coat-name">${esc(c.name)}</span></span>`}
 function mountedPhoto(c){return `<div class="lifted-print ${reverse?'is-reversed':''}" id="lifted-print" data-held-coat="${c.id}" tabindex="0" role="group" aria-label="${esc(c.name)} photograph, ${reverse?'reverse':'front'}. Swipe or use arrow keys to browse."><div class="photo-turn"><div class="photo-front" ${reverse?'inert aria-hidden="true"':''}>${photo(c)}</div><div class="photo-back" ${reverse?'':'inert aria-hidden="true"'}><div class="print-reverse"><img class="coat-paper" src="images/photo-mount.webp" alt="" width="1090" height="1244"><div class="reverse-writing"><h2>${esc(c.name)}</h2><p>${esc(c.note)}</p><p class="coat-origin">${label(c)}</p></div></div></div></div></div>`}
 function reversePrint(c){return `<div class="print-reverse"><img class="coat-paper" src="images/photo-mount.webp" alt="" width="1090" height="1244"><div class="reverse-writing"><h2>${esc(c.name)}</h2><p>${esc(c.note)}</p><p class="coat-origin">${label(c)}</p></div></div>`}
 function table(c){
  const next=M.neighbour(state,c.id,1),top=viewed.at(-1),pile=viewed.slice(-3);
  return `<div class="photo-table"><button class="photo-source-box" id="photo-source-box" aria-label="Put the photographs back in the box"><img src="images/photo-box-open.webp?v=lettering-12" alt="" width="1007" height="1561">${next&&!viewed.some(p=>p.id===next.id)?`<span class="source-preview" aria-hidden="true">${photo(next,true)}</span>`:''}</button>${top?`<button class="viewed-pile" id="viewed-pile" aria-label="${viewed.length} viewed photographs. Pick up ${esc(state.arrived.find(c=>c.id===top.id).name)}">${pile.map((p,i)=>{const coat=state.arrived.find(c=>c.id===p.id);return `<span class="pile-print" aria-hidden="true" data-pile-coat="${p.id}" data-face="${p.reverse?'back':'front'}" style="--pile-layer:${i}">${p.reverse?reversePrint(coat):photo(coat,true)}</span>`}).join('')}</button>`:''}${mountedPhoto(c)}</div>`;
 }
 function readSeen(){try{const key=getSeenKey?.();if(!key)return;const data=JSON.parse(localStorage.getItem(key));seen=Array.isArray(data)?data.filter(id=>M.coats.some(c=>c.id===id&&c.at>0)):[]}catch{seen=[]}}
 function inspect(id){const coat=state.arrived.find(c=>c.id===id);if(!coat?.at||seen.includes(id))return;seen=[...seen,id];try{const key=getSeenKey?.();if(key)localStorage.setItem(key,JSON.stringify(seen))}catch{}}

 function turn(){
  const surface=dialog.querySelector('#lifted-print'),paper=surface.querySelector('.photo-turn'),from=getComputedStyle(paper).transform;PaperMotion.finish(surface);reverse=!reverse;surface.classList.toggle('is-reversed',reverse);
  const front=surface.querySelector('.photo-front'),rear=surface.querySelector('.photo-back');front.inert=reverse;front.setAttribute('aria-hidden',String(reverse));rear.inert=!reverse;rear.setAttribute('aria-hidden',String(!reverse));
  const c=state.arrived.find(c=>c.id===selected);surface.setAttribute('aria-label',`${c.name} photograph, ${reverse?'reverse':'front'}. Swipe or use arrow keys to browse.`);
  dialog.querySelector('#photo-turn span').textContent=reverse?'The photograph':'Turn over';PaperMotion.run(paper,[{transform:from},{transform:reverse?'rotateY(180deg)':'rotateY(0deg)'}],{duration:320});
 }
 function render(){
  const arrival=H.arrival(state.arrived,seen),outOnTable=new Set([selected,...viewed.map(p=>p.id)]);
  const current=selected&&state.arrived.find(c=>c.id===selected),previous=current&&M.neighbour(state,current.id,-1),next=current&&M.neighbour(state,current.id,1),invitation=state.next;
  dialog.classList.toggle('viewing-photo',!!current);
  dialog.innerHTML=`<h1 id="cats-title" class="sr-only">The company</h1><div class="company-room"><button class="company-back" id="company-back">${icon('arrow-left')}<span>${current?'The box':'Put away'}</span></button><div class="company-layout"><section class="box-index" aria-label="Photographs in the box"><div class="open-photo-box"><img class="photo-box-art" src="images/photo-box-open.webp?v=lettering-12" alt="An open navy photograph box, labelled The company" width="1007" height="1561">${ready&&arrival?`<button class="arrival-coat" data-coat="${arrival.id}" aria-label="New ${esc(arrival.name)} photograph. Lift it from above the others.">${photo(arrival,true)}</button><span class="sr-only" role="status">A new ${esc(arrival.name)} photograph has arrived.</span>`:""}<div class="photo-well" id="photo-well"><div class="coat-grid">${state.arrived.filter(c=>c.id!==arrival?.id).map(c=>`<button class="coat-slot ${outOnTable.has(c.id)?'is-on-table':''} ${arrival?.id===c.id?'is-tucked':''}" data-coat="${c.id}" aria-label="${outOnTable.has(c.id)?esc(c.name)+' photograph is on the table':'Look at the '+esc(c.name)+' photograph'}" ${outOnTable.has(c.id)||arrival?.id===c.id?'disabled':''} ${c.id===selected?'aria-current="true"':''}>${photo(c,true)}</button>`).join('')}</div></div><button class="box-browse" id="more-photos" hidden><span>More photographs</span>${icon('arrow-down')}</button></div><p class="box-tally">${ready?`${state.arrived.length} of ${state.coats.length} coat photographs`:'The photographs are arriving…'}</p><section class="next-coat-note" aria-label="Next coat invitation">${invitation?`<h2>${esc(invitation.name)}</h2><p>${invitation.at} cats home in Night Shift</p><div class="coat-progress"><progress max="${invitation.at}" value="${state.total}" aria-label="Progress toward ${esc(invitation.name)}"></progress><span>${ready?`${Math.min(state.total,invitation.at)} / ${invitation.at}`:'…'}</span></div>`:`<h2>Everyone’s here.</h2><p>All eight coat photographs are in the box.</p>`}<button id="cats-night" class="company-night" ${ready?'':'disabled'}>${icon('moon-stars')}<span>Work a Night Shift</span>${icon('arrow-right')}</button></section></section><section class="photo-view" aria-label="Selected coat photograph" ${current?'':'hidden'}>${current?`${table(current)}<div class="photo-actions"><button id="photo-previous" data-photo-coat="${previous?.id||''}" ${previous?'':'disabled'} aria-label="${previous?'Previous photograph, '+esc(previous.name):'First photograph'}">${icon('arrow-left')}<span>${previous?esc(previous.name):'First'}</span></button><button id="photo-turn">${icon('arrow-counter-clockwise')}<span>${reverse?'The photograph':'Turn over'}</span></button><button id="photo-next" data-photo-coat="${next?.id||''}" ${next?'':'disabled'} aria-label="${next?'Next photograph, '+esc(next.name):'Last photograph'}"><span>${next?esc(next.name):'Last'}</span>${icon('arrow-right')}</button></div><p class="photo-position" aria-live="polite">${state.arrived.indexOf(current)+1} of ${state.arrived.length} photographs</p>`:''}</section></div></div>`;
  const well=dialog.querySelector('#photo-well'),browse=dialog.querySelector('#more-photos');
  const lastFiled=()=>Math.max(0,...[...well.querySelectorAll('.coat-slot:not(.is-on-table):not(.is-tucked)')].map(b=>b.offsetTop+b.offsetHeight));
  const updateBrowse=()=>{const last=lastFiled(),needed=well.clientHeight>0&&(last>well.clientHeight+8||well.scrollTop>8),atEnd=well.scrollTop+well.clientHeight>=last-8;browse.hidden=!needed;well.parentElement.classList.toggle('has-more',needed);browse.innerHTML=`<span>${atEnd?'First photographs':'More photographs'}</span>${icon(atEnd?'arrow-up':'arrow-down')}`};
  well.scrollTop=wellScroll;well.onscroll=e=>{wellScroll=e.target.scrollTop;updateBrowse()};
  browse.onclick=()=>{const atEnd=well.scrollTop+well.clientHeight>=lastFiled()-8;well.scrollTo({top:atEnd?0:Math.min(lastFiled()-well.clientHeight,well.scrollTop+well.clientHeight*.88),behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'})};
  wellObserver?.disconnect();wellObserver=new ResizeObserver(updateBrowse);wellObserver.observe(well);requestAnimationFrame(updateBrowse);
  dialog.querySelectorAll('[data-coat]').forEach(b=>b.onclick=()=>select(b.dataset.coat));
  dialog.querySelector('#company-back').onclick=back;
  dialog.querySelector('#cats-night').onclick=()=>{dialog.close();onNight()};
  if(current){
   dialog.querySelector('#photo-previous').onclick=()=>step(-1);
   dialog.querySelector('#photo-next').onclick=()=>step(1);
   dialog.querySelector('#photo-turn').onclick=turn;dialog.querySelector('#photo-source-box').onclick=back;const pile=dialog.querySelector('#viewed-pile');if(pile)pile.onclick=()=>select(viewed.at(-1).id);
   const surface=dialog.querySelector('#lifted-print');
   surface.addEventListener('pointerdown',e=>{if(e.pointerType==='mouse'&&e.button!==0)return;PaperMotion.finish(surface);swipe={x:e.clientX,y:e.clientY,id:e.pointerId};surface.setPointerCapture(e.pointerId)});
   surface.addEventListener('pointermove',e=>{if(!swipe||swipe.id!==e.pointerId||PaperMotion.reduced())return;const dx=e.clientX-swipe.x,dy=e.clientY-swipe.y;if(Math.abs(dx)>Math.abs(dy)*1.4)surface.style.translate=Math.max(-42,Math.min(42,dx*.4))+'px 0'});
   surface.addEventListener('pointerup',e=>{if(!swipe||swipe.id!==e.pointerId)return;const dx=e.clientX-swipe.x,dy=e.clientY-swipe.y;swipe=null;surface.style.translate='';if(Math.abs(dx)>48&&Math.abs(dx)>Math.abs(dy)*1.4)step(dx<0?1:-1)});
   surface.addEventListener('pointercancel',()=>{swipe=null;surface.style.translate=''});
  }
 }
 function select(id,viaControl=false){
  if(!state.arrived.some(c=>c.id===id)||id===selected)return;
  PaperMotion.finish(dialog);const focus=document.activeElement?.id,old=dialog.querySelector('#lifted-print'),outgoing=old?.cloneNode(true),outRect=old?.getBoundingClientRect();
  const fromPile=viewed.some(p=>p.id===id),pileSource=dialog.querySelector(`[data-pile-coat="${id}"]`)||dialog.querySelector('#viewed-pile'),slot=dialog.querySelector(`.arrival-coat[data-coat="${id}"] .coat-print`)||dialog.querySelector(`.coat-slot[data-coat="${id}"] .coat-print`),compact=matchMedia('(max-width:739px), (max-height:600px)').matches;
  const source=selected?(fromPile?pileSource:(!compact&&slot)||dialog.querySelector('.source-preview')||dialog.querySelector('#photo-source-box')):slot;
  const from=source?.getBoundingClientRect(),scroll=selected?dialog.scrollTop:0;if(!selected)boxScroll=dialog.scrollTop;
  ({selected,reverse,viewed}=H.pick({selected,reverse,viewed},id,state.arrived));inspect(id);render();dialog.scrollTop=scroll;
  const surface=dialog.querySelector('#lifted-print'),target=viaControl&&focus?.startsWith('photo-')?dialog.querySelector('#'+focus):surface;
  (target?.disabled?surface:target||surface).focus({preventScroll:true});
  if(outgoing)PaperMotion.browse(surface,outgoing,1,{from,outRect});else PaperMotion.lift(surface,from);
 }
 function step(direction){const coat=selected&&M.neighbour(state,selected,direction);if(coat)select(coat.id,true)}
 function back(){
  PaperMotion.finish(dialog);if(selected){
   const old=selected,surface=dialog.querySelector('#lifted-print'),from=surface.getBoundingClientRect(),copy=surface.cloneNode(true),pile=dialog.querySelector('#viewed-pile'),pileRect=pile?.getBoundingClientRect(),pileCopy=pile?.cloneNode(true);
   selected=null;reverse=false;viewed=[];render();dialog.scrollTop=boxScroll;const slot=dialog.querySelector(`.coat-slot[data-coat="${old}"]`),well=dialog.querySelector('#photo-well');
   if(slot){if(slot.offsetTop<well.scrollTop)well.scrollTop=slot.offsetTop;else if(slot.offsetTop+slot.offsetHeight>well.scrollTop+well.clientHeight)well.scrollTop=slot.offsetTop+slot.offsetHeight-well.clientHeight;wellScroll=well.scrollTop}slot?.focus({preventScroll:true});
   const destination=slot?.getBoundingClientRect();PaperMotion.putBack(copy,from,destination,dialog);if(pileCopy)PaperMotion.putBack(pileCopy,pileRect,destination,dialog);
  }else dialog.close();
 }

 async function open(){
  const request=++token;selected=null;reverse=false;viewed=[];readSeen();ready=false;state=M.read(null);render();dialog.scrollTop=0;if(!dialog.open)dialog.showModal();
  try{const progress=await getProgress();if(request!==token||!dialog.open)return;state=M.read(progress);ready=true;render();PaperMotion.arrival(dialog.querySelector('.arrival-coat'));dialog.querySelector('#company-back').focus({preventScroll:true})}
  catch{if(request===token&&dialog.open){dialog.querySelector('.box-tally').textContent='The photographs could not be fetched. Put the box away and try again.'}}
 }
 dialog.addEventListener('cancel',e=>{e.preventDefault();back()});
 dialog.addEventListener('close',()=>{token++;swipe=null;PaperMotion.finish(dialog);wellObserver?.disconnect();const target=getReturnFocus?.();if(target?.isConnected&&!target.closest('[inert]')&&!document.querySelector('dialog[open]'))target.focus({preventScroll:true})});
 dialog.addEventListener('keydown',e=>{if(!selected)return;if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();step(e.key==='ArrowLeft'?-1:1)}});
 return{open,get state(){return{selected,reverse,viewed:viewed.map(p=>({...p})),arrival:H.arrival(state.arrived,seen)?.id||null,seen:[...seen],ready,total:state.total,arrived:state.arrived.map(c=>c.id)}}};
}};
