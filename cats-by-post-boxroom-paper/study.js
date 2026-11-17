/* Study chrome only. Play and progression remain in the canonical interface. */
'use strict';
const $=id=>document.getElementById(id),frame=$('loft');
let mode='daily',generation=0,motion=true,grey=false,roomCamera=true,frameKind='',documentURL='';
const now=new Date(),localDate=[now.getFullYear(),String(now.getMonth()+1).padStart(2,'0'),String(now.getDate()).padStart(2,'0')].join('-');
$('date').value=localDate;$('weekday').value='0';
for(let w=5;w<=10;w++)for(let h=4;h<=8;h++){const o=document.createElement('option');o.value=w+'x'+h;o.textContent=w+' × '+h;$('size').append(o)}$('size').value='7x6';

const seasonMonths={winter:0,spring:3,summer:6,autumn:9};
function seasonDate(season){const year=Number(($('date').value||localDate).slice(0,4)),day=new Date(Date.UTC(year,seasonMonths[season],1));day.setUTCDate(1+(5-day.getUTCDay()+7)%7);return day.toISOString().slice(0,10);}
const preview=new URLSearchParams(location.search),selectedSeason=preview.get('season');
if(Object.hasOwn(seasonMonths,selectedSeason)){mode='room';$('season').value=selectedSeason;$('date').value=seasonDate(selectedSeason);if(preview.get('light')==='night')$('light').value='free';$('settings').hidden=false;$('controls').setAttribute('aria-expanded','true');}
$('season').onchange=()=>{if($('season').value){$('date').value=seasonDate($('season').value);void open();}};
$('date').onchange=()=>{$('season').value='';};

const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
async function until(fn,token){for(let i=0;i<800;i++){if(token!==generation)return null;const result=fn();if(result)return result;await wait(50)}throw Error('The loft is taking longer than expected. Please try opening it again.');}
function game(){return frame.contentWindow?.APP?.engine||frame.contentWindow?.GameBridge;}
function paper(){return mode==='room'?frame.contentWindow?.BoxRoomPaper:frame.contentDocument?.getElementById('world')?.contentWindow?.BoxRoomPaper;}
function settings(){paper()?.motion(motion);game()?.grey(grey);if(mode!=='room')game()?.camera(roomCamera?'room':'board');}
function navigate(url,kind,token){const target=new URL(url,location.href);target.searchParams.set('loftStudyRequest',String(token));documentURL=target.href;frameKind=kind;frame.src=documentURL;}
function expectedDocument(){return frame.contentWindow?.location.href===documentURL&&frame.contentDocument?.readyState==='complete';}
async function open(){
 const token=++generation;$('loading').hidden=false;$('error').hidden=true;
 const seed=Number($('seed').value)>>>0,date=$('date').value||localDate;
 for(const b of document.querySelectorAll('[data-mode]'))b.setAttribute('aria-pressed',String(b.dataset.mode===mode));
 for(const el of document.querySelectorAll('.room-only'))el.hidden=mode!=='room';
 try{
  if(mode==='room'){
   const [w,h]=$('size').value.split('x'),url=new URL('game/engine.html',location.href);
   url.search=new URLSearchParams({boxroom:'1',seed,w,h,date,mode:$('light').value});navigate(url,'room',token);
   const p=await until(()=>expectedDocument()&&frame.contentWindow?.BoxRoomPaper?.active()&&frame.contentWindow.BoxRoomPaper,token);if(!p)return;
   $('caption').textContent=`Room study · ${w} × ${h} · ${date} · seed ${seed}`;
  }else{
   if(frameKind!=='play')navigate('journey/play/index.html','play',token);
   await until(()=>expectedDocument()&&frame.contentWindow?.APP,token);
   if(token!==generation)return;const value=mode==='daily'?date:mode==='practice'?{weekday:Number($('weekday').value),seed,date}:seed;
   if(!await frame.contentWindow.APP.start(mode,value)){if(mode==='practice'){$('settings').hidden=false;$('controls').setAttribute('aria-expanded','true');throw Error('No Practice route was found for this seed and day. Choose another seed or day in Details.');}throw Error('This post could not be opened. Try again.');}
   if(token!==generation)return;$('caption').textContent=mode==='daily'?`Today’s post · ${date}`:mode==='practice'?`Practice · ${$('weekday').selectedOptions[0].textContent} · seed ${seed}`:`Night Shift · seed ${seed}`;
  }
  settings();$('loading').hidden=true;
 }catch(e){if(token===generation){$('loading').hidden=true;$('error').textContent=e.message;$('error').hidden=false;}}
}
for(const b of document.querySelectorAll('[data-mode]'))b.onclick=()=>{mode=b.dataset.mode;if(mode==='room'){$('settings').hidden=false;$('controls').setAttribute('aria-expanded','true')}void open();};
$('settings').onsubmit=e=>{e.preventDefault();void open()};
$('controls').onclick=()=>{$('settings').hidden=!$('settings').hidden;$('controls').setAttribute('aria-expanded',String(!$('settings').hidden))};
$('camera').onclick=()=>{roomCamera=!roomCamera;$('camera').textContent=roomCamera?'Whole room':'Board view';settings()};
$('motion').onclick=()=>{motion=!motion;$('motion').setAttribute('aria-pressed',String(!motion));$('motion').textContent=motion?'Pause ambience':'Resume ambience';settings()};
$('greyscale').onclick=()=>{grey=!grey;$('greyscale').setAttribute('aria-pressed',String(grey));settings()};
void open();
