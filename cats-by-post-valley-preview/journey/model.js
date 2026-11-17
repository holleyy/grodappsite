(function(root){
 'use strict';
 const catalogues=typeof module!=='undefined'?require('./catalogue.js'):root.JourneyCatalogue;
 function create(catalogue){
 const valid=catalogue.valid;
 function read(raw){
  const state={version:2,done:{},active:null,selected:null};
  try{const p=JSON.parse(raw);if(!p||p.version!==2)return state;
   if(valid(p.active))state.active=p.active;if(valid(p.selected))state.selected=p.selected;
  }catch{}return state;
 }
 function fromProgress(state,progress){
  const done=Object.fromEntries(Object.entries(progress?.levels||{}).filter(([id,r])=>valid(id)&&r?.stars?.delivered)
   .map(([id,r])=>[id,{stars:{delivered:true,tidy:!!r.stars.tidy,firstPost:!!r.stars.firstPost}}]));
  return{...state,...navigation(state),done,active:valid(state.active)&&!Object.hasOwn(done,state.active)?state.active:null};
 }
 function navigation(state){return{version:2,active:valid(state.active)?state.active:null,selected:valid(state.selected)?state.selected:null}}
 function next(levels,done){return levels.find(l=>valid(l?.id)&&!Object.hasOwn(done,l.id))||null}
 function select(state,id){return id===null||valid(id)?{...state,selected:id}:state}
 function delivered(state,id,stars){if(!valid(id))return state;const old=state.done[id]?.stars||{};return{...state,active:state.active===id?null:state.active,done:{...state.done,[id]:{stars:Object.fromEntries(['delivered','tidy','firstPost'].map(k=>[k,!!old[k]||!!stars?.[k]]))}}}}
 function continuation(state,levels,finishedId){
  // Project the win for display; the outcome handoff still owns the saved award.
  const projected=delivered(state,finishedId,{delivered:true});
  const resumed=valid(projected.active)&&levels.find(l=>l.id===projected.active&&!l.planned&&!Object.hasOwn(projected.done,l.id));
  const letter=resumed||next(levels,projected.done)||null;
  const packet=catalogue.context(finishedId)?.chapter.levelIds||[];
  const chapterComplete=packet.length>0&&packet.every(id=>Object.hasOwn(projected.done,id));
  return{kind:!letter?'complete':letter.planned?'planned':resumed?'continue':'ready',letter,chapterComplete,chapterJustCompleted:chapterComplete&&!packet.every(id=>Object.hasOwn(state.done,id))};
 }
 return Object.freeze({read,fromProgress,navigation,next,select,delivered,valid,continuation,create});
 }
 const api=create(catalogues.postal);root.JourneyModel=api;if(typeof module!=='undefined')module.exports=api;
})(globalThis);
