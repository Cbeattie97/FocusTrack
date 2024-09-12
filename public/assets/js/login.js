const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const username = document.querySelector('#email-or-username').value.trim();
  const password = document.querySelector('#password').value.trim();

  if (username && password) {
    // Send a POST request to the API endpoint
    const JSONBody = JSON.stringify({username, password });
    console.log(JSONBody);
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSONBody,
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(response);

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

  const username = document.querySelector('#new-username').value.trim();
  const email  = document.querySelector('#new-email').value.trim();
  const password = document.querySelector('#new-password').value.trim();

  if (username && password && email) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
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
