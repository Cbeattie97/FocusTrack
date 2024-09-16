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
            console.log('New task:', newTask);
            addNewTaskToDOM(newTask);
            document.querySelector('#addtasksForm').reset();
        } else {
            alert(response.statusText);
        }
    }
};

function addNewTaskToDOM(task) {
    console.log('Adding new task to DOM:', task);
    const todoColumn = document.querySelector('#todo-column .task-list');
    const taskElement = createTaskElement(task);
    todoColumn.appendChild(taskElement);
}

function createTaskElement(task) {
    console.log('Creating task element:', task);
    console.log('Priority value:', task.priority);
    const taskElement = document.createElement('div');
    taskElement.id = `task-${task.id}`;
    taskElement.className = 'task-card p-3 rounded-lg shadow transition-colors duration-300 ease-in-out bg-white';
    taskElement.innerHTML = `
        <h3 class="text-md font-semibold mb-1">${task.title || 'Untitled'}</h3>
        <p class="text-xs text-gray-600 mb-2">${task.description || 'No description'}</p>
        <div class="flex justify-between items-center text-xs">
            <select onchange="updateTaskStatus('${task.id}', this.value)" class="text-xs border rounded px-1 py-0.5">
                <option value="Todo" ${task.status === 'Todo' ? 'selected' : ''}>Todo</option>
                <option value="In Progress" ${task.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                <option value="Completed" ${task.status === 'Completed' ? 'selected' : ''}>Completed</option>
            </select>
            <span class="font-medium px-2 py-0.5 rounded ${getPriorityClass(task.priority)}">
                ${getPriorityText(task.priority)}
            </span>
        </div>
        <div class="flex justify-between items-center mt-2 text-xs">
            <button onclick="showEditTaskModal('${task.id}')" class="text-blue-500 hover:text-blue-700">
                Edit
            </button>
            <button onclick="deleteTask('${task.id}')" class="text-red-500 hover:text-red-700">
                Delete
            </button>
            <span class="text-gray-500">Due: ${formatDate(task.due_date) || 'No due date'}</span>
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