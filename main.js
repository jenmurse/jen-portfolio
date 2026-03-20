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
