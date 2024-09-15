const addtaskFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#task-title').value.trim();
    const description = document.querySelector('#task-description').value.trim();
    const due_date = document.querySelector('#task-due-date').value.trim();
    const priority = document.querySelector('#task-priority').value.trim();
    const status = "Todo";
    
    console.log('Sending priority:', priority);
    
    if (title && description && due_date && priority) {
        const response = await fetch('/api/tasks', {
            method: 'POST',
            body: JSON.stringify({ title, description, due_date, priority, status }),
            headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.ok) {
            const newTask = await response.json();
            console.log('New task:', newTask); // Add this line
            if (newTask.taskData) {
                addNewTaskToDOM(newTask.taskData);
            } else {
                console.error('Task data is missing from the response');
            }
            document.querySelector('#addtasksForm').reset();
        } else {
            alert(response.statusText);
        }
    }
};

function addNewTaskToDOM(task) {
    console.log('Adding new task to DOM:', task); // Debug log
    const todoColumn = document.querySelector('#todo-column .task-list');
    const taskElement = createTaskElement(task);
    todoColumn.appendChild(taskElement);
}

function createTaskElement(task) {
    console.log('Creating task element:', task);
    console.log('Priority value:', task.priority);
    const taskElement = document.createElement('div');
    taskElement.id = `task-${task.id}`;
    taskElement.className = 'task-card p-4 rounded-lg shadow transition-colors duration-300 ease-in-out bg-white';
    taskElement.innerHTML = `
        <div class="flex justify-between items-center mb-2">
            <h3 class="text-lg font-semibold">${task.title || 'Untitled'}</h3>
            <select onchange="updateTaskStatus('${task.id}', this.value)" class="text-sm border rounded">
                <option value="Todo" ${task.status === 'Todo' ? 'selected' : ''}>Todo</option>
                <option value="In Progress" ${task.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                <option value="Completed" ${task.status === 'Completed' ? 'selected' : ''}>Completed</option>
            </select>
        </div>
        <p class="text-sm text-gray-600 mb-3">${task.description || 'No description'}</p>
        <div class="flex justify-between items-center">
            <span class="text-sm font-medium px-2 py-1 rounded ${getPriorityClass(task.priority)}">
                ${getPriorityText(task.priority)} Priority
            </span>
            <button onclick="deleteTask('${task.id}')" class="text-red-500 hover:text-red-700 mx-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
            </button>
            <span class="text-sm text-gray-500">Due: ${formatDate(task.due_date) || 'No due date'}</span>
        </div>
    `;
    return taskElement;
}

function getPriorityClass(priority) {
    console.log('getPriorityClass received:', priority);
    switch (Number(priority)) {
        case 1: return 'bg-red-100 text-red-600';
        case 2: return 'bg-yellow-100 text-yellow-600';
        case 3: return 'bg-green-100 text-green-600';
        default: return 'bg-gray-100 text-gray-600';
    }
}

function getPriorityText(priority) {
    console.log('getPriorityText received:', priority);
    switch (Number(priority)) {
        case 1: return 'High';
        case 2: return 'Medium';
        case 3: return 'Low';
        default: return 'Unknown';
    }
}

function formatDate(dateString) {
    if (!dateString) return 'No due date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

document
    .querySelector('#addtasksForm')
    .addEventListener('submit', addtaskFormHandler);