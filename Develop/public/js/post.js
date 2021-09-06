const createPostFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  // TODO: collect form values and put them in the "post" object
  // const username = document.querySelector('#username-login').value.trim();
  // const password = document.querySelector('#password-login').value.trim();

  let post = {
    title: document.querySelector('#title').value.trim(),
    content: document.querySelector('#content').value.trim(),
  };

  if (post.title && post.content) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/posts', {
      method: 'PUT',
      body: JSON.stringify(post),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/dashboard');
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
  .addEventListener('submit', createPostFormHandler);

