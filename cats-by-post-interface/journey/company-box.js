/* Collection presentation only. Progress enters through a read-only adapter. */
'use strict';
window.CompanyBox={create({dialog,getProgress,onNight,getReturnFocus}){
 const M=CompanyModel,esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const icon=n=>`<img src="icons/${n}.svg" alt="" width="24" height="24">`;
 let state=M.read(null),selected=null,reverse=false,ready=false,token=0,wellScroll=0,boxScroll=0,swipe=null,wellObserver=null;
 const portrait=c=>`images/coats/${c.id}.webp`;
 const label=c=>c.at?`${c.at} Night Shift cats home`:'Here from the start';
 function photo(c,thumb=false){return `<span class="coat-print ${thumb?'coat-thumb':''}" data-paper-coat="${c.id}"><img class="coat-paper" src="images/photo-mount.webp" alt="" width="1090" height="1244"><img class="coat-picture" src="${portrait(c)}" alt="${esc(c.name)} coat, pictured at the sorting office" width="1254" height="1254" ${thumb?'loading="lazy"':''} draggable="false"><span class="coat-name">${esc(c.name)}</span></span>`}
 function mountedPhoto(c){return `<div class="lifted-print ${reverse?'is-reversed':''}" id="lifted-print" tabindex="0" role="group" aria-label="${esc(c.name)} photograph, ${reverse?'reverse':'front'}. Swipe or use arrow keys to browse."><div class="photo-turn"><div class="photo-front" ${reverse?'inert aria-hidden="true"':''}>${photo(c)}</div><div class="photo-back" ${reverse?'':'inert aria-hidden="true"'}><div class="print-reverse"><img class="coat-paper" src="images/photo-mount.webp" alt="" width="1090" height="1244"><div class="reverse-writing"><h2>${esc(c.name)}</h2><p>${esc(c.note)}</p><p class="coat-origin">${label(c)}</p></div></div></div></div></div>`}
 function table(c){const under=M.neighbour(state,c.id,1)||M.neighbour(state,c.id,-1);return `<div class="photo-table"><div class="photo-underlay paper-underlay" aria-hidden="true"><img src="images/photo-mount.webp" alt="" width="1090" height="1244"></div>${under?`<div class="photo-underlay picture-underlay" aria-hidden="true">${photo(under)}</div>`:''}${mountedPhoto(c)}</div>`}
 function turn(){
  const surface=dialog.querySelector('#lifted-print'),paper=surface.querySelector('.photo-turn'),from=getComputedStyle(paper).transform;PaperMotion.finish(surface);reverse=!reverse;surface.classList.toggle('is-reversed',reverse);
  const front=surface.querySelector('.photo-front'),rear=surface.querySelector('.photo-back');front.inert=reverse;front.setAttribute('aria-hidden',String(reverse));rear.inert=!reverse;rear.setAttribute('aria-hidden',String(!reverse));
  const c=state.arrived.find(c=>c.id===selected);surface.setAttribute('aria-label',`${c.name} photograph, ${reverse?'reverse':'front'}. Swipe or use arrow keys to browse.`);
  dialog.querySelector('#photo-turn span').textContent=reverse?'The photograph':'Turn over';PaperMotion.run(paper,[{transform:from},{transform:reverse?'rotateY(180deg)':'rotateY(0deg)'}],{duration:320});
 }
 function render(){
  const current=selected&&state.arrived.find(c=>c.id===selected),previous=current&&M.neighbour(state,current.id,-1),next=current&&M.neighbour(state,current.id,1),invitation=state.next;
  dialog.classList.toggle('viewing-photo',!!current);
  dialog.innerHTML=`<h1 id="cats-title" class="sr-only">The company</h1><div class="company-room"><button class="company-back" id="company-back">${icon('arrow-left')}<span>${current?'The box':'Put away'}</span></button><div class="company-layout"><section class="box-index" aria-label="Photographs in the box"><div class="open-photo-box"><img class="photo-box-art" src="images/photo-box-open.webp?v=lettering-12" alt="An open navy photograph box, labelled The company" width="1007" height="1561"><div class="photo-well" id="photo-well"><div class="coat-grid">${state.arrived.map(c=>`<button class="coat-slot ${c.id===selected?'is-selected':''}" data-coat="${c.id}" aria-label="Look at the ${esc(c.name)} photograph" ${c.id===selected?'aria-current="true"':''}>${photo(c,true)}</button>`).join('')}</div></div><button class="box-browse" id="more-photos" hidden><span>More photographs</span>${icon('arrow-down')}</button></div><p class="box-tally">${ready?`${state.arrived.length} of ${state.coats.length} coats in the box`:'The photographs are arriving…'}</p><section class="next-coat-note" aria-label="Next coat invitation">${invitation?`<h2>${esc(invitation.name)}</h2><p>${invitation.at} cats home in Night Shift</p><div class="coat-progress"><progress max="${invitation.at}" value="${state.total}" aria-label="Progress toward ${esc(invitation.name)}"></progress><span>${ready?`${Math.min(state.total,invitation.at)} / ${invitation.at}`:'…'}</span></div>`:`<h2>Everyone’s here.</h2><p>All eight coat photographs are in the box.</p>`}<button id="cats-night" class="company-night" ${ready?'':'disabled'}>${icon('moon-stars')}<span>Work a Night Shift</span>${icon('arrow-right')}</button></section></section><section class="photo-view" aria-label="Selected coat photograph" ${current?'':'hidden'}>${current?`${table(current)}<div class="photo-actions"><button id="photo-previous" ${previous?'':'disabled'} aria-label="${previous?'Previous photograph, '+esc(previous.name):'First photograph'}">${icon('arrow-left')}<span>${previous?esc(previous.name):'First'}</span></button><button id="photo-turn">${icon('arrow-counter-clockwise')}<span>${reverse?'The photograph':'Turn over'}</span></button><button id="photo-next" ${next?'':'disabled'} aria-label="${next?'Next photograph, '+esc(next.name):'Last photograph'}"><span>${next?esc(next.name):'Last'}</span>${icon('arrow-right')}</button></div><p class="photo-position" aria-live="polite">${state.arrived.indexOf(current)+1} of ${state.arrived.length} photographs</p>`:''}</section></div></div>`;
  const well=dialog.querySelector('#photo-well'),browse=dialog.querySelector('#more-photos');
  const updateBrowse=()=>{const needed=well.clientHeight>0&&well.scrollHeight>well.clientHeight+8,atEnd=well.scrollTop+well.clientHeight>=well.scrollHeight-8;browse.hidden=!needed;well.parentElement.classList.toggle('has-more',needed);browse.innerHTML=`<span>${atEnd?'First photographs':'More photographs'}</span>${icon(atEnd?'arrow-up':'arrow-down')}`};
  well.scrollTop=wellScroll;well.onscroll=e=>{wellScroll=e.target.scrollTop;updateBrowse()};
  browse.onclick=()=>{const atEnd=well.scrollTop+well.clientHeight>=well.scrollHeight-8;well.scrollTo({top:atEnd?0:well.scrollTop+well.clientHeight*.88,behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'})};
  wellObserver?.disconnect();wellObserver=new ResizeObserver(updateBrowse);wellObserver.observe(well);requestAnimationFrame(updateBrowse);
  dialog.querySelectorAll('[data-coat]').forEach(b=>b.onclick=()=>select(b.dataset.coat));
  dialog.querySelector('#company-back').onclick=back;
  dialog.querySelector('#cats-night').onclick=()=>{dialog.close();onNight()};
  if(current){
   dialog.querySelector('#photo-previous').onclick=()=>step(-1);
   dialog.querySelector('#photo-next').onclick=()=>step(1);
   dialog.querySelector('#photo-turn').onclick=turn;
   const surface=dialog.querySelector('#lifted-print');
   surface.addEventListener('pointerdown',e=>{if(e.pointerType==='mouse'&&e.button!==0)return;PaperMotion.finish(surface);swipe={x:e.clientX,y:e.clientY,id:e.pointerId};surface.setPointerCapture(e.pointerId)});
   surface.addEventListener('pointermove',e=>{if(!swipe||swipe.id!==e.pointerId||PaperMotion.reduced())return;const dx=e.clientX-swipe.x,dy=e.clientY-swipe.y;if(Math.abs(dx)>Math.abs(dy)*1.4)surface.style.translate=Math.max(-42,Math.min(42,dx*.4))+'px 0'});
   surface.addEventListener('pointerup',e=>{if(!swipe||swipe.id!==e.pointerId)return;const dx=e.clientX-swipe.x,dy=e.clientY-swipe.y;swipe=null;surface.style.translate='';if(Math.abs(dx)>48&&Math.abs(dx)>Math.abs(dy)*1.4)step(dx<0?1:-1)});
   surface.addEventListener('pointercancel',()=>{swipe=null;surface.style.translate=''});
  }
 }
 function select(id){if(!state.arrived.some(c=>c.id===id))return;PaperMotion.finish(dialog);const from=dialog.querySelector(`[data-coat="${id}"] .coat-print`)?.getBoundingClientRect();if(!selected)boxScroll=dialog.scrollTop;selected=id;reverse=false;render();dialog.scrollTop=0;const surface=dialog.querySelector('#lifted-print');surface.focus({preventScroll:true});PaperMotion.lift(surface,from)}
 function step(direction){const c=selected&&M.neighbour(state,selected,direction);if(!c)return;const focus=document.activeElement?.id;PaperMotion.finish(dialog);const outgoing=dialog.querySelector('#lifted-print')?.cloneNode(true),scroll=dialog.scrollTop;selected=c.id;reverse=false;render();dialog.scrollTop=scroll;const surface=dialog.querySelector('#lifted-print'),target=dialog.querySelector('#'+(focus?.startsWith('photo-')?focus:'lifted-print'));(target?.disabled?surface:target||surface).focus({preventScroll:true});PaperMotion.browse(surface,outgoing,direction)}
 function back(){PaperMotion.finish(dialog);if(selected){const old=selected,surface=dialog.querySelector('#lifted-print'),from=surface.getBoundingClientRect(),copy=surface.cloneNode(true);selected=null;reverse=false;render();dialog.scrollTop=boxScroll;const slot=dialog.querySelector(`[data-coat="${old}"]`);slot?.focus({preventScroll:true});PaperMotion.putBack(copy,from,slot?.getBoundingClientRect(),dialog)}else dialog.close()}
 async function open(){
  const request=++token;selected=null;reverse=false;ready=false;state=M.read(null);render();dialog.scrollTop=0;if(!dialog.open)dialog.showModal();
  try{const progress=await getProgress();if(request!==token||!dialog.open)return;state=M.read(progress);ready=true;render();dialog.querySelector('#company-back').focus({preventScroll:true})}
  catch{if(request===token&&dialog.open){dialog.querySelector('.box-tally').textContent='The photographs could not be fetched. Put the box away and try again.'}}
 }
 dialog.addEventListener('cancel',e=>{e.preventDefault();back()});
 dialog.addEventListener('close',()=>{token++;swipe=null;PaperMotion.finish(dialog);wellObserver?.disconnect();const target=getReturnFocus?.();if(target?.isConnected&&!target.closest('[inert]')&&!document.querySelector('dialog[open]'))target.focus({preventScroll:true})});
 dialog.addEventListener('keydown',e=>{if(!selected)return;if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();step(e.key==='ArrowLeft'?-1:1)}});
 return{open,get state(){return{selected,reverse,ready,total:state.total,arrived:state.arrived.map(c=>c.id)}}};
}};
