(function(root){
 'use strict';
 const lengths=[0,5,10,10,15,15,15,15,15];
 const valid=id=>{const m=/^([1-8])-(\d{1,2})$/.exec(id||'');return!!m&&+m[2]>0&&+m[2]<=lengths[+m[1]]};
 function read(raw){
  const state={version:1,done:{'1-1':{stars:{delivered:true}},'1-2':{stars:{delivered:true}},'1-3':{stars:{delivered:true}}},active:null,selected:null};
  try{const p=JSON.parse(raw);if(!p||p.version!==1||!p.done||Array.isArray(p.done))return state;
   for(const [id,r]of Object.entries(p.done))if(valid(id)&&r&&typeof r==='object')state.done[id]={stars:{delivered:true,tidy:!!r.stars?.tidy,firstPost:!!r.stars?.firstPost}};
   if(valid(p.active))state.active=p.active;
  }catch{}return state;
 }
 function next(levels,done){return levels.find(l=>!Object.hasOwn(done,l.id))||null}
 function select(state,id){return{...state,selected:id}}
 function delivered(state,id,stars){if(!valid(id))return state;const old=state.done[id]?.stars||{};return{...state,active:state.active===id?null:state.active,done:{...state.done,[id]:{stars:Object.fromEntries(['delivered','tidy','firstPost'].map(k=>[k,!!old[k]||!!stars[k]]))}}}}
 const api={read,next,select,delivered,valid};root.JourneyModel=api;if(typeof module!=='undefined')module.exports=api;
})(globalThis);
