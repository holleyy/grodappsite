'use strict';

const places = {
  office:    { crop: [6, 444, 520], level: '1-4', outside: 'open riverside sorting office with a green roof' },
  depot:     { crop: [80, 115, 640], level: '4-15', outside: 'red brick depot on the canal quay' },
  train:     { crop: [480, 315, 968], level: '5-11', outside: 'green mail train crossing the viaduct, with its line curving across the meadow behind Lantern Loft' },
  cityhall:  { crop: [775, 128, 369], level: '6-15', outside: 'clock above the columned entrance to the civic hall' },
  parcel:    { crop: [939, 353, 426], level: '7-15', outside: 'parcel warehouse with crates at the loading bays' },
  christmas: { crop: [1158, 127, 378], level: '8-15', outside: 'illuminated station among snow-covered firs' },
  boxroom:   { crop: [1040, 567, 477], date: '2026-11-06', outside: 'lantern glowing in the glass roof of a brick tower' }
};
const picker = document.querySelector('#landmark');
const terrain = document.querySelector('#terrain');
const still = document.querySelector('#still');
const pair = document.querySelector('#pair');
const roomFrame = document.querySelector('#room-frame');
const watch = document.querySelector('#watch');
const status = document.querySelector('#status');
const roomCaption = document.querySelector('#room-caption');
const modeButtons = [...document.querySelectorAll('[data-view][type="button"]')];
let frame = null;
let timer;
let room = 'office';
let view = 'both';

function updateAddress() {
  const url = new URL(location.href);
  url.searchParams.set('room', room);
  if (view === 'both') url.searchParams.delete('view');
  else url.searchParams.set('view', view);
  history.replaceState(null, '', url);
}
function stopLive() {
  clearTimeout(timer);
  frame?.remove();
  frame = null;
  roomCaption.textContent = 'In the game';
  watch.textContent = 'Watch room live';
  watch.setAttribute('aria-pressed', 'false');
  status.textContent = '';
}
function scaleFrame() {
  if (frame) frame.style.transform = 'scale(' + roomFrame.clientWidth / 960 + ')';
}
function setView(next) {
  view = modeButtons.some(button => button.dataset.view === next) ? next : 'both';
  if (view === 'map') stopLive();
  pair.dataset.view = view;
  modeButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.view === view)));
  scaleFrame();
}
function selectRoom(key) {
  room = Object.hasOwn(places, key) ? key : 'office';
  picker.value = room;
  const name = picker.selectedOptions[0].textContent;
  const place = places[room];
  const [x, y, width] = place.crop;
  terrain.style.width = (1536 / width * 100) + '%';
  terrain.style.left = (-x / width * 100) + '%';
  terrain.style.top = (-y / (width * 2 / 3) * 100) + '%';
  terrain.alt = 'Valley map detail showing the ' + place.outside;
  document.querySelector('#map-name').textContent = name;
  document.querySelector('#level').textContent = place.level ? 'Delivery ' + place.level : 'Daily · 6 Nov 2026';
  still.alt = 'Inside ' + name + ', with the sorting floor ready for play';
  still.src = '../cats-by-post-seven-room-archive/after-' + room + '.webp';
}
function failed(current) {
  if (current !== frame) return;
  stopLive();
  status.textContent = 'The live room could not open. The room photograph is shown.';
  watch.textContent = 'Retry live room';
}
function startLive() {
  if (view === 'map') {
    setView('game');
    updateAddress();
  }
  const current = document.createElement('iframe');
  const key = room;
  const place = places[key];
  frame = current;
  current.title = picker.selectedOptions[0].textContent + ' · live room camera';
  current.setAttribute('aria-hidden', 'true');
  current.inert = true;
  current.tabIndex = -1;
  watch.textContent = 'Show still';
  watch.setAttribute('aria-pressed', 'true');
  status.textContent = 'Opening the room…';
  current.addEventListener('error', () => failed(current), { once: true });
  current.addEventListener('load', async () => {
    if (current !== frame) return;
    try {
      const game = current.contentWindow;
      const bridge = game.GameBridge;
      await bridge.ready;
      if (current !== frame) return;
      // The gallery uses the same room camera as the seven-room archive. Direct
      // scene selection leaves the normal playable map's progression gates intact.
      if (place.level) {
        const level = bridge.levels.find(entry => entry.id === place.level);
        if (!level || level.room !== key) throw Error('Unknown delivery');
        game.gLoad(level.i);
        game.cpCancel();
      } else if (!await bridge.load('daily', place.date)) throw Error('Daily unavailable');
      if (current !== frame) return;
      await game.FidelityRooms.ensure(key);
      if (current !== frame) return;
      const cameraStyle = current.contentDocument.createElement('style');
      cameraStyle.textContent = 'body > :not(#screen){display:none!important}';
      current.contentDocument.head.append(cameraStyle);
      bridge.layout({ top: 12, bottom: 12, left: 12, right: 12 });
      bridge.camera('room');
      game.pReset();
      game.__so.seek(600);
      if (game.FidelityRooms.state().room !== key || !bridge.drawFirstFrame()) throw Error('Room frame unavailable');
      clearTimeout(timer);
      current.classList.add('ready');
      roomCaption.textContent = 'In the game · live';
      status.textContent = '';
    } catch { failed(current); }
  }, { once: true });
  current.src = 'game/engine.html?roomCamera=1&v=valley-preview-e12696132df8';
  roomFrame.append(current);
  scaleFrame();
  timer = setTimeout(() => failed(current), 90000);
}
picker.addEventListener('change', () => {
  const wasLive = Boolean(frame);
  stopLive();
  selectRoom(picker.value);
  updateAddress();
  if (wasLive) startLive();
});
modeButtons.forEach(button => button.addEventListener('click', () => {
  setView(button.dataset.view);
  updateAddress();
}));
watch.addEventListener('click', () => frame ? stopLive() : startLive());
new ResizeObserver(scaleFrame).observe(roomFrame);
const params = new URL(location.href).searchParams;
selectRoom(params.get('room'));
setView(params.get('view'));
watch.hidden = false;
