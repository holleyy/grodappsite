/* The common presentation layer for ordinary play and both pressure-study routes. */
var PlayHUD = (() => {
  const $ = id => document.getElementById(id);
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const icon = name => `<img class="menu-icon" src="../icons/${name}.svg" alt="" width="24" height="24">`;
  let expanded = false, hooks, lastKey = '', activeHatch = 1;

  function cat(c, next, engine, numbered, global) {
    const name = c.coat === 'ginger' ? 'Ginger' : c.coat === 'blue' ? 'Blue' : c.coat;
    const description = `${c.order}. ${c.big ? 'Large ' : ''}${name} cat${global ? ', hatch ' + c.hatch : ''}${c.released ? ', ' + (c.status || 'released') : ', waiting'}`;
    return `<li class="arrival-cat ${c.released ? 'has-left' : ''} ${next ? 'is-next' : ''} ${c.big ? 'is-large' : ''}" aria-label="${esc(description)}"><span class="cat-portrait"><img src="${engine.face(c.coat)}" alt="" width="40" height="40">${global ? `<span class="cat-hatch">${c.hatch}</span>` : ''}${c.big ? '<span class="cat-size">Large</span>' : ''}</span>${numbered ? `<span class="cat-order">${c.order}</span>` : ''}</li>`;
  }

  function render(state, engine) {
    const running = state.shift ? state.shift.phase === 'running' : state.mode === 'running';
    document.body.dataset.clock = running ? state.tacticalPaused ? 'paused' : 'running' : state.mode;
    $('pause-button').hidden = !running;
    $('send').hidden = running;
    $('pause-button').classList.toggle('is-resume', !!state.tacticalPaused);
    $('arrival-peek').setAttribute('aria-expanded', String(expanded));
    $('arrival-peek').setAttribute('aria-label', `${expanded ? 'Close' : 'Inspect'} arrivals, ${state.queue.filter(c => !c.released).length} waiting`);
    $('arrival-count').textContent = state.queue.filter(c => !c.released).length;
    $('arrival-cadence').textContent = state.shift ? 'In arrival order' : HUDModel.cadence(state);
    $('arrival-peek').querySelector('.arrival-chevron').innerHTML = icon(expanded ? 'arrow-up' : 'arrow-down');
    $('arrival-panel').classList.toggle('is-expanded', expanded);
    $('arrival-panel').setAttribute('aria-label', expanded ? 'All arrivals. The board remains available.' : 'Upcoming cats by hatch');
    if (!$('precision-tools').hidden && state.cursor) { $('tile-x').value=state.cursor.x; $('tile-y').value=state.cursor.y; const piece=state.chutes.find(c=>c.x===state.cursor.x&&c.y===state.cursor.y);$('tile-description').textContent=`Column ${state.cursor.x+1}, row ${state.cursor.y+1}${piece?', '+piece.type+' turntable':''}`; }
    const lanes = HUDModel.lanes(state, 4);
    if (lanes.length>1 && !lanes.some(l=>l.hatch===activeHatch)) activeHatch=lanes[0].hatch;
    const tabs=$('arrival-tabs'), tabKey=lanes.length>1?lanes.map(l=>l.hatch).join(','):'';
    if(tabs.dataset.key!==tabKey){tabs.innerHTML=lanes.length>1?lanes.map(l=>`<button data-action="hatch-preview" data-arg="${l.hatch}">${l.hatch}</button>`).join(''):'';tabs.dataset.key=tabKey;}
    for(const button of tabs.children){const lane=lanes.find(l=>l.hatch===Number(button.dataset.arg));button.setAttribute('aria-pressed',String(lane.hatch===activeHatch));button.setAttribute('aria-label',`Preview hatch ${lane.hatch}, ${lane.remaining} waiting`);} 
    const key = JSON.stringify([expanded, activeHatch, lanes, state.shift?.round]);
    if (key === lastKey) return;
    lastKey = key;
    const scroll = $('arrival-lanes').scrollTop, focusHatch=document.activeElement?.matches('.hatch-key')?document.activeElement.dataset.arg:null;
    $('arrival-lanes').innerHTML = lanes.map(lane => {
      const list = expanded ? lane.all : lane.preview;
      const next = lane.upcoming[0];
      return `<section class="arrival-lane ${lane.hatch===activeHatch||lanes.length===1?'is-active':''} ${lane.remaining ? '' : 'is-exhausted'}" aria-label="${lane.hatch ? 'Hatch ' + lane.hatch : 'Arrival order'}">${lane.hatch ? `<button class="hatch-key" data-action="focus-hatch" data-arg="${lane.hatch}" aria-label="Find hatch ${lane.hatch}">${lane.hatch}</button>` : `<span class="arrival-order-icon" aria-hidden="true">${icon('arrow-right')}</span>`}<ol class="lane-cats ${expanded ? 'all-cats' : ''}">${list.map(c => cat(c, c === next, engine, expanded, lane.hatch === null)).join('')}${!list.length ? '<li class="lane-empty">All on their way</li>' : ''}</ol><span class="lane-remaining" aria-hidden="true">${lane.more && !expanded ? '+' + lane.more : lane.remaining ? lane.remaining + '<small>waiting</small>' : icon('check')}</span></section>`;
    }).join('');
    $('arrival-lanes').scrollTop = scroll;
    if(focusHatch)$('arrival-lanes').querySelector(`[data-action="focus-hatch"][data-arg="${focusHatch}"]`)?.focus({preventScroll:true});
  }

  function closeArrivals() {
    expanded = false; lastKey = '';
    hooks?.poll(); hooks?.layout();
    $('arrival-peek').focus({ preventScroll: true });
  }
  function toggleArrivals() {
    if (expanded) { closeArrivals(); return; }
    expanded = true; lastKey = '';
    const engine = hooks.engine(), state = engine.state();
    if (state.shift ? state.shift.phase === 'running' : state.mode === 'running') engine.pause(true);
    hooks.poll(); hooks.layout(); hooks.save();
  }
  function openPrecision() {
    expanded = false; lastKey = '';
    const engine = hooks.engine(), state = engine.state();
    if (state.shift ? state.shift.phase === 'running' : state.mode === 'running') engine.pause(true);
    engine.freeze(false);
    const x = Math.max(0, Math.min(state.board.w - 1, state.cursor?.x || 0));
    const y = Math.max(0, Math.min(state.board.h - 1, state.cursor?.y || 0));
    $('tile-x').innerHTML = Array.from({length:state.board.w}, (_,i) => `<option value="${i}">Col ${i+1}</option>`).join('');
    $('tile-y').innerHTML = Array.from({length:state.board.h}, (_,i) => `<option value="${i}">Row ${i+1}</option>`).join('');
    $('tile-x').value = x; $('tile-y').value = y;
    const choose = () => {
      const p = engine.setCursor(+$('tile-x').value, +$('tile-y').value);
      $('tile-description').textContent = `Column ${p.x+1}, row ${p.y+1}${p.piece ? ', ' + p.piece : ', empty tile'}`;
    };
    $('tile-x').onchange = choose; $('tile-y').onchange = choose;
    $('precision-tools').hidden = false; choose(); hooks.poll(); hooks.layout(); hooks.save();
    $('tile-x').focus({preventScroll:true});
  }
  function closePrecision() { $('precision-tools').hidden = true; hooks?.layout(); $('more-button').focus({preventScroll:true}); }
  function reset() { expanded = false; lastKey = ''; activeHatch=1; $('precision-tools').hidden = true; }

  function layout(view, sheetOpen, sheetKind) {
    if (view !== 'play') return { top: 12, bottom: 12, left: 12, right: 12 };
    const side = matchMedia('(min-width:1000px), (min-width:500px) and (max-height:600px)').matches;
    const head = $('play-head').getBoundingClientRect(), desk = $('desk').getBoundingClientRect();
    $('arrival-panel').style.top = head.bottom + 8 + 'px';
    const room = Math.max(46, desk.top - head.bottom - 16);
    $('arrival-panel').style.setProperty('--arrivals-max', (side ? room : Math.min(expanded ? 220 : 206, Math.max(80, room - 100))) + 'px');
    const arrivals = $('arrival-panel').getBoundingClientRect();
    const receipt = sheetOpen && sheetKind === 'delivery' ? $('sheet').offsetHeight + 12 : 0;
    document.documentElement.style.setProperty('--toast-bottom', innerHeight - desk.top + 8 + 'px');
    return {
      top: receipt ? 16 : Math.ceil(side ? head.bottom + 14 : arrivals.bottom + 10),
      bottom: side ? 16 : Math.max(receipt, Math.ceil(innerHeight - desk.top + 12)),
      left: 12,
      right: side ? Math.ceil(innerWidth - desk.left + 16) : 12
    };
  }
  function chooseHatch(hatch) { activeHatch=hatch;lastKey='';hooks.poll();hooks.layout(); }
  return { chooseHatch, connect(value) { hooks = value; }, render, layout, toggleArrivals, closeArrivals, openPrecision, closePrecision, reset, get expanded() { return expanded; }, get precision() { return !$('precision-tools').hidden; } };
})();
