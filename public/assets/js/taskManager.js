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
