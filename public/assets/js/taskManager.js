function deleteTask(taskId) {
    if (confirm('Are you sure you want to delete this task?')) {
        fetch(`/api/tasks/${taskId}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const taskElement = document.getElementById(`task-${taskId}`);
                if (taskElement) {
                    taskElement.remove();
                }
            } else {
                alert('Failed to delete task: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while deleting the task');
        });
    }
}

function updateTaskStatus(taskId, newStatus) {
    fetch(`/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const taskElement = document.getElementById(`task-${taskId}`);
            const newColumn = document.getElementById(`${newStatus.toLowerCase().replace(' ', '-')}-column`);
            if (taskElement && newColumn) {
                const currentColumn = taskElement.closest('.task-column');
                if (currentColumn !== newColumn) {
                    newColumn.querySelector('.task-list').appendChild(taskElement);
                }
                if (newStatus === 'Completed') {
                    taskElement.classList.remove('bg-white');
                    taskElement.classList.add('bg-green-100');
                } else {
                    taskElement.classList.remove('bg-green-100');
                    taskElement.classList.add('bg-white');
                }
            }
        } else {
            alert('Failed to update task status: ' + (data.message || 'Unknown error'));
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while updating the task status');
    });
}

let currentEditingTaskId = null;

function showEditTaskModal(taskId) {
    const taskElement = document.getElementById(`task-${taskId}`);
    const title = taskElement.querySelector('h3').textContent;
    const description = taskElement.querySelector('p').textContent;

    document.getElementById('editTaskTitle').value = title;
    document.getElementById('editTaskDescription').value = description;
    document.getElementById('editTaskTag').value = '';

    currentEditingTaskId = taskId;
    document.getElementById('editTaskModal').classList.remove('hidden');
}

function closeEditTaskModal() {
    document.getElementById('editTaskModal').classList.add('hidden');
    currentEditingTaskId = null;
}

function saveTaskEdit() {
    const title = document.getElementById('editTaskTitle').value;
    const description = document.getElementById('editTaskDescription').value;
    const tag = document.getElementById('editTaskTag').value;

    fetch(`/api/tasks/${currentEditingTaskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, tag })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const taskElement = document.getElementById(`task-${currentEditingTaskId}`);
            taskElement.querySelector('h3').textContent = title;
            taskElement.querySelector('p').textContent = description;
            // Add tag to the task card if needed
            closeEditTaskModal();
        } else {
            alert('Failed to update task: ' + (data.message || 'Unknown error'));
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while updating the task');
    });
}

document.getElementById('closeTaskEdit').addEventListener('click', closeEditTaskModal);
document.getElementById('saveTaskEdit').addEventListener('click', saveTaskEdit);
