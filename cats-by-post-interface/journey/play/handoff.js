/* This copy of the shell belongs to the journey experiment only. */
(() => {
 'use strict';
 const host=()=>parent.Journey;
 let lastWon='';
 function outcomes(){const app=window.APP;if(!app)return;const s=app.engine.state();if(s.mode!=='won'){lastWon='';return}if(!s.shift&&!s.daily&&!s.practice&&!s.sample){const key=s.id+JSON.stringify(s.resultStars);if(key!==lastWon){lastWon=key;host()?.delivered(s.id,s.resultStars||s.progress?.levels?.[s.id]?.stars||{delivered:true})}}}
 document.addEventListener('click',e=>{
  const link=e.target.closest('a[href]');if(link&&!link.hasAttribute('data-local')){link.target='_blank';link.rel='noopener noreferrer';return}
  const el=e.target.closest('[data-action]');if(!el||el.disabled||!window.APP||!host())return;
  const action=el.dataset.action,s=APP.engine.state();
  const story=!s.shift&&!s.daily&&!s.practice&&!s.sample;
  if(['home','places','album'].includes(action)||(action==='next'&&story)||(action==='send'&&s.mode==='won'&&story)){
   e.preventDefault();e.stopImmediatePropagation();outcomes();APP.engine.pause(true);APP.save();APP.closeSheet(false);
   if(action==='album')host().leave('cats');else if(action==='next'||action==='send')host().leave('next');else host().leave(action==='places'?'packet':'map');
  }
 },true);
 setInterval(()=>{outcomes();if(window.APP?.view==='home'&&!document.getElementById('sheet').open&&parent.document.getElementById('game-stage')?.classList.contains('active'))host()?.leave('map')},200);
 const started=setInterval(()=>{if(!window.APP)return;clearInterval(started);host()?.gameReady()},80);
})();
