// ── AFTER THE FADE ──────────────────────────────────
// Pages fade into each other (styles.css). Heavy starts, like compiling shaders, wait until the new page has faded
// in, so the fade plays smoothly instead of stalling. Without a fade they start on the next frame
window.afterFade = (() => {
  let go; const ready = new Promise(r => { go = r; });
  addEventListener('pagereveal', e => { e.viewTransition ? e.viewTransition.finished.then(go, go) : go(); }, { once: true });
  setTimeout(go, 1000);   // in case the reveal came and went before this script ran
  return fn => ready.then(() => setTimeout(fn));
})();

// ── CURSOR ──────────────────────────────────────────
const cur = document.getElementById('cursor');

document.addEventListener('mousemove', e => {
  cur.style.left = e.clientX + 'px';
  cur.style.top  = e.clientY + 'px';
});

document.querySelectorAll('a[href], button, .vid-wrap').forEach(el => {
  el.addEventListener('mouseenter', () => cur.className = 'on-link');
  el.addEventListener('mouseleave', () => cur.className = '');
});

// ── VIDEO CONTROLS ──────────────────────────────────
const vid  = document.getElementById('vid');
const icon = document.getElementById('vid-icon');
const btnPause   = document.getElementById('btn-pause');
const btnRestart = document.getElementById('btn-restart');
let iconTimer;

function flash(label) {
  icon.textContent = label;
  clearTimeout(iconTimer);
  icon.classList.add('flash');
  iconTimer = setTimeout(() => icon.classList.remove('flash'), 900);
}

if (vid) {
  vid.addEventListener('click', () => {
    if (vid.paused) { vid.play(); flash('play'); btnPause.textContent = 'pause'; }
    else            { vid.pause(); flash('pause'); btnPause.textContent = 'play'; }
  });

  btnPause.addEventListener('click', e => {
    e.stopPropagation();
    if (vid.paused) { vid.play(); flash('play'); btnPause.textContent = 'pause'; }
    else            { vid.pause(); flash('pause'); btnPause.textContent = 'play'; }
  });

  btnRestart.addEventListener('click', e => {
    e.stopPropagation();
    vid.currentTime = 0;
    vid.play();
    btnPause.textContent = 'pause';
    flash('restart');
  });
}
