function openNav() {
    document.getElementById("sidenav").style.width = "250px";
  }
  
  function closeNav() {
    document.getElementById("sidenav").style.width = "0";
  }



/* ---------------------------- Timer ---------------------------*/

/* DOM objects */
let timer = document.querySelector('.timer');
let minus = document.querySelector('.minus');
let plus = document.querySelector('.plus');

let timeSession = document.querySelector('.session .time');
let timeFocus = timeSession;

/* Timer operations */
// Global Variables
var timeInterval = '';
var timeRemaining = '';

//Functions
function addClickEvents() {
    eventsTimeChange();
    eventsTimer();
}

/* eventsTimeChange: Adds click events to plus and minus buttons to adjust the break and session lengths.
 */
function eventsTimeChange() {
    minus.addEventListener('click', function () {
        if (timeInterval) {
            return;
        }
        subtractTime(this);
        initializeCountdown();
    });

    plus.addEventListener('click', function () {
        if (timeInterval) {
            return;
        }
        addTime(this);
        initializeCountdown();
    });
}

/* subtractTime:
Input ~ a minus element
Reduces the associated timer length element by one minute. If timer changed is the current timer, changes timer value to match.
*/
function subtractTime(element) {
    let text = parseInt(element.nextElementSibling.innerHTML);
    text = text - 1;
    element.nextElementSibling.innerHTML = text > 0 ? text : '1';
    timer.innerHTML = timeFocus.innerHTML + ':00';
}

/* addTime:
Input ~ a plus element
Increases the associated timer length element by one minute. If timer changed is the current timer, changes timer value to match.
*/
function addTime(element) {
    let text = parseInt(element.previousElementSibling.innerHTML);
    text = text + 1;
    element.previousElementSibling.innerHTML = text;
    timer.innerHTML = timeFocus.innerHTML + ':00';
}

/* eventsTimer: Adds click events to the timer for start/pause functionality.
 */
function eventsTimer() {
    timer.addEventListener('click', function () {
        toggleTimer();
    });
}

/* toggleTimer: Switches the timer state between play/pause states.
 */
function toggleTimer() {
    if (!timeRemaining) {
        initializeCountdown();
    }
    if (timeInterval) {
        clearInterval(timeInterval);
        timeInterval = '';
    } else {
        timeInterval = setInterval(updateDisplay, 1000);
    }
}

/* timerCountdown: Countdown timer functionality.
 */
function initializeCountdown() {
    timeRemaining = {
        total: parseInt(timeFocus.innerHTML) * 60 * 1000,
        minutes: parseInt(timeFocus.innerHTML),
        seconds: 0,
    };
}

/* updateDisplay: Updates the value of the timer to reflect timeRemaining.
*/
function updateDisplay() {
    var t = timeRemaining.total - 1000;

    if (t < 1000) {
        toggleTimer();
        setTimeout(timerSwitch, 100);
        return;
    }

    timeRemaining.total = t;
    timeRemaining.minutes = Math.floor((t / 1000 / 60) % 60);
    timeRemaining.seconds = Math.floor((t / 1000) % 60);
    var seconds = ('0' + timeRemaining.seconds).slice(-2);
    timer.innerHTML = timeRemaining.minutes + ":" + seconds;
}

/* timerSwitch: Toggles timer between break and session states.
 */
function timerSwitch() {
    timer.classList.toggle('onBreak');
    timeFocus = timeFocus == timeSession ? timeBreak : timeSession;
    timer.innerHTML = timeFocus.innerHTML + ':00';
    initializeCountdown();
    toggleTimer();
}

// Add the click events when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    addClickEvents();
});