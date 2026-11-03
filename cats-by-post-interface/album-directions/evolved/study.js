(() => {
'use strict';
const $=id=>document.getElementById(id);
const places=[
 {id:'office',title:'The sorting office',label:'Sorting office',chapters:[1,2],count:15,x:.205,y:.84,focus:[.205,.72],art:'office'},
 {id:'depot',title:'The town depot',label:'Town depot',chapters:[3,4],count:25,x:.84,y:.55,focus:[.84,.43],art:'depot'},
 {id:'train',title:'The mail train',label:'Mail train',chapters:[5],count:15,x:.22,y:.35,focus:[.22,.26]},
 {id:'hall',title:'The city hall',label:'City hall',chapters:[6],count:15,x:.635,y:.27,focus:[.635,.18]},
 {id:'parcel',title:'The parcel room',label:'Parcel room',chapters:[7],count:15,x:.49,y:.58,focus:[.49,.48]},
 {id:'winter',title:'The Christmas post',label:'Christmas post',chapters:[8],count:15,x:.82,y:.865,focus:[.82,.77]}
];
const chapters={1:['First post',5],2:['Ginger and blue',10],3:['The town depot',10],4:['Doors of their own',15],5:['A change of points',15],6:['Under the city',15],7:['Special delivery',15],8:['Home for Christmas',15]};
const titles={"1–1": "First post", "1–2": "Let sleeping dogs lie", "1–3": "Return to sender", "1–4": "Ginger and blue", "1–5": "Second delivery", "2–1": "Blue turntables", "2–2": "Dogs bounce too", "2–3": "Two hatches", "2–4": "Loop the loop", "2–5": "Ginger only", "2–6": "Both colours", "2–7": "Two at once", "2–8": "Blue detour", "2–9": "The long way round", "2–10": "Last post", "3–1": "First van in", "3–2": "Mind the order", "3–3": "Third time lucky", "3–4": "Back through the gate", "3–5": "Ginger goes round", "3–6": "Two gates", "3–7": "Two vans", "3–8": "Return to depot", "3–9": "Morning rush", "3–10": "All aboard", "4–1": "A door of their own", "4–2": "The blue door", "4–3": "Own front doors", "4–4": "Knock on the way back", "4–5": "Next-door neighbours", "4–6": "Round the corner", "4–7": "Crossing the post", "4–8": "Back doors", "4–9": "The long return", "4–10": "A tempting basket", "4–11": "Two rounds", "4–12": "No wrong turns", "4–13": "Return address", "4–14": "The last collection", "4–15": "Every door in town"};
const scenarios={early:{current:'office',done:[3,0,0,0,0,0],next:'1–4'},depot:{current:'depot',done:[15,18,0,0,0,0],next:'4–9'},winter:{current:'winter',done:[15,25,15,15,15,12],next:'8–13'}};
let scenario='early',zoom=.85,activePlace=null,activeChapter=null,origin='map',drag=null,ignoreClick=false;
const viewport=$('map-window'),world=$('map-world');
const state=()=>scenarios[scenario];
const progress=(from='map')=>from==='desk'?scenarios.early:state();
const current=(from='map')=>places.find(p=>p.id===progress(from).current);
const done=(p,from='map')=>progress(from).done[places.indexOf(p)];
const announce=text=>{$('announcement').textContent=text};
const dialog=id=>{const d=$(id);if(!d.open)d.showModal();return d};
document.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',()=>$(b.dataset.close).close()));
function mapCentre(){return[(viewport.scrollLeft+viewport.clientWidth/2)/(1536*zoom),(viewport.scrollTop+viewport.clientHeight/2)/(1024*zoom)]}
function centreAt(point,behaviour='auto'){
 viewport.scrollTo({left:point[0]*1536*zoom-viewport.clientWidth/2,top:point[1]*1024*zoom-viewport.clientHeight/2,behavior:behaviour});
}
function setZoom(value){const centre=mapCentre();zoom=Math.min(1.2,Math.max(.55,value));world.style.width=1536*zoom+'px';world.style.height=1024*zoom+'px';centreAt(centre);$('zoom-out').disabled=zoom<=.55;$('zoom-in').disabled=zoom>=1.2;announce('Map zoom '+Math.round(zoom*100)+' percent')}
function renderMap(){
 $('map-places').innerHTML=places.map(p=>`<button class="place-pin ${p.id===state().current?'current':''} ${done(p)===0&&p.id!==state().current?'unreached':''}" style="left:${p.x*100}%;top:${p.y*100}%" data-place="${p.id}" aria-label="${p.title}, ${done(p)} of ${p.count} posted${p.id===state().current?', current place':''}">${p.label}<span>${done(p)===p.count?'All posted':done(p)?done(p)+' of '+p.count+' posted':p.id===state().current?'First delivery ready':'Not reached yet'}</span></button>`).join('');
 $('map-places').querySelectorAll('button').forEach(b=>b.addEventListener('click',e=>{if(ignoreClick){e.preventDefault();return}openPlace(b.dataset.place,'map')}));
 $('next-letter').innerHTML=`<span>Next delivery</span><strong>${state().next}</strong><span class="next-action">Open letter</span>`;
}
function openPlace(id,from='map',chapter){
 activePlace=places.find(p=>p.id===id);origin=from;const n=done(activePlace,from);let consumed=0;
 activeChapter=chapter||activePlace.chapters.find(ch=>{consumed+=chapters[ch][1];return n<consumed})||activePlace.chapters.at(-1);
 renderPlace();dialog('place-dialog').scrollTop=0;
}
function chapterDone(p,ch){let before=0;for(const c of p.chapters){if(c===ch)return Math.max(0,Math.min(chapters[c][1],done(p,origin)-before));before+=chapters[c][1]}return 0}
function renderPlace(){
 const p=activePlace,n=done(p,origin);$('place-title').textContent=p.title;
 const art=p.art?`<img src="../../assets/${p.art}.png" alt="Actual ${p.title.toLowerCase()} game room" width="1280" height="880">`:`<div class="concept-place"><img src="images/wide-route.png" alt="Concept illustration of ${p.title.toLowerCase()}" style="left:${-(p.focus[0]*780-155)}px;top:${-(p.focus[1]*520-100)}px"></div>`;
 $('place-content').innerHTML=`<div class="place-spread"><div class="place-postcard">${art}<p>${n} of ${p.count} posted · ${p.chapters.length===2?'two chapter packets':'one chapter packet'}</p>${p.id===progress(origin).current?`<button class="packet-current" id="packet-next"><strong>Next delivery ${progress(origin).next}</strong><span>${titles[progress(origin).next]||'Open the ready letter'}</span></button>`:''}</div><div class="packet-index"><div class="chapter-controls" aria-label="Chapter packets">${p.chapters.map(ch=>`<button data-chapter="${ch}" aria-pressed="${ch===activeChapter}">${chapters[ch][0]}<small>${chapterDone(p,ch)} of ${chapters[ch][1]} posted</small></button>`).join('')}</div><p class="list-note">${chapters[activeChapter][1]} letters in this packet. Delivered letters can be revisited.</p><ol class="letter-list">${Array.from({length:chapters[activeChapter][1]},(_,i)=>{const index=i+1,d=chapterDone(p,activeChapter),completed=index<=d,ready=p.id===progress(origin).current&&`${activeChapter}–${index}`===progress(origin).next;return `<li><button class="letter-row ${ready?'ready':''}" data-letter="${activeChapter}–${index}" ${!completed&&!ready?'disabled':''}><b>${activeChapter}–${index}</b><span>${titles[activeChapter+'–'+index]||'Delivery '+activeChapter+'–'+index}</span><small>${completed?'Delivered · view':ready?'Next · open':'After earlier post'}</small></button></li>`}).join('')}</ol></div></div>`;
 if($('packet-next'))$('packet-next').onclick=()=>openLetter(p,progress(origin).next);
 $('place-content').querySelectorAll('[data-chapter]').forEach(b=>b.onclick=()=>{activeChapter=+b.dataset.chapter;renderPlace();$('place-content').querySelector(`[data-chapter="${activeChapter}"]`).focus({preventScroll:true})});
 $('place-content').querySelectorAll('[data-letter]').forEach(b=>b.onclick=()=>openLetter(p,b.dataset.letter));
 $('place-current').textContent=p.id===progress(origin).current?'Current letter':'Current place';
}
function openLetter(p,number){
 $('letter-title').textContent='Delivery '+number;const ready=p.id===progress(origin).current&&number===progress(origin).next;
 $('letter-content').innerHTML=`<div class="letter-preview">${p.art?`<img src="../../assets/${p.art}.png" alt="${p.title} room preview">`:''}<h3>${titles[number]||'Delivery '+number}</h3><p>${ready?'The next addressed letter. In the game, opening it would take you into this delivery.':'A delivered letter. In the game, this would show its earned postage and let you replay the route.'}</p><button class="primary" id="return-packet">${ready?'Back to its packet':'Browse this packet'}</button><p class="caption">This study stops at the game handoff. It does not start a run, change your save, or mark a delivery complete.</p></div>`;
 $('return-packet').onclick=()=>{$('letter-dialog').close();if(!$('place-dialog').open)openPlace(p.id,origin,+number.split('–')[0])};dialog('letter-dialog').scrollTop=0;
}
function placeIndex(from='map'){
 $('index-title').textContent=from==='desk'?'The place rack':'Place index';
 $('index-content').innerHTML=`<ul class="index-list">${places.map(p=>`<li><button data-index-place="${p.id}"><span>${p.title}</span><small>${done(p,from)} of ${p.count} posted${p.id===progress(from).current?' · current place':''}</small></button></li>`).join('')}</ul><p class="caption">Every place has an address here. The four later destinations are planned parts of the journey, rather than playable rooms in this study.</p>`;
 $('index-content').querySelectorAll('button').forEach(b=>b.onclick=()=>{$('index-dialog').close();openPlace(b.dataset.indexPlace,from)});dialog('index-dialog');
}
function cats(from='map'){$('cats-title').textContent=from==='desk'?'The company · portrait study':'The company';dialog('cats-dialog').scrollTop=0}
function catIndex(){
 $('index-title').textContent='The company';const coats=[['Grey tabby','Here from the start'],['Black','Here from the start'],['White','Here from the start'],['Cream','Here from the start'],['Smoke','16 more Night Shift cats home'],['Calico','100 Night Shift cats home'],['Tortoiseshell','250 Night Shift cats home'],['Siamese','500 Night Shift cats home']];
 $('index-content').innerHTML=`<ul class="cat-index-list">${coats.map(c=>`<li><b>${c[0]}</b><span>${c[1]}</span></li>`).join('')}</ul><p class="caption">Mock Night Shift total: 34 cats home. These arrival conditions belong to Night Shift, independently of story places. This pass illustrates Black’s leaf; further portraits and page-turning are still a visual exploration.</p>`;dialog('index-dialog');
}
viewport.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse'||e.button!==0)return;drag={x:e.clientX,y:e.clientY,left:viewport.scrollLeft,top:viewport.scrollTop,moved:false,id:e.pointerId};ignoreClick=false});
viewport.addEventListener('pointermove',e=>{if(!drag)return;const dx=e.clientX-drag.x,dy=e.clientY-drag.y;if(!drag.moved&&Math.hypot(dx,dy)>5){drag.moved=true;viewport.setPointerCapture(e.pointerId);viewport.classList.add('dragging')}if(drag.moved){viewport.scrollLeft=drag.left-dx;viewport.scrollTop=drag.top-dy}});
const finishDrag=()=>{if(!drag)return;ignoreClick=drag.moved;drag=null;viewport.classList.remove('dragging');setTimeout(()=>ignoreClick=false,0)};
viewport.addEventListener('pointerup',finishDrag);viewport.addEventListener('pointercancel',finishDrag);
window.addEventListener('pointerup',finishDrag);
viewport.addEventListener('keydown',e=>{if(e.target!==viewport)return;const delta={ArrowLeft:[-100,0],ArrowRight:[100,0],ArrowUp:[0,-100],ArrowDown:[0,100]}[e.key];if(delta){e.preventDefault();viewport.scrollBy(...delta)}});
let previousSize=[viewport.clientWidth,viewport.clientHeight];new ResizeObserver(()=>{const next=[viewport.clientWidth,viewport.clientHeight];const centre=[(viewport.scrollLeft+previousSize[0]/2)/(1536*zoom),(viewport.scrollTop+previousSize[1]/2)/(1024*zoom)];previousSize=next;centreAt(centre)}).observe(viewport);
if(window.visualViewport)window.visualViewport.addEventListener('resize',()=>{if(drag)finishDrag()});
const recenter=()=>{centreAt(current().focus);announce('Back at '+current().title)};
const scenarioChange=value=>{scenario=value;$('progress-scenario').value=value;renderMap();recenter()};
const nextLetter=()=>{origin='map';openLetter(current(),state().next)};
const deskAction=action=>{if(action==='index')placeIndex('desk');else if(action==='cats')cats('desk');else if(action==='next'){origin='desk';openLetter(places[0],'1–4')}else if(action==='chapter1'||action==='letters')openPlace('office','desk',1);else if(action==='chapter2')openPlace('office','desk',2);else openPlace(action,'desk')};
// The illustrated desk always depicts early office progress, independently of the map's study switch.
document.querySelectorAll('[data-desk]').forEach(b=>b.onclick=()=>deskAction(b.dataset.desk));
withHandlers();function withHandlers(){
 $('home-map').onclick=recenter;$('place-index').onclick=()=>placeIndex();$('map-cats').onclick=()=>cats();$('album-demo').onclick=()=>cats();$('cat-index').onclick=catIndex;
 $('zoom-out').onclick=()=>setZoom(zoom-.15);$('zoom-in').onclick=()=>setZoom(zoom+.15);$('next-letter').onclick=nextLetter;
 $('progress-scenario').onchange=e=>scenarioChange(e.target.value);
 $('place-current').onclick=()=>{if(activePlace.id===progress(origin).current)openLetter(activePlace,progress(origin).next);else{$('place-dialog').close();if(origin==='desk')openPlace(current('desk').id,'desk');else{recenter();viewport.focus({preventScroll:true})}}};
}
renderMap();requestAnimationFrame(()=>{recenter();window.STUDY={places,chapters,openPlace,openLetter,cats,placeIndex,catIndex,recenter,setZoom,scenarioChange,get state(){return{scenario,zoom,current:state().current,activePlace:activePlace?.id,activeChapter,centre:mapCentre()}}}});
})();
