const addtaskFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#task-title').value.trim();
    const description  = document.querySelector('#task-description').value.trim();
    const due_date = document.querySelector('#task-due-date').value.trim();
    const priority = document.querySelector('#task-priority').value.trim();
    const status = "Todo";
    
    if (title && description && due_date && priority) {
        const JSONBody = JSON.stringify({ title, description, due_date, priority, status });
        const response = await fetch('/api/tasks', {
            method: 'POST',
            body: JSONBody,
            headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.ok) {
            document.location.replace('tasks');
         } else {
            alert(response.statusText);
         }
    }
  };
  
  document
    .querySelector('#addtasksForm')
    .addEventListener('submit', addtaskFormHandler);