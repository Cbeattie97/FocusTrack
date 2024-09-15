document.addEventListener("DOMContentLoaded", () => {
    let pomodoroDuration = 1500; // 25 minutes in seconds
    let remainingTime = pomodoroDuration;

    // Retrieve the timer state from localStorage if available
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

            document.getElementById("timerDisplay").textContent = formatTime(remainingTime);

            localStorage.setItem("pomodoroTime", remainingTime);
            localStorage.setItem("pomodoroTimestamp", Date.now());

            if (remainingTime <= 0) {
                clearInterval(timer);
                localStorage.removeItem("pomodoroTime");
                localStorage.removeItem("pomodoroTimestamp");
            }
        }, 1000);
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }

    document.getElementById("timerDisplay").textContent = formatTime(remainingTime);
    document.getElementById("startButton").addEventListener("click", startPomodoro);
});

// TODO fix timer functionality