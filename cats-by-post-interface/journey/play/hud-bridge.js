/* Presentation extension. No rules, renderer, lifecycle or progress authority changes. */
(() => {
  if (Lab.hudAdapter) return;
  const study = ['quiet','busy'].includes(new URLSearchParams(parent.location.search).get('hud'));
  // Sample restores must never write an old progress snapshot over the map's progress.
  if (study) {
    progressStore = { get: key => LOCAL_STORE.get(key), set() {} };
    // Use the original read-only trial mode with its editor explicitly put away.
    ed.trying = true;
    document.getElementById('editor').style.setProperty('display','none','important');
  }
  const baseState = Lab.state, art = {};
  let hudPaused = false;
  const prepare = gPrepareSrc;
  gPrepareSrc = function (...args) { const result=prepare(...args); if (!gm.shift && gm.mode === 'running' && hudPaused && gm.cursor) G_SRC.cursor = gm.cy * gm.L.board.w + gm.cx; return result; };
  Lab.state = function () {
    const state = baseState();
    hudPaused = !!state.tacticalPaused;
    state.tickMs = GR_TICK_MS;
    state.releaseEvery = gm.shift ? null : GR_RELEASE_EVERY;
    state.cursor = { x: gm.cx, y: gm.cy, visible: gm.cursor };
    state.queue = state.queue.map(cat => {
      const hatch = gm.sim?.hatches[cat.hatch - 1];
      const status = gm.shift ? cat.released ? 'released' : 'waiting'
        : hatch && gm.mode !== 'edit' ? GL_STATES[gm.sim.st[hatch.first + cat.order - 1]] : 'waiting';
      return { ...cat, big: false, size: 1, status, ...(gm.shift ? {} : { releaseTick: (cat.order - 1) * GR_RELEASE_EVERY }) };
    });
    return state;
  };
  Lab.piece = function (type) {
    if (art[type]) return art[type];
    const item = PAPER_SPRITE_DATA.pieces.find(s => s.id === 'turntable_' + type + '_E/idle');
    if (!item) return null;
    const canvas = document.createElement('canvas');
    canvas.width = item.rect.w * 4; canvas.height = item.rect.h * 4;
    const ctx = canvas.getContext('2d'), frame = ctx.createImageData(canvas.width, canvas.height);
    const out = new Uint32Array(frame.data.buffer), raw = atob(item.pixels);
    for (let i = 0; i < raw.length; i++) { const colour = raw.charCodeAt(i); out[i] = colour === 255 ? 0 : PAL32[colour]; }
    ctx.putImageData(frame, 0, 0);
    return art[type] = canvas.toDataURL();
  };
  Lab.closeup = function () { Lab.camera('board'); Lab.zoom(scale * .4); };
  // A tap places; a deliberate single-finger drag moves the working view.
  // The native handler still owns pinch gestures and tap cancellation.
  const touch = new Map();
  screen.addEventListener('pointerdown', e => {
    if (e.pointerType === 'touch') touch.set(e.pointerId, {x:e.clientX,y:e.clientY,x0:e.clientX,y0:e.clientY,dragging:false});
  });
  screen.addEventListener('pointermove', e => {
    const p=touch.get(e.pointerId); if(!p)return;
    const dx=e.clientX-p.x,dy=e.clientY-p.y;p.x=e.clientX;p.y=e.clientY;
    if(PTR.size!==1||multiTouch)return;
    if(!p.dragging&&Math.hypot(p.x-p.x0,p.y-p.y0)>12)p.dragging=true;
    if(p.dragging){mouseDrag=true;panBy(-dx*devDpr/scale,-dy*devDpr/scale);}
  });
  screen.addEventListener('pointerup',e=>touch.delete(e.pointerId));
  screen.addEventListener('pointercancel',e=>touch.delete(e.pointerId));
  Lab.hudAdapter = true;
})();
