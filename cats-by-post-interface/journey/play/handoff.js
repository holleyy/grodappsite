/* This copy of the shell belongs to the journey experiment only. */
(() => {
 'use strict';
 const host=()=>parent.Journey;
 let lastWon='';
 function outcomes(){const app=window.APP;if(!app)return;const s=app.engine.state();if(s.mode!=='won'){if(lastWon)host()?.resetDeliveryContext?.();lastWon='';return}if(!s.shift&&!s.daily&&!s.practice&&!s.sample){const key=s.id+JSON.stringify(s.resultStars);if(key!==lastWon){lastWon=key;host()?.delivered(s.id,s.resultStars||s.progress?.levels?.[s.id]?.stars||{delivered:true})}}}
 function handle(action){
  const app=window.APP;if(!app||!host())return false;const s=app.engine.state();
  const story=!s.shift&&!s.daily&&!s.practice&&!s.sample;
  const onward=s.mode==='won'&&(story||s.sample)&&['next','send'].includes(action);
  if(!['home','map','places','album','main-menu'].includes(action)&&!onward)return false;
  if(action==='main-menu'&&typeof host().mainMenu!=='function')return false;
  outcomes();app.engine.pause(true);app.save();app.closeSheet(false);
  if(action==='main-menu')host().mainMenu();
  else if(action==='album')host().leave('cats');
  else if(onward){const context=story?host().deliveryContext?.(s.id):null;host().leave(s.sample?'packet':context&&['planned','complete'].includes(context.kind)?'map':'next')}
  else host().leave(action==='places'?'packet':'map');
  return true;
 }
 window.JourneyHandoff={handle};
 document.addEventListener('click',e=>{
  const link=e.target.closest('a[href]');if(link&&!link.hasAttribute('data-local')){link.target='_blank';link.rel='noopener noreferrer';return}
  const el=e.target.closest('[data-action]');if(el&&!el.disabled&&handle(el.dataset.action)){e.preventDefault();e.stopImmediatePropagation()}
 },true);
 setInterval(()=>{outcomes();if(window.APP?.view==='home'&&!document.getElementById('sheet').open&&parent.document.getElementById('game-stage')?.classList.contains('active')){const journey=host();if(journey?.returnFromService)journey.returnFromService();else journey?.leave('map')}},200);
 const started=setInterval(()=>{if(!window.APP)return;clearInterval(started);host()?.gameReady()},80);
})();
