/* One preference store is shared by the office, correspondence and game host. */
(() => {
 'use strict';
 const key='catsByPost.web.preferences.v1',media=matchMedia('(prefers-reduced-motion: reduce)');let applied;
 function normalise(value){
  const p=value&&typeof value==='object'&&!Array.isArray(value)?value:{};
  return{font:['theme','balthazar','della','grenze'].includes(p.font)?p.font:'theme',large:p.large===true,contrast:p.contrast===true,reduced:typeof p.reduced==='boolean'?p.reduced:media.matches,sound:p.sound===true,haptics:p.haptics===true};
 }
 function read(){try{return normalise(JSON.parse(localStorage.getItem(key)||'{}'))}catch{return applied||normalise()}}
 function apply(value){
  const p=value===undefined?read():normalise(value),reduced=p.reduced,font=p.font==='theme'?(window.InterfaceTheme?.read().font||'balthazar'):p.font;applied=p;
  for(const root of [document.documentElement,document.body].filter(Boolean)){
   if(reduced&&!root.classList.contains('reduced'))window.PaperMotion?.finish?.(root);
   for(const [name,value]of Object.entries({big:!!p.large,contrast:!!p.contrast,reduced,'font-della':font==='della','font-grenze':font==='grenze','font-balthazar':font==='balthazar'}))root.classList.toggle(name,value);
  }
  document.documentElement.style.setProperty('--post-head',font==='della'?'Della':font==='grenze'?'Grenze':'Balthazar');
  document.documentElement.style.setProperty('--post-scale',p.large?'1.15':'1');
  return p;
 }
 apply();document.addEventListener('DOMContentLoaded',()=>apply(),{once:true});
 window.addEventListener('storage',event=>{if(event.key===key||event.key===null)apply()});media.addEventListener('change',()=>apply());
 let themeOff;function followTheme(){themeOff?.();themeOff=window.InterfaceTheme?.subscribe(()=>apply(applied));apply(applied)}followTheme();
 window.addEventListener('pagehide',()=>{themeOff?.();themeOff=null});window.addEventListener('pageshow',followTheme);
 window.PostPreferences={read,apply};
})();
