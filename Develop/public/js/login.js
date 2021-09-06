const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (username && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/');
    } else {
      let responseJson = await response.json();
      console.log(responseJson);
      if (responseJson.message != null && responseJson.message.includes('Incorrect username or password')) {
        alert(responseJson.message);
        return;
      }
      alert(response.statusText);
    }
  }
};


document
  .querySelector('form')
  .addEventListener('submit', loginFormHandler);

