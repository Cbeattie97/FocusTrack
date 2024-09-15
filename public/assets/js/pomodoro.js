// public/scripts/pomodoro.js

// Get the initial time from the Handlebars template
let pomodoroDuration = 1500; // 25 minutes in seconds
let remainingTime = pomodoroDuration;

// Retrieve the remaining time from localStorage if available
if (localStorage.getItem("pomodoroTime")) {
    const storedTime = localStorage.getItem("pomodoroTime");
    const storedTimestamp = localStorage.getItem("pomodoroTimestamp");

    const elapsed = Math.floor((Date.now() - storedTimestamp) / 1000);
    remainingTime = storedTime - elapsed;

    if (remainingTime <= 0) {
        remainingTime = 0;
    }
}

function startPomodoro() {
    const timer = setInterval(() => {
        remainingTime--;

        // Update timer display
        document.getElementById("timerDisplay").textContent = formatTime(remainingTime);

        // Store remaining time and the timestamp
        localStorage.setItem("pomodoroTime", remainingTime);
        localStorage.setItem("pomodoroTimestamp", Date.now());

        if (remainingTime <= 0) {
            clearInterval(timer);
            localStorage.removeItem("pomodoroTime");
            localStorage.removeItem("pomodoroTimestamp");
        }
    }, 1000);
}

// Utility function to format time as mm:ss
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

// Initialize the timer display
document.getElementById("timerDisplay").textContent = formatTime(remainingTime);

// Start the timer when the button is clicked
document.getElementById("startButton").addEventListener("click", startPomodoro);
