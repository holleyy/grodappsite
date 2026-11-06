/* Paper over the native chapter controls; the game owns every scene and clock. */
(function(root){
 'use strict';
 function model(s,mode=s?.lifecycle?.presentation,progress=s?.progress){
  const place=PostalIdentity.forLevel(s?.id),chapter=Number(s?.id?.split('-')[0]),kinds={exit:'departure',intro:'arrival',demo:'demonstration',growth:'growth',station:'growth',finale:'film',thanks:'thanks',credits:'credits'};
  const wins=Object.fromEntries(Object.entries(progress?.levels||{}).filter(([,r])=>r?.stars?.delivered===true));
  const kind=kinds[mode]||'quiet',ending=s?.id==='8-15'&&['thanks','credits'].includes(mode)&&s.lifecycle?.presentation===mode;
  return {kind,place,chapter,nextPlace:mode==='exit'?PostalIdentity.forLevel((chapter+1)+'-1'):null,earned:PostalIdentity.chapterEarned(chapter,wins),canLeave:!!(ending&&!s.pending&&!s.frozen&&!s.daily&&!s.practice&&!s.shift&&s.lifecycle?.canNavigate&&s.lifecycle?.actions?.back)};
 }
 function leave(bridge,navigate){
  const s=bridge.state();if(typeof navigate!=='function'||!model(s,s?.lifecycle?.presentation,s?.progress).canLeave)return false;
  const result=bridge.back();if(result?.status!=='accepted')return false;navigate('main-menu');return true;
 }
 function mount(doc,bridge,navigate){
  const panel=doc.getElementById('chapterScene'),card=doc.getElementById('chapterCard');if(!panel||!card)return null;if(card.chapterPaper)return card.chapterPaper;
  const title=doc.getElementById('chapterTitle'),text=doc.getElementById('chapterText'),primary=doc.getElementById('chapterPrimary'),row=primary.parentElement;
  const decor=doc.createElement('div');decor.className='chapter-letter-content';card.insertBefore(decor,title);
  const closing=doc.createElement('div');closing.className='chapter-closing';card.insertBefore(closing,row);
  const office=doc.createElement('button');office.id='chapter-office';office.type='button';office.className='chapter-office';office.textContent='Back to the office';office.hidden=true;card.insertBefore(office,row);
  const returns=doc.createElement('div');returns.className='chapter-return-actions';for(const button of Array.from(card.children).filter(n=>n.tagName==='BUTTON'&&n!==office))returns.appendChild(button);card.appendChild(returns);
  let last='',lastKind='',creditsFocus=false;
  const before=(node,anchor)=>{if(node.nextSibling!==anchor)card.insertBefore(node,anchor)};
  panel.addEventListener('keydown',event=>{if(event.key!=='Tab'||panel.hidden)return;const buttons=Array.from(card.querySelectorAll('button')).filter(b=>!b.disabled&&b.getClientRects().length);if(!buttons.length)return;event.preventDefault();event.stopImmediatePropagation();const index=buttons.indexOf(doc.activeElement),next=index<0?(event.shiftKey?buttons.length-1:0):(index+(event.shiftKey?-1:1)+buttons.length)%buttons.length;buttons[next].focus()},true);
  office.addEventListener('click',()=>{office.disabled=true;try{leave(bridge,navigate)}finally{office.disabled=false}});
  function refresh(){
   if(panel.hidden)return;const s=bridge.state();if(!s)return;const mode=s.lifecycle?.presentation,m=model(s,mode,s.progress),key=[s.id,mode,m.earned,m.canLeave].join(':');
   office.hidden=!m.canLeave||typeof navigate!=='function';if(key===last)return;last=key;const entered=m.kind!==lastKind;if(entered)creditsFocus=m.kind==='credits';lastKind=m.kind;card.dataset.paperKind=m.kind;card.dataset.paperPlace=m.place?.id||'';
   const mark=m.place?PostalIdentity.mark(m.place.id,{base:'../journey/images/postmarks/',className:'chapter-impression',earned:m.earned&&m.kind==='departure',label:m.earned&&m.kind==='departure'?m.place.title+' chapter posted':m.place.title+' postal identity'}):'';
   decor.innerHTML=['film','quiet'].includes(m.kind)?'':mark;
   closing.innerHTML=m.kind==='thanks'?'<p class="chapter-signoff">Thank you for playing.<span>Alex Holley</span></p>':m.kind==='credits'?'<p class="chapter-creator">Alex Holley</p>':'';
   if(m.kind==='credits'){before(closing,text);before(office,row)}else{before(closing,row);before(office,returns)}
   if(m.nextPlace){const caption=primary.textContent;primary.replaceChildren(doc.createTextNode(caption));primary.insertAdjacentHTML('beforeend',PostalIdentity.mark(m.nextPlace.id,{base:'../journey/images/postmarks/',className:'chapter-destination',decorative:true}))}
   if(m.kind==='credits'){text.textContent='Thank you to our playtesters — and to every cat who waited for the right box.';primary.textContent="Today’s puzzle";doc.getElementById('chapterSecondary').textContent='Night Shift'}
   if(m.kind==='thanks')primary.textContent='Behind the post';
   office.classList.toggle('is-primary',m.kind==='credits');
   if(m.kind==='credits'&&!office.hidden&&(creditsFocus||!card.contains(doc.activeElement))){office.focus({preventScroll:true});creditsFocus=false}
  }
  refresh.focus=()=>{if(panel.hidden)return false;refresh();const target=card.dataset.paperKind==='credits'&&!office.hidden?office:primary;if(target.disabled||!target.getClientRects().length)return false;target.focus({preventScroll:true});return doc.activeElement===target};
  const observer=new MutationObserver(refresh);observer.observe(panel,{attributes:true,attributeFilter:['data-chapter-mode','hidden']});
  bridge.subscribe(refresh);doc.defaultView.addEventListener('pageshow',()=>{last='';refresh()});card.chapterPaper=refresh;refresh();return refresh;
 }
 const focus=()=>root.document?.getElementById('chapterCard')?.chapterPaper?.focus?.()||false;
 const api={model,leave,mount,focus};root.ChapterPaper=api;if(typeof module!=='undefined')module.exports=api;
 if(typeof document!=='undefined'&&root.GameBridge)mount(document,root.GameBridge,typeof parent!=='undefined'&&parent!==root?(action)=>parent.JourneyHandoff?.handle(action):null);
})(globalThis);
