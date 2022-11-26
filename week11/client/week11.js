import Auth from './auth.js';
import { makeRequest } from './authHelpers.js';

const auth = new Auth();

const loginButton = document.getElementById("loginButton");
loginButton.addEventListener("click", e => {
    auth.login(getPosts);
})

async function getPosts() {
  try {
    const data = await makeRequest('posts', 'GET', null, auth.token);

    document.getElementById('content').classList.remove('hidden');
    var ul = document.getElementById('list');
    ul.innerHTML = '';
    for (var i = 0; i < data.length; i++) {
      var li = document.createElement('li');
      li.appendChild(document.createTextNode(data[i].title));
      ul.appendChild(li);
    }
  } catch (error) {
      console.log(error);
  }
}

document.getElementById('createSubmit').addEventListener('click', () => {
  createPost();
});
async function createPost() {
  const form = document.forms.postForm;
  if (form.title.validity.valid && form.content.validity.valid) {
    const data = {
      title: form.title.value,
      content: form.content.value
    };
    try {
      const res = await makeRequest('posts', 'POST', data, auth.token);
      console.log('Post create:', data);
      form.title.value = '';
      form.content.value = '';
      getPosts();
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log('error');
  }
}