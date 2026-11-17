/* One theme context crosses the same-origin interface frames; preferences stay separate. */
(() => {
 'use strict';
 const source=document.currentScript?.src,materials={};
 if(source)for(const [name,path]of Object.entries({print:'images/print-paper.webp',button:'images/paper-button.webp',box:'images/observations/box-open-chewed.webp'}))materials['--ui-material-'+name]='url("'+new URL(path,source).href+'")';
 let owner;try{owner=parent!==window&&parent.InterfaceTheme}catch{}
 if(!owner){
  const themes=new Map([['postal',Object.freeze({id:'postal',font:'balthazar',variables:Object.freeze({})})]]),listeners=new Set();let current=themes.get('postal');
  owner={
   register(value){
    if(!value||!/^[-a-z0-9]+$/.test(value.id)||value.id==='postal'||themes.has(value.id)||!['balthazar','della','grenze'].includes(value.font))throw Error('Invalid or duplicate interface theme');
    const variables={};for(const [name,text]of Object.entries(value.variables||{})){if(!/^--ui-[a-z0-9-]+$/.test(name)||typeof text!=='string'||!text.trim()||/[;{}<>]/.test(text))throw Error('Invalid theme role');variables[name]=text;}
    for(const [role,aliases]of Object.entries({ink:['play-ink','chapter-ink','start-ink'],muted:['play-muted','chapter-muted'],paper:['play-paper'],accent:['play-accent','chapter-accent'],line:['play-line']}))if(variables['--ui-'+role])for(const alias of aliases)if(!variables['--ui-'+alias])variables['--ui-'+alias]=variables['--ui-'+role];
    themes.set(value.id,Object.freeze({id:value.id,font:value.font,variables:Object.freeze(variables)}));
   },
   read:()=>current,
   use(id){const next=themes.get(id)||themes.get('postal');if(next===current)return current;current=next;for(const fn of listeners)fn(current);return current;},
   subscribe(fn){listeners.add(fn);return()=>listeners.delete(fn)}
  };
 }
 let applied=[],off;
 function apply(theme){const root=document.documentElement,variables={...materials,...theme.variables};for(const name of applied)root.style.removeProperty(name);applied=Object.keys(variables);for(const name of applied)root.style.setProperty(name,variables[name]);root.dataset.theme=theme.id;}
 function attach(){off?.();apply(owner.read());off=owner.subscribe(apply)}
 window.InterfaceTheme=owner;attach();
 window.addEventListener('pagehide',()=>{off?.();off=null});window.addEventListener('pageshow',attach);
})();
