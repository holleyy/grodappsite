/* Physical print identity, independent of game progress and presentation. */
(function(root){
 'use strict';
 function pick(state,id,arrived){
  if(state.selected===id||!arrived.some(c=>c.id===id))return state;
  const recovered=state.viewed.find(p=>p.id===id),viewed=state.viewed.filter(p=>p.id!==id&&p.id!==state.selected);
  if(state.selected)viewed.push({id:state.selected,reverse:!!state.reverse});
  return{selected:id,reverse:!!recovered?.reverse,viewed};
 }
 const arrival=(arrived,seen)=>[...arrived].reverse().find(c=>c.at>0&&!seen.includes(c.id))||null;
 const api=Object.freeze({pick,arrival});root.PhotoHandling=api;if(typeof module!=='undefined')module.exports=api;
})(globalThis);
