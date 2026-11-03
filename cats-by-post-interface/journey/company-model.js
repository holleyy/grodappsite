/* Coat identity is independent of future named portraits or character variants. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.CompanyModel=api})(typeof globalThis!=='undefined'?globalThis:this,function(){
 'use strict';
 const coats=Object.freeze([
  {id:'tabby',name:'Grey tabby',at:0,note:'Grey stripes, a pale muzzle and a ringed tail.'},
  {id:'black',name:'Black',at:0,note:'A black coat, with white markings at the chest and paws.'},
  {id:'white',name:'White',at:0,note:'A white coat from ears to tail.'},
  {id:'cream',name:'Cream',at:0,note:'Pale cream fur, with a softer hint of ginger.'},
  {id:'smoke',name:'Smoke',at:50,note:'A smoky blue-grey coat, without tabby stripes.'},
  {id:'calico',name:'Calico',at:100,note:'Clear patches of white, ginger and black.'},
  {id:'tortoiseshell',name:'Tortoiseshell',at:250,note:'Ginger and black, mottled closely together.'},
  {id:'siamese',name:'Siamese',at:500,note:'A cream coat with darker ears, face, paws and tail.'}
 ].map(Object.freeze));
 function read(progress){
  const raw=Number(progress?.nightShift?.totalCatsHome),total=Number.isFinite(raw)?Math.max(0,Math.floor(raw)):0;
  const all=coats.map(c=>({...c,available:total>=c.at,remaining:Math.max(0,c.at-total)}));
  return{total,coats:all,arrived:all.filter(c=>c.available),next:all.find(c=>!c.available)||null};
 }
 function neighbour(state,id,direction){const i=state.arrived.findIndex(c=>c.id===id);return i<0?null:state.arrived[i+(direction<0?-1:1)]||null}
 return Object.freeze({read,neighbour,coats});
});
