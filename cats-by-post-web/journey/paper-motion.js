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
  run(preview.querySelector('.envelope-flap'),[{transform:'rotateX(178deg)'},{transform:'rotateX(-3deg)',offset:.87},{transform:'rotateX(0deg)'}],{duration:310});
  run(preview.querySelector('.letter-object'),[{transform:'skewX(-.7deg)'},{transform:'skewX(.4deg)',offset:.65},{transform:'none'}],{duration:390});
  run(preview.querySelector('.preview-print'),[{transform:'translateY(86%) rotate(1deg)'},{transform:'translateY(4%) rotate(-2.8deg)',offset:.8},{transform:'translateY(0) rotate(-3deg)'}],{delay:140,duration:410,fill:'backwards'});
 }
 function lift(element,from){
  if(!element||!from)return;
  const to=element.getBoundingClientRect(),dx=from.x+from.width/2-to.x-to.width/2,dy=from.y+from.height/2-to.y-to.height/2;
  const scale=Math.min(1,from.width/to.width);
  run(element,[{transform:`translate(${dx}px,${dy}px) rotate(2deg) scale(${scale})`,filter:'drop-shadow(0 1px 1px #4d3b2a25)'},{transform:`translate(${dx}px,${dy-9}px) rotate(1.8deg) scale(${scale})`,filter:'drop-shadow(0 6px 5px #4d3b2a30)',offset:.18},{transform:'translate(0,0) rotate(-1.5deg) scale(1)',filter:'drop-shadow(0 8px 8px #4d3b2a30)'}],{duration:390,easing:'cubic-bezier(.25,.55,.25,1)'});
 }
 function browse(element,outgoing,direction,{from,outRect}={}){
  if(reduced())return;
  const dialog=element.closest('dialog'),pile=dialog.querySelector('.viewed-pile');
  if(outgoing&&outRect&&pile){
   const to=pile.getBoundingClientRect(),coat=outgoing.querySelector('[data-paper-coat]')?.dataset.paperCoat;
   const resting=coat&&pile.querySelector(`[data-pile-coat="${coat}"]`);if(resting)resting.style.visibility='hidden';
   outgoing.removeAttribute('id');outgoing.removeAttribute('tabindex');outgoing.setAttribute('aria-hidden','true');outgoing.inert=true;outgoing.classList.add('photo-departure');
   Object.assign(outgoing.style,{position:'fixed',left:outRect.x+'px',top:outRect.y+'px',right:'auto',width:outRect.width+'px',height:outRect.height+'px'});dialog.append(outgoing);
   const dx=to.x+to.width/2-outRect.x-outRect.width/2,dy=to.y+to.height/2-outRect.y-outRect.height/2,scale=to.width/outRect.width;
   const a=run(outgoing,[{transform:'rotate(-1.5deg)',filter:'drop-shadow(0 8px 8px #4d3b2a30)'},{transform:`translate(${dx}px,${dy}px) rotate(-7deg) scale(${scale})`,filter:'drop-shadow(0 2px 2px #4d3b2a25)'}],{duration:310});
   const land=()=>{outgoing.remove();if(resting)resting.style.visibility=''};if(a)a.finished.then(land,land);else land();
  }
  if(from){
   const to=element.getBoundingClientRect(),dx=from.x+from.width/2-to.x-to.width/2,dy=from.y+from.height/2-to.y-to.height/2;
   run(element,[{transform:`translate(${dx}px,${dy}px) rotate(3deg) scale(${Math.min(1,from.width/to.width)})`,filter:'drop-shadow(0 1px 1px #4d3b2a25)'},{transform:'translate(0,0) rotate(-1.5deg) scale(1)',filter:'drop-shadow(0 8px 8px #4d3b2a30)'}],{delay:85,duration:330,fill:'backwards'});
  }
 }
 function arrival(element){if(element)run(element,[{transform:'translateY(-9px) rotate(-12deg)'},{transform:'translateY(0) rotate(-8deg)'}],{duration:260})}
 function note(element){if(element)run(element,[{transform:'translateY(12px) skewX(-.8deg)'},{transform:'translateY(-1px) skewX(.35deg)',offset:.82},{transform:'none'}],{delay:140,duration:310,fill:'backwards'})}

 function putBack(copy,from,to,container){
  if(reduced()||!copy||!to||to.bottom<0||to.top>innerHeight)return;
  copy.removeAttribute('id');copy.removeAttribute('tabindex');copy.setAttribute('aria-hidden','true');copy.inert=true;copy.classList.add('photo-return');
  Object.assign(copy.style,{position:'fixed',right:'auto',bottom:'auto',left:from.x+'px',top:from.y+'px',width:from.width+'px',height:from.height+'px'});container.append(copy);
  const dx=to.x+to.width/2-from.x-from.width/2,dy=to.y+to.height/2-from.y-from.height/2;
  const a=run(copy,[{transform:'rotate(-1.5deg)',opacity:1},{transform:`translate(${dx}px,${dy}px) rotate(1deg) scale(${to.width/from.width})`,opacity:.45}],{duration:290});
  if(a)a.finished.then(()=>copy.remove(),()=>copy.remove());else copy.remove();
 }
 window.PaperMotion={run,finish,reduced,letter,lift,browse,arrival,putBack,note};
})();
