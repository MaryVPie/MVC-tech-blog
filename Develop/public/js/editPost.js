const editPostFormHandler = async (event) => {
  event.preventDefault();

  let post = {
    title: document.querySelector('#title').value.trim(),
    content: document.querySelector('#content').value.trim(),
    id: document.querySelector('#postId').value.trim(),
  };

  if (post.title && post.content) {
    // Send a POST request to the API endpoint
    const response = await fetch(`/api/posts/${post.id}`, {
      method: 'PATCH',
      body: JSON.stringify(post),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/dashboard');
    } else {
      let responseJson = await response.json();
      console.log(responseJson);
      if (responseJson.message != null && responseJson.message.includes('Incorrect')) {
        alert(responseJson.message);
        return;
      }
      alert(response.statusText);
    }
  }
};

const deletePostFormHandler = async () => {
  let id = document.querySelector('#postId').value.trim();
  if (id) {
    let url = `/api/posts/${id}`;
    console.log(url);
    const response = await fetch(url, {
      method: 'DELETE'
    });
    if (response.ok) {

      document.location.replace('/dashboard');
    } else {
      let responseJson = await response.json();
      console.log(responseJson);
      if (responseJson.message != null && responseJson.message.includes('Incorrect')) {
        alert(responseJson.message);
        return;
      }
      alert(response.statusText);
    }

  }

}


document
  .querySelector('form')
  .addEventListener('submit', editPostFormHandler);

document
  .querySelector('#deletePost')
  .addEventListener('click', deletePostFormHandler);
