/* Session values are data only. Preserve typed rule buffers and Infinity in traces. */
(function(root){
  const types={Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array};
  const encode=value=>JSON.stringify(value,(_,v)=>ArrayBuffer.isView(v)?{$array:v.constructor.name,values:Array.from(v,x=>Number.isFinite(x)?x:{$number:String(x)})}:typeof v==='number'&&!Number.isFinite(v)?{$number:String(v)}:v);
  const decode=text=>JSON.parse(text,(_,v)=>v&&v.$number?Number(v.$number):v&&v.$array&&types[v.$array]?new types[v.$array](v.values):v);
  function history(){let items=[];return{push(value,instant){items.push({value:decode(encode(value)),instant});if(items.length>50)items.shift()},pop(instant){if(!items.length)return null;if(items.at(-1).instant!==instant){items=[];return null}return items.pop().value},clear(){items=[]},get size(){return items.length}}}
  function readSession(text){try{const s=decode(text);return s?.version===1&&s.game?s:null}catch{return null}}
  const api={encode,decode,history,readSession,queueWindow:(queue,released,planning)=>planning?queue:queue.slice(released,released+6)};
  if(typeof module!=='undefined')module.exports=api;root.InterfaceModel=api;
})(globalThis);
