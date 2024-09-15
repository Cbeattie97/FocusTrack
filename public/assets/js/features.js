// Live Date and Time
function updateDateTime() {
  const now = new Date();
  const options = { 
    month: 'short', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit', 
    hour12: true 
  };
  const dateTimeString = now.toLocaleString('en-US', options).replace(',', '').replace(/(\d+):(\d+):(\d+)/, '$1:$2:$3');
  document.getElementById('live-datetime').textContent = dateTimeString;
}

setInterval(updateDateTime, 1000);

// Pomodoro Timer
let pomodoroInterval;
let pomodoroTime = 25 * 60; // 25 minutes in seconds

function updatePomodoroDisplay() {
  const minutes = Math.floor(pomodoroTime / 60);
  const seconds = pomodoroTime % 60;
  document.querySelector('.flip-clock-minutes').textContent = minutes.toString().padStart(2, '0');
  document.querySelector('.flip-clock-seconds').textContent = seconds.toString().padStart(2, '0');
}

document.getElementById('start-pomodoro').addEventListener('click', function() {
  if (!pomodoroInterval) {
    this.textContent = 'Pause';
    pomodoroInterval = setInterval(() => {
      if (pomodoroTime > 0) {
        pomodoroTime--;
        updatePomodoroDisplay();
      } else {
        clearInterval(pomodoroInterval);
        pomodoroInterval = null;
        this.textContent = 'Start';
        alert('Pomodoro session completed!');
      }
    }, 1000);
  } else {
    clearInterval(pomodoroInterval);
    pomodoroInterval = null;
    this.textContent = 'Start';
  }
});

document.getElementById('reset-pomodoro').addEventListener('click', function() {
  clearInterval(pomodoroInterval);
  pomodoroInterval = null;
  pomodoroTime = 25 * 60;
  updatePomodoroDisplay();
  document.getElementById('start-pomodoro').textContent = 'Start';
});

// Initialize Pomodoro display
updatePomodoroDisplay();

function updateTaskStatus(taskId, newStatus) {
  const taskCard = document.getElementById(`task-${taskId}`);
  if (!taskCard) return;

  taskCard.classList.add('moving');

  setTimeout(() => {
    const newColumn = document.querySelector(`[data-status="${newStatus}"] .task-list`);
    if (newColumn) {
      newColumn.appendChild(taskCard);
    }
    taskCard.classList.remove('moving');
  }, 300);

  // Update the task card appearance
  if (newStatus === 'Completed') {
    taskCard.classList.add('bg-green-100', 'text-green-800');
  } else {
    taskCard.classList.remove('bg-green-100', 'text-green-800');
  }
}
