/* Presentation only. The game remains the authority for arrivals and progress. */
var HUDModel = (() => {
  function lanes(state, limit = 4) {
    const queue = Array.isArray(state.queue) ? state.queue : [];
    const groups = state.shift
      ? [{ hatch: null, all: queue.slice() }]
      : (state.hatches || []).map(h => ({ hatch: h.number, all: queue.filter(c => c.hatch === h.number).slice().sort((a, b) => a.order - b.order) }));
    return groups.map(group => {
      const upcoming = group.all.filter(c => !c.released);
      const preview = upcoming.slice(0, Math.max(1, limit));
      return { ...group, upcoming, preview, remaining: upcoming.length, more: Math.max(0, upcoming.length - preview.length) };
    });
  }
  function cadence(state) {
    if (!(state.tickMs > 0 && state.releaseEvery > 0)) return '';
    const seconds = Number((state.tickMs * state.releaseEvery / 1000).toFixed(2));
    return `Every ${seconds} s${!state.shift && state.hatches?.length > 1 ? ' · together' : ''}`;
  }
  return { lanes, cadence };
})();
