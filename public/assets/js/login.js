const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const username = document.querySelector('#email-or-username').value.trim();
  const password = document.querySelector('#password').value.trim();

  if (username && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('tasks');
    } else {
      alert(response.statusText);
    }
  }
};

const registerFormHandler = async (event) => {
  event.preventDefault();

  const new_username = document.querySelector('#new-username').value.trim();
  const new_email  = document.querySelector('#new-email').value.trim();
  const new_password = document.querySelector('#new-password').value.trim();

  if (new_username && new_password && new_email) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ new_username, new_email, new_password }),
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
  .querySelector('#login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('#register-form')
  .addEventListener('submit', registerFormHandler);