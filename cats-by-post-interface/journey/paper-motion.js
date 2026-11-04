/* A small, disposable motion study. Objects remain usable throughout. */
(() => {
 'use strict';
 const preference=matchMedia('(prefers-reduced-motion: reduce)'),running=new Set();
 const reduced=()=>preference.matches||document.body.classList.contains('reduced')||!!document.getElementById('game')?.contentWindow?.APP?.prefs?.reduced;
 function run(element,frames,options={}){
  if(!element||reduced())return null;
  const animation=element.animate(frames,{duration:300,easing:'cubic-bezier(.2,.75,.25,1)',...options});running.add(animation);
  const forget=()=>running.delete(animation);animation.finished.then(forget,forget);return animation;
 }
 function finish(container=document){for(const a of running)if(container.contains(a.effect?.target)){a.finish();running.delete(a)}}
 preference.addEventListener('change',()=>{if(preference.matches)finish()});
 function letter(preview){
  if(!preview)return;
  run(preview.querySelector('.envelope-flap'),[{transform:'rotateX(178deg)'},{transform:'rotateX(-8deg)',offset:.8},{transform:'rotateX(0deg)'}],{duration:270});
  run(preview.querySelector('.preview-print'),[{transform:'translateY(86%) rotate(1deg)'},{transform:'translateY(-2%) rotate(-3.5deg)',offset:.85},{transform:'translateY(0) rotate(-3deg)'}],{delay:110,duration:370,fill:'backwards'});
 }
 function lift(element,from){
  if(!element||!from)return;
  const to=element.getBoundingClientRect(),dx=from.x+from.width/2-to.x-to.width/2,dy=from.y+from.height/2-to.y-to.height/2;
  run(element,[{transform:`translate(${dx}px,${dy}px) rotate(2deg) scale(${Math.min(1,from.width/to.width)})`,filter:'drop-shadow(0 1px 1px #4d3b2a25)'},{transform:'translate(0,0) rotate(-1.5deg) scale(1)',filter:'drop-shadow(0 8px 8px #4d3b2a30)'}],{duration:330});
 }
 function browse(element,outgoing,direction){
  if(reduced())return;
  const table=element.closest('.photo-table');
  if(outgoing){
   outgoing.removeAttribute('id');outgoing.removeAttribute('tabindex');outgoing.setAttribute('aria-hidden','true');outgoing.inert=true;outgoing.classList.add('photo-departure');table.append(outgoing);
   const a=run(outgoing,[{transform:'translateX(0) rotate(-1.5deg)',opacity:1},{transform:`translate(${direction*-38}px,9px) rotate(${direction*-7}deg) scale(.96)`,opacity:1,offset:.8},{transform:`translate(${direction*-38}px,9px) rotate(${direction*-7}deg) scale(.96)`,opacity:0}],{duration:240});
   if(a)a.finished.then(()=>outgoing.remove(),()=>outgoing.remove());else outgoing.remove();
  }
  run(element,[{transform:`translate(${direction*35}px,-6px) rotate(${direction*4}deg)`},{transform:'translate(0,0) rotate(-1.5deg)'}],{duration:310});
 }
 function putBack(copy,from,to,container){
  if(reduced()||!copy||!to||to.bottom<0||to.top>innerHeight)return;
  copy.removeAttribute('id');copy.removeAttribute('tabindex');copy.setAttribute('aria-hidden','true');copy.inert=true;copy.classList.add('photo-return');
  Object.assign(copy.style,{left:from.x+'px',top:from.y+'px',width:from.width+'px',height:from.height+'px'});container.append(copy);
  const dx=to.x+to.width/2-from.x-from.width/2,dy=to.y+to.height/2-from.y-from.height/2;
  const a=run(copy,[{transform:'rotate(-1.5deg)',opacity:1},{transform:`translate(${dx}px,${dy}px) rotate(1deg) scale(${to.width/from.width})`,opacity:.45}],{duration:290});
  if(a)a.finished.then(()=>copy.remove(),()=>copy.remove());else copy.remove();
 }
 window.PaperMotion={run,finish,reduced,letter,lift,browse,putBack};
})();
