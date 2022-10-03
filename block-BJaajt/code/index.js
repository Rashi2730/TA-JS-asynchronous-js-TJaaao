const img = document.querySelector('img');
const username = document.querySelector('h1');
const comp = document.querySelector('p');
const followers = document.querySelector('.followers');
const following = document.querySelector('.following');
const input = document.querySelector('input');

function displayUI(data) {
  img.src = data.avatar_url;
  username.innerText = data.name;
  comp.innerText = data.company;
  followers.innerText = `Followers: ${data.followers}`;
  following.innerText = `Following: ${data.following}`;
}

function handleChange(event) {
  if (event.keyCode === 13) {
    console.log(event.keyCode);
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://api.github.com/users/${event.target.value}`);
    xhr.onload = function () {
      let userdata = JSON.parse(xhr.response);
      displayUI(userdata);
    };
    xhr.send();
  }
}
input.addEventListener('keyup', handleChange);
