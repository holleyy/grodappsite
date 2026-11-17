/* Presentation metadata only. The native game owns playable levels and progress. */
(function(root){
 'use strict';
 const textId=id=>typeof id==='string'&&id.trim().length>0;
 const chapterId=id=>textId(id)||Number.isInteger(id);
 const freeze=value=>value&&typeof value==='object'?Object.freeze(Array.isArray(value)?value.map(freeze):Object.fromEntries(Object.entries(value).map(([k,v])=>[k,freeze(v)]))):value;
 function create(spec){
  const packs=[],places=[],chapters=[],levelIds=[],byPack=new Map(),byPlace=new Map(),byChapter=new Map(),byLevel=new Map();
  const require=(ok,message)=>{if(!ok)throw Error('Invalid journey catalogue: '+message)};
  const list=(value,name)=>{require(Array.isArray(value)&&value.length>0,name+' must be a non-empty list');return value};
  function unique(map,id,valid,name){require(valid(id)&&!map.has(id),'missing or duplicate '+name);map.set(id,null)}
  for(const input of list(spec?.packs,'packs')){
   unique(byPack,input?.id,textId,'pack ID');require(textId(input.themeId),'missing theme ID');
   const packPlaces=[],packChapters=[],packLevels=[];
   for(const inputPlace of list(input.places,'places')){
    unique(byPlace,inputPlace?.id,textId,'place ID');
    const placeChapters=[],placeLevels=[];
    for(const inputChapter of list(inputPlace.chapters,'chapters')){
     unique(byChapter,inputChapter?.id,chapterId,'chapter ID');
     const ids=[...list(inputChapter.levelIds,'level IDs')];
     for(const id of ids){unique(byLevel,id,textId,'level ID');levelIds.push(id)}
     const chapter=freeze({...inputChapter,packId:input.id,placeId:inputPlace.id,count:ids.length,levelIds:ids});
     chapters.push(chapter);byChapter.set(chapter.id,chapter);placeChapters.push(chapter.id);placeLevels.push(...ids);
    }
    const place=freeze({...inputPlace,packId:input.id,chapters:placeChapters,levelIds:placeLevels,count:placeLevels.length});
    places.push(place);byPlace.set(place.id,place);packPlaces.push(place.id);packChapters.push(...placeChapters);packLevels.push(...placeLevels);
   }
   const pack=freeze({...input,places:packPlaces,chapters:packChapters,levelIds:packLevels,count:packLevels.length});
   packs.push(pack);byPack.set(pack.id,pack);
  }
  for(const chapter of chapters){
   const pack=byPack.get(chapter.packId),place=byPlace.get(chapter.placeId),context=Object.freeze({pack,place,chapter,themeId:pack.themeId});
   for(const id of chapter.levelIds)byLevel.set(id,context);
  }
  const valid=id=>typeof id==='string'&&byLevel.has(id);
  function validateIndex(levels){
   const seen=new Set();
   if(!Array.isArray(levels))throw Error('The campaign index must be a list');
   for(const level of levels){
    if(!valid(level?.id)||seen.has(level.id))throw Error('The campaign index has an undeclared or duplicate level ID');
    seen.add(level.id);
   }
   if(seen.size!==levelIds.length)throw Error('The campaign index is incomplete');
   return levels;
  }
  return Object.freeze({packs:Object.freeze(packs),places:Object.freeze(places),chapters:Object.freeze(chapters),levelIds:Object.freeze(levelIds),
   pack:id=>byPack.get(id)||null,place:id=>byPlace.get(id)||null,chapter:id=>byChapter.get(id)||null,context:id=>byLevel.get(id)||null,valid,validateIndex});
 }
 const postal=create({packs:[{id:'postal',title:'Cats by Post',themeId:'postal',places:[
  {id:'office',title:'The sorting office',label:'Sorting office',x:.238,y:.687,focus:[.238,.592],art:'office',chapters:[
   {id:1,title:'First post',levelIds:['1-1','1-2','1-3','1-4','1-5']},
   {id:2,title:'Ginger and blue',levelIds:['2-1','2-2','2-3','2-4','2-5','2-6','2-7','2-8','2-9','2-10']}
  ]},
  {id:'depot',title:'The town depot',label:'Town depot',x:.819,y:.515,focus:[.819,.417],art:'depot',chapters:[
   {id:3,title:'The town depot',levelIds:['3-1','3-2','3-3','3-4','3-5','3-6','3-7','3-8','3-9','3-10']},
   {id:4,title:'Doors of their own',levelIds:['4-1','4-2','4-3','4-4','4-5','4-6','4-7','4-8','4-9','4-10','4-11','4-12','4-13','4-14','4-15']}
  ]},
  {id:'train',title:'The mail train',label:'Mail train',x:.270,y:.40,focus:[.270,.334],art:'train',chapters:[
   {id:5,title:'A change of points',levelIds:['5-1','5-2','5-3','5-4','5-5','5-6','5-7','5-8','5-9','5-10','5-11','5-12','5-13','5-14','5-15']}
  ]},
  {id:'hall',title:'The city hall',label:'City hall',x:.617,y:.35,focus:[.617,.274],art:'hall',chapters:[
   {id:6,title:'Under the city',levelIds:['6-1','6-2','6-3','6-4','6-5','6-6','6-7','6-8','6-9','6-10','6-11','6-12','6-13','6-14','6-15']}
  ]},
  {id:'parcel',title:'The parcel room',label:'Parcel room',x:.488,y:.54,focus:[.488,.466],art:'parcel',chapters:[
   {id:7,title:'Special delivery',levelIds:['7-1','7-2','7-3','7-4','7-5','7-6','7-7','7-8','7-9','7-10','7-11','7-12','7-13','7-14','7-15']}
  ]},
  {id:'winter',title:'The Christmas post',label:'Christmas post',x:.766,y:.70,focus:[.766,.626],art:'winter',chapters:[
   {id:8,title:'Home for Christmas',levelIds:['8-1','8-2','8-3','8-4','8-5','8-6','8-7','8-8','8-9','8-10','8-11','8-12','8-13','8-14','8-15']}
  ]}
 ]}]});
 const api=Object.freeze({create,postal});root.JourneyCatalogue=api;if(typeof module!=='undefined')module.exports=api;
})(globalThis);
