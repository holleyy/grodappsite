/* A deliberately separate adapter for the interface lab. The source game is unchanged. */
(function(){
  const M=LabModel, history=M.history();
  let insets={top:90,bottom:220,left:12,right:12}, framing='board', roomViews={}, frozen=true, manual=false, sampleMode=false, tacticalPaused=false;
  const clone=x=>M.decode(M.encode(x));
  const originalTap=gTap, originalClear=gClear, originalHint=gHint, originalSend=gSend;
  const instant=()=>gm.L.id+':'+(gm.shift?gm.shift.round+':'+(gm.sim?.tick||0):gm.mode==='running'?'run:'+(gm.sim?.tick||0):'setup');
  const editable=()=>gm.shift?(gm.shift.phase==='tea'&&!!gm.shift.cardChoice&&!gm.shift.pendingWalkies||gm.shift.phase==='running'&&gm.shift.paused):gm.mode!=='running'||tacticalPaused;
  const pieces=()=>({chutes:clone(gm.chutes),tray:clone(gm.tray),sel:gm.sel});
  function changed(){try{parent.dispatchEvent(new CustomEvent('labchange'))}catch{}}
  function edit(fn){const before=pieces(),stamp=instant();fn();if(JSON.stringify(before)!==JSON.stringify(pieces())){if(editable())history.push(before,stamp);else history.clear();changed()}}
  const precisionStory=()=>!gm.shift&&gm.mode==='running'&&tacticalPaused;
  function storyLocked(x,y){const sim=gm.sim;if(!sim)return false;for(let i=0;i<sim.n;i++)if((sim.st[i]===GL_BOARD||((sim.ev[i]===GE_DELIVERED||sim.ev[i]===GE_WRONG)&&gm.t<sim.tick*G_TICK))&&((sim.x[i]===x&&sim.y[i]===y)||(sim.px[i]===x&&sim.py[i]===y)))return true;return false}
  function syncStoryPieces(){if(!gm.sim||gm.shift)return;gm.sim.chDir.fill(-1);gm.sim.chType.fill(0);for(const p of gm.chutes){const k=p.y*gm.sim.W+p.x;gm.sim.chDir[k]=GR_DIR[p.dir];gm.sim.chType[k]=GR_TYPE[p.type]}gSyncSrc();dirty=true}
  function preciseEdit(fn){const mode=gm.mode;gm.mode='edit';try{fn()}finally{gm.mode=mode;syncStoryPieces();gHud()}}
  gTap=function(x,y){if(precisionStory()){if(storyLocked(x,y)){gStatus('A cat is on or heading for that tile.');return}edit(()=>preciseEdit(()=>originalTap(x,y)))}else edit(()=>originalTap(x,y))};
  gClear=function(){if(!editable())return;if(precisionStory())edit(()=>{for(const c of gm.chutes)if(!c.locked&&!storyLocked(c.x,c.y))gm.tray[c.type]++;gm.chutes=gm.chutes.filter(c=>c.locked||storyLocked(c.x,c.y));syncStoryPieces();gHud()});else edit(originalClear)};
  gHint=function(){originalHint();history.clear();changed()};
  gSend=function(){history.clear();originalSend();changed()};
  function undo(){const before=history.pop(instant());if(!before||!editable())return false;
    if(gm.shift){const s=gm.shift;for(const p of s.turntables.slice())NIGHTSHIFT.edit(s,{action:'pickup',x:p.x,y:p.y});for(const p of before.chutes)NIGHTSHIFT.edit(s,{action:'place',...p});gm.sel=before.sel;nsSync()}
    else{gm.chutes=before.chutes;gm.tray=before.tray;gm.sel=before.sel;if(precisionStory())syncStoryPieces();else gToEdit()}
    gStatus('Last arrangement undone.');gHud();changed();return true;
  }
  function boardBounds(){const B=gm.L.board,x=gBoardX(B)*TILE,y=gBoardY(B)*TILE;
    return{x0:OX+x-y-B.h*TILE-26,x1:OX+x+B.w*TILE-y+26,y0:OY+(x+y)/2-34,y1:OY+(x+y+(B.w+B.h)*TILE)/2+24};}
  const originalNightSave=nsSaveResult;
  nsSaveResult=function(){if(sampleMode){nsui.savedEnd=true;return}originalNightSave()};
  const rawPan=panBy;
  panBy=function(dx,dy){manual=true;rawPan(dx,dy)};
  resetView=function(){camera();remember()};
  gMeasureHud=function(){gHudPx=0;gFlapSidePx=0};
  gCamera=function(){if(!gm.L)return;const b=boardBounds(),s=scale;
    if(framing==='room'){WS.camX=G_ROOM?0:G_CAM_X;WS.camY=(G_ROOM?0:G_CAM_Y)+(insets.bottom-insets.top)*devDpr/(2*s);return}
    WS.camX=(b.x0+b.x1)/2-VIEW_CX+(insets.right-insets.left)*devDpr/(2*s);
    WS.camY=(b.y0+b.y1)/2-VIEW_CY+(insets.bottom-insets.top)*devDpr/(2*s);
  };
  function camera(mode='board'){manual=false;framing=mode;const b=boardBounds();const w=Math.max(60,innerWidth-insets.left-insets.right),h=Math.max(80,innerHeight-insets.top-insets.bottom);
    const target=mode==='room'?Math.min(w*devDpr/ROOM_FIT_W,h*devDpr/ROOM_FIT_H):Math.min(w*devDpr/(b.x1-b.x0),h*devDpr/(b.y1-b.y0));
    view.zoom=Math.max(1,Math.floor(target));view.panX=view.panY=0;applyScale();gCamera();dirty=true;return viewState();
  }
  function viewState(){return{zoom:view.zoom,x:view.panX,y:view.panY,framing,manual}}
  function remember(){if(gm.L)roomViews[ACTIVE_ROOM.id]=viewState()}
  function restoreView(){const v=roomViews[ACTIVE_ROOM.id];if(v){manual=!!v.manual;framing=v.framing;view.zoom=v.zoom;view.panX=v.x;view.panY=v.y;applyScale()}else camera()}
  function project(x,y){const wx=OX+gTX(x)-gTY(y),wy=OY+(gTX(x)+gTY(y))*.5;return{x:(dstX+(wx-(VIEW_CX+WS.camX+view.panX-LW/2))*scale)/devDpr,y:(dstY+(wy-(VIEW_CY+WS.camY+view.panY-LH/2))*scale)/devDpr}}
  function queue(){const s=gm.shift;
    if(s){const c=s.current;return c.releaseOrder.map((id,j)=>({order:j+1,hatch:c.releaseHatches[j]+1,coat:GR_COATS[c.sim.coat[id]],released:j<c.released}))}
    const q=[];for(let h=0;h<gm.L.hatches.length;h++){const H=gm.L.hatches[h],S=gm.sim?.hatches[h];H.cats.forEach((cat,j)=>q.push({order:j+1,hatch:h+1,coat:grCatCoat(cat)===GR_GINGER?'ginger':'blue',released:!!S&&gm.mode!=='edit'&&gm.sim.st[S.first+j]!==GL_WAIT}))}return q;
  }
  const faceCache={};
  function uiFace(coat){if(faceCache[coat])return faceCache[coat];const item=PAPER_SPRITE_DATA.sprites.find(s=>s.id==='cat_'+coat+'_box_towards/idle0');if(!item)return gQueueFace(coat);
    const w=item.rect.w*4,h=item.rect.h*4,c=document.createElement('canvas');c.width=w;c.height=h;const ctx=c.getContext('2d'),frame=ctx.createImageData(w,h),out=new Uint32Array(frame.data.buffer),raw=atob(item.pixels);
    for(let i=0;i<raw.length;i++){const col=raw.charCodeAt(i);out[i]=col===255?0:PAL32[col]}
    ctx.putImageData(frame,0,0);return faceCache[coat]=c.toDataURL();
  }
  function state(){const s=gm.shift;return{sample:sampleMode,resultStars:gm.mode==='won'?SCORE.stars(gm.L,gm.chutes.length,gm.attempts,gm.hinted):null,id:gm.L.id,title:gm.L.title,li:gm.li,room:ACTIVE_ROOM.id,board:gm.L.board,mode:gm.mode,phase:s?.phase||gm.mode,paused:s?!!s.paused:tacticalPaused||frozen,tacticalPaused:s?!!s.paused:tacticalPaused,frozen,
    tray:{...gm.tray},sel:gm.sel,chutes:clone(gm.chutes),hinted:gm.hinted,attempts:gm.attempts,target:gm.L.minTurntables,tick:gm.sim?.tick||0,home:s?s.catsHome:gm.sim?Array.from(gm.sim.st).filter(v=>v===GL_DONE).length:0,
    shift:s?{run:clone(s.run),round:s.round,strikes:s.strikes,phase:s.phase,paused:s.paused,fast:s.fastForward,offers:s.cardOffers,choice:s.cardChoice,walkies:s.pendingWalkies,walkiesFrom:nsui.walkiesFrom,best:nsBest(),sleepers:s.sleepers.length}:null,
    status:hud.status.textContent,pending:gPracticePending,queue:queue(),undo:editable()&&history.size>0,editable:editable(),hatches:gm.L.hatches.map((h,i)=>({...h,number:i+1,...project(h.x+.5,h.y+.5)})),
    progress:clone(progress),collection:gCollection(),daily:gm.daily?{key:gm.daily.key,number:gm.daily.entry.number}:null,practice:gm.practice?{key:gm.practice.key,weekday:gm.practice.entry.weekday,seed:gm.practice.entry.seed}:null,camera:viewState()};
  }
  function snapshot(){remember();return clone({gm,sampleMode,tacticalPaused,nightTraces:NS_TRACES,gameTraces:G_TRACES,ns:{time:nsui.time,ending:nsui.ending,eventFrames:nsui.eventFrames,lastTick:nsui.lastTick,walkiesFrom:nsui.walkiesFrom,savedEnd:nsui.savedEnd,unlocked:nsui.unlocked},roomViews,view:viewState(),loopFrame,progress})}
  function restore(data){const d=clone(data),g=d.gm;sampleMode=!!d.sampleMode;history.clear();window.__chapterReady=false;
    if(g.shift)nsLoad(g.shift.run,g.shift.settings);else gLoadLevel(g.L,g.daily?gDailyRoom(g.daily.key,g.L):g.practice?gDailyRoom(g.practice.entry.date,g.L):undefined);
    Object.assign(gm,g);progress=d.progress;progressSave();
    if(g.shift){nsRebuildRoom();Object.assign(nsui,d.ns);nsui.sleepSprites=new WeakMap();for(let i=0;i<d.nightTraces.length;i++){NS_TRACES[i]=d.nightTraces[i];NS_POSES[i]??=makeBoardCatPose()}nsSync()}
    else{for(let i=0;i<d.gameTraces.length;i++){G_TRACES[i]=d.gameTraces[i];G_POSES[i]??=makeBoardCatPose()}gSyncSrc()}
    roomViews=d.roomViews||{};loopFrame=d.loopFrame||0;loopT=loopFrame/60;manual=!!d.view?.manual;framing=d.view?.framing||'board';view.zoom=d.view?.zoom;view.panX=d.view?.x||0;view.panY=d.view?.y||0;
    tacticalPaused=!gm.shift&&gm.mode==='running';if(gm.shift&&gm.shift.phase==='running')NIGHTSHIFT.setPaused(gm.shift,true);frozen=true;paused=true;gHud();applyScale();gCamera();dirty=true;return state();
  }
  function load(kind,value,sample=false){tacticalPaused=false;sampleMode=sample||kind==='sample';const prior=sampleMode?clone(progress):null;history.clear();window.__chapterReady=false;frozen=false;paused=false;
    if(kind==='night')nsLoad(value==='weekly'?NIGHTSHIFT_META.weekForInstant(new Date()):{kind:'random',seed:typeof value==='number'?value:gPracticeSeed()});
    else if(kind==='daily'){if(!gLoadDaily())return false}
    else if(kind==='practice'){gPracticeNew(Number(value)||0)}
    else gLoad(Number(value)||0);
    if(sampleMode){gm.custom=true;progress=prior;progressSave()}
    restoreView();changed();return true;
  }
  window.Lab={geometry(){const b=gm.L.board;return [[0,0],[b.w,0],[b.w,b.h],[0,b.h]].map(([x,y])=>project(x,y))},state,snapshot,restore,load,undo,levels:LEVELS.map((l,i)=>({i,id:l.id,title:l.title})),face:uiFace,
    remember,backdrop(){camera('board')},
    layout(v){const changedSize=JSON.stringify(insets)!==JSON.stringify(v);insets=v;if(changedSize){if(manual){gCamera();dirty=true}else camera(framing)}},
    freeze(value){frozen=!!value;paused=frozen||tacticalPaused;lastNow=-1;acc=0},
    pause(value=true){if(gm.shift){if(gm.shift.phase==='running')NIGHTSHIFT.setPaused(gm.shift,!!value)}else if(gm.mode==='running')tacticalPaused=!!value;if(!value)history.clear();paused=frozen||tacticalPaused;lastNow=-1;acc=0;gHud();dirty=true;changed()},
    resume(){frozen=false;tacticalPaused=false;if(gm.shift&&gm.shift.phase==='running')NIGHTSHIFT.setPaused(gm.shift,false);history.clear();paused=false;lastNow=-1;acc=0;gHud();changed()},
    camera(mode){const r=camera(mode);remember();return r},
    focus(hatch){framing='board';camera();const p=gm.L.hatches[hatch-1];if(p){const pos=project(p.x+.5,p.y+.5);manual=true;panBy((pos.x-(insets.left+innerWidth-insets.right)/2)*devDpr/scale,(pos.y-(insets.top+innerHeight-insets.bottom)/2)*devDpr/scale)}dirty=true;remember()},
    zoom(dir){manual=true;zoomStep(dir,devW/2,devH/2);remember()},pan(x,y){manual=true;panBy(x*12,y*12);remember()},
    tap(x,y){if(x>=0&&y>=0&&x<gm.L.board.w&&y<gm.L.board.h){gm.cx=x;gm.cy=y;gm.cursor=true;gTap(x,y);dirty=true}},
    select(type){if(G_TYPES.includes(type))gm.sel=type;gHud()},
    clear:gClear,hint:gHint,
    send(){if(precisionStory()){window.Lab.resume();return}history.clear();frozen=false;tacticalPaused=false;paused=false;if(gm.shift&&gm.shift.paused)nsSend();else if(!gm.shift)gSend();changed()},
    arrange(){tacticalPaused=false;frozen=false;paused=false;if(gm.shift)NIGHTSHIFT.setPaused(gm.shift,true);else gToEdit();history.clear();gHud();changed()},
    stop(){tacticalPaused=false;if(gm.shift)NIGHTSHIFT.setPaused(gm.shift,true);else gToEdit();frozen=false;paused=false;history.clear();gHud();changed()},
    fast(){if(gm.shift){NIGHTSHIFT.setFastForward(gm.shift,!gm.shift.fastForward);gHud()}},
    card(id){history.clear();nsChooseCard(id);changed()},nextRound(){history.clear();nsNext();camera();changed()},
    grey(value){grayscale=!!value;dirty=true},
    setCursor(x,y){gm.cx=x;gm.cy=y;gm.cursor=true;dirty=true;return{x,y,piece:gPieceAt(x,y)}},
    cursor(dx,dy){gm.cx=clamp(gm.cx+dx,0,gm.L.board.w-1);gm.cy=clamp(gm.cy+dy,0,gm.L.board.h-1);gm.cursor=true;dirty=true;return{x:gm.cx,y:gm.cy,piece:gPieceAt(gm.cx,gm.cy)}},place(){gTap(gm.cx,gm.cy);dirty=true}
  };
  // The shell owns shortcuts; prevent the original page's invisible controls acting twice.
  window.addEventListener('keydown',e=>{if(e.key==='Tab')return;const shortcuts=['Escape','p','P','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Enter',' ','1','2','3','0','+','=','-'];if(!shortcuts.includes(e.key)&&!((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='z'))return;e.preventDefault();e.stopImmediatePropagation();parent.dispatchEvent(new KeyboardEvent('keydown',{key:e.key,ctrlKey:e.ctrlKey,metaKey:e.metaKey,bubbles:true}))},true);
  camera();paused=true;changed();
})();
