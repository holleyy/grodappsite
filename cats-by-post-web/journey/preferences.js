/* One preference store is shared by the office, correspondence and game host. */
(() => {
 'use strict';
 const key='catsByPost.web.preferences.v1',media=matchMedia('(prefers-reduced-motion: reduce)');
 function apply(){
  let p={};try{p=JSON.parse(localStorage.getItem(key)||'{}')}catch{}
  const reduced=typeof p.reduced==='boolean'?p.reduced:media.matches;
  for(const root of [document.documentElement,document.body].filter(Boolean)){
   if(reduced&&!root.classList.contains('reduced'))window.PaperMotion?.finish?.(root);
   for(const [name,value]of Object.entries({big:!!p.large,contrast:!!p.contrast,reduced,'font-della':p.font==='della','font-grenze':p.font==='grenze','font-balthazar':!p.font||p.font==='balthazar'}))root.classList.toggle(name,value);
  }
  document.documentElement.style.setProperty('--post-head',p.font==='della'?'Della':p.font==='grenze'?'Grenze':'Balthazar');
  document.documentElement.style.setProperty('--post-scale',p.large?'1.15':'1');
 }
 apply();document.addEventListener('DOMContentLoaded',apply,{once:true});
 window.addEventListener('storage',event=>{if(event.key===key||event.key===null)apply()});media.addEventListener('change',apply);
 window.PostPreferences={apply};
})();
