/* ---------- 1. NAV ---------- */
function openNav()  { document.getElementById("sidenav").style.width = "250px"; }
function closeNav() { document.getElementById("sidenav").style.width = "0";  }

/* ---------- 2. DOM refs ---------- */
const timer = document.querySelector(".timer");
const minus = document.querySelector(".minus");
const plus  = document.querySelector(".plus");
const timeSession = document.querySelector(".session .time");
let   timeFocus   = timeSession;

/* ---------- 3. Globals ---------- */
let timeInterval = null;   // use null, not ""
let timeRemaining;

/* ---------- 4.  CLICK-HANDLERS ---------- */
function addClickEvents() {
  minus.addEventListener("click", () => { if (!timeInterval) { changeTime(-1); } });
  plus .addEventListener("click", () => { if (!timeInterval) { changeTime(+1); } });
  timer.addEventListener("click", toggleTimer);
}

function changeTime(delta) {
  const newVal = Math.max(1, parseInt(timeFocus.textContent) + delta);
  timeFocus.textContent = newVal;
  timer.textContent     = `${newVal}:00`;
}

/* ---------- 5.  USER-ACTIVITY LISTENERS ---------- */
function resetOnInteraction() {
  if (timeInterval) {               // only if timer is actively running
    clearInterval(timeInterval);
    initializeCountdown();
    updateDisplay();                // <-- repaint immediately
    timeInterval = setInterval(updateDisplay, 1000);
  }
}

function addUserActivityListeners() {
  document.addEventListener("keydown",   resetOnInteraction);
  document.addEventListener("pointerdown", resetOnInteraction); // fires once per click/tap
  /*  If you *really* want mouse-move, throttle it: 
      document.addEventListener("mousemove", _.throttle(resetOnInteraction, 500));
      (Needs lodash or your own throttle util)
  */
}

/* ---------- 6.  TIMER CORE ---------- */
function initializeCountdown() {
  const mins = parseInt(timeFocus.textContent);
  timeRemaining = { total: mins * 60 * 1000, minutes: mins, seconds: 0 };
}

function updateDisplay() {
  timeRemaining.total -= 1000;
  if (timeRemaining.total < 0) { toggleTimer(); return; }

  timeRemaining.minutes = Math.floor(timeRemaining.total / 60000);
  timeRemaining.seconds = Math.floor((timeRemaining.total % 60000) / 1000);
  const s = String(timeRemaining.seconds).padStart(2, "0");
  timer.textContent = `${timeRemaining.minutes}:${s}`;
}

function toggleTimer() {
  if (!timeRemaining) initializeCountdown();
  if (timeInterval) {
    clearInterval(timeInterval);
    timeInterval = null;
  } else {
    timeInterval = setInterval(updateDisplay, 1000);
  }
}

/* ---------- 7.  DOM READY ---------- */
document.addEventListener("DOMContentLoaded", () => {
  addClickEvents();
  addUserActivityListeners();
});
