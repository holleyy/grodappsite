/* Presentation policy only. Native snapshots own wins, clocks and advancement. */
(function(root){
 'use strict';
 function outcome(s){return s?.shift?s.shift.phase:s?.mode;}
 function resultKey(s){return [s?.runID||s?.id,s?.id,s?.shift?.round||0,outcome(s)].join(':');}
 function canPresentResult(s){
  return !!s&&['won','lost','ended'].includes(outcome(s))&&!s.pending&&!s.frozen&&
   (!s.lifecycle?.presentation||s.lifecycle.presentation==='none')&&s.lifecycle?.resultReady!==false&&s.lifecycle?.homeState!=='settling';
 }
 function canReadResult(s){
  if(!s?.frozen)return canPresentResult(s);
  return Array.isArray(s.suspensions)&&s.suspensions.length>0&&s.suspensions.every(r=>r==='menu')&&canPresentResult({...s,frozen:false});
 }
 function onward(s,levels,context){
  if(context&&['planned','complete'].includes(context.kind))return{kind:'map'};
  const index=levels.findIndex(l=>l.id===s.id),next=index<0?null:levels[index+1],letter=context?.letter||next;
  if(!letter||letter.planned)return{kind:'map'};
  return{kind:letter.id===next?.id?'advance':'letter',letter};
 }
 function canContinue(s,plan){
  if(!canPresentResult(s))return false;
  if(plan.kind==='map')return true;
  if(!s.lifecycle?.winRecorded)return false;
  return plan.kind==='letter'||s.lifecycle?.canAdvance===true;
 }
 const api={outcome,resultKey,canPresentResult,canReadResult,onward,canContinue};root.JourneyFlow=api;if(typeof module!=='undefined')module.exports=api;
})(globalThis);
