/* A short piece of scene life; no game state or perpetual animation loop. */
(function(root){
 'use strict';
 const poses=[[0,0],[120,1],[260,2],[380,3],[650,4],[1050,5],[1210,6],[1380,7]],duration=1560;
 function frameAt(time){if(!Number.isFinite(time)||time<0||time>=duration)return 0;return poses.findLast(p=>p[0]<=time)[1]}
 function cover({width,height,naturalWidth,naturalHeight},x,y,size,ax,ay){const s=Math.max(width/naturalWidth,height/naturalHeight),w=size*s;return{left:x*s+(width-naturalWidth*s)/2-w*ax,top:y*s+(height-naturalHeight*s)/2-w*ay,width:w}}
 function create({button,art,container,active}){
  const preference=matchMedia('(prefers-reduced-motion: reduce)');let raf=0,start=0,frame=-1,visible=false,played=false,announced=false;
  const still=()=>preference.matches||document.body.classList.contains('reduced');
  function pose(next){if(frame===next)return;frame=next;button.dataset.pose=next;button.style.backgroundPosition=`${next%4*100/3}% ${Math.floor(next/4)*100}%`}
  function stop(){cancelAnimationFrame(raf);raf=0;pose(0)}
  function tick(now){if(!active()||still()){stop();return}const elapsed=now-start;pose(frameAt(elapsed));if(elapsed<duration)raf=requestAnimationFrame(tick);else{raf=0;if(announced)button.querySelector('[role=status]').textContent='The ginger cat has settled back to sleep.'}}
  function play(user=false){if(!visible||!active()||still())return;stop();announced=user;if(user)button.querySelector('[role=status]').textContent='';start=performance.now();raf=requestAnimationFrame(tick)}
  function refresh(){
   const ready=active()&&art.complete&&art.naturalWidth>0;button.hidden=!ready;
   if(ready){const r=art.getBoundingClientRect(),c=container.getBoundingClientRect(),portrait=art.naturalHeight>art.naturalWidth,p=cover({width:r.width,height:r.height,naturalWidth:art.naturalWidth,naturalHeight:art.naturalHeight},portrait?489:730,portrait?829:548,200,340/512,390/512);Object.assign(button.style,{left:p.left+r.left-c.left+'px',top:p.top+r.top-c.top+'px',width:p.width+'px',height:p.width+'px'});}
   const entered=ready&&!visible;visible=ready;if(!ready||still())stop();else if(entered&&!played){played=true;play()}
  }
  button.onclick=()=>play(true);art.addEventListener('load',()=>{played=false;refresh()});document.addEventListener('visibilitychange',refresh);preference.addEventListener('change',refresh);
  new ResizeObserver(refresh).observe(container);
  new MutationObserver(refresh).observe(document.body,{attributes:true,attributeFilter:['class','data-scene','data-material']});
  document.querySelectorAll('dialog').forEach(d=>new MutationObserver(refresh).observe(d,{attributes:true,attributeFilter:['open']}));
  pose(0);refresh();return{refresh,play,stop,get state(){return{frame,running:!!raf,visible}}};
 }
 const api={frameAt,cover,create};if(typeof module==='object'&&module.exports)module.exports=api;else root.OfficeCat=api;
})(typeof window==='object'?window:globalThis);
