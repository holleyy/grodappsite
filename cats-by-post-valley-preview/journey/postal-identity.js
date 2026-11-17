/* A destination owns its ink; existing posted letters own the chapter award. */
(function(root){
 'use strict';
 const places=[
  {id:'office',title:'The sorting office',chapters:[1,2],art:'office.webp'},
  {id:'depot',title:'The town depot',chapters:[3,4],art:'depot.webp'},
  {id:'train',title:'The mail train',chapters:[5],art:'train.webp'},
  {id:'hall',title:'The city hall',chapters:[6],art:'hall.svg'},
  {id:'parcel',title:'The parcel room',chapters:[7],art:'parcel.svg'},
  {id:'winter',title:'The Christmas post',chapters:[8],art:'winter.svg'}
 ].map(p=>Object.freeze({...p,chapters:Object.freeze(p.chapters)}));
 const lengths=[0,5,10,10,15,15,15,15,15];
 const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const forPlace=id=>places.find(p=>p.id===id)||null;
 function forLevel(id){const m=/^([1-8])-(\d{1,2})$/.exec(id||'');return m&&+m[2]>0&&+m[2]<=lengths[+m[1]]?places.find(p=>p.chapters.includes(+m[1])):null}
 function chapterEarned(chapter,done){
  if(!Number.isInteger(chapter)||chapter<1||chapter>8)return false;
  const n=lengths[chapter];if(!n||!done||typeof done!=='object'||Array.isArray(done))return false;
  return Array.from({length:n},(_,i)=>chapter+'-'+(i+1)).every(id=>Object.hasOwn(done,id)&&!!done[id]&&typeof done[id]==='object');
 }
 const earnedChapters=(placeId,done)=>(forPlace(placeId)?.chapters||[]).filter(ch=>chapterEarned(ch,done));
 function mark(placeId,{base='images/postmarks/',className='',earned=false,reference='',label='',decorative=false}={}){
  const p=forPlace(placeId);if(!p?.art)return '';
  return `<span class="postal-mark ${earned?'postal-mark-earned':''} ${esc(className)}" data-postal-place="${p.id}" ${decorative?'aria-hidden="true"':`role="img" aria-label="${esc(label||p.title+' postmark'+(earned?' earned':''))}"`}><img src="${esc(base+p.art)}" alt="" width="700" height="700">${reference?`<span class="postal-reference">${esc(reference)}</span>`:''}</span>`;
 }
 const api={forPlace,forLevel,chapterEarned,earnedChapters,mark};root.PostalIdentity=api;if(typeof module!=='undefined')module.exports=api;
})(globalThis);
