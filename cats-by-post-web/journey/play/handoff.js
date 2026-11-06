/* Navigation follows the current engine outcome and campaign permission. */
(() => {
 'use strict';
 const host=()=>parent.Journey;
 let navigating=false,returning=false,lastOutcome='';
 function observe(){const app=window.APP;if(!app||!host())return;const s=app.engine.state();host().syncProgress?.();
  if(s.mode==='won'&&!s.shift&&!s.daily&&!s.practice&&!s.sample&&s.lifecycle?.winRecorded){const key=s.runID+':'+s.id;if(key!==lastOutcome){lastOutcome=key;host().delivered(s.id,s.resultStars)}}
  if(!returning&&!app.opening&&app.view==='home'&&!document.getElementById('sheet').open&&parent.document.getElementById('game-stage')?.classList.contains('active')){returning=true;try{host().returnFromService()}finally{returning=false}}
 }
 function handle(action,arg,element){
  const app=window.APP,j=host();if(!app||!j)return false;const s=app.engine.state(),story=!s.shift&&!s.daily&&!s.practice&&!s.sample;
  const onward=story&&s.mode==='won'&&['next','send'].includes(action);
  if(!['home','map','places','album','main-menu'].includes(action)&&!onward)return false;
  if(navigating)return true;
  if(onward){
   const plan=JourneyFlow.onward(s,app.engine.levels,j.deliveryContext(s.id));
   if(!JourneyFlow.canContinue(s,plan))return true;
   const paper=element?.querySelector('.waiting-envelope-art'),rect=paper?.getBoundingClientRect(),offset=frameElement?.getBoundingClientRect();
   const from=rect&&offset?{x:rect.x+offset.x,y:rect.y+offset.y,width:rect.width,height:rect.height}:null;
   navigating=true;
   Promise.resolve(plan.kind==='advance'?app.advance():true).then(accepted=>{
    if(!accepted)return;observe();const now=app.engine.state();
    if(now.lifecycle?.presentation&&now.lifecycle.presentation!=='none')return;
    app.save();j.leave(plan.kind==='map'?'map':'next',{from});
   }).catch(console.error).finally(()=>navigating=false);return true;
  }
  observe();app.engine.pause(true);app.save();app.closeSheet(false);
  if(action==='main-menu')j.mainMenu();else j.leave(action==='album'?'cats':action==='places'?'packet':'map');
  return true;
 }
 window.JourneyHandoff={handle};
 document.addEventListener('click',e=>{const el=e.target.closest('[data-action]');if(el&&!el.disabled&&handle(el.dataset.action,el.dataset.arg,el)){e.preventDefault();e.stopImmediatePropagation()}},true);
 const started=setInterval(()=>{if(!window.APP)return;clearInterval(started);window.APP.engine.subscribe(observe);host()?.gameReady();observe()},50);
 document.getElementById('sheet').addEventListener('close',()=>queueMicrotask(observe));
})();
