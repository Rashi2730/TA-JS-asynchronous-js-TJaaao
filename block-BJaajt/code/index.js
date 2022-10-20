const img = document.querySelector('img');
const username = document.querySelector('h3');
const comp = document.querySelector('p');
const followers = document.querySelector('.followers');
const following = document.querySelector('.following');
const input = document.querySelector('input');
const followerUl = document.querySelector('followerList');
const followingUl = document.querySelector('followingList');

function fetch(url, handler) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onload = () => handler(JSON.parse(xhr.response));
  xhr.send();
}

function displayExtra(url, root) {
  root.innerHTML = '';
  fetch(url, function (followingList) {
    let topFive = followingList.slice(0, 5);

    topFive.forEach((info) => {
      let li = document.createElement('li');
      let imgFollower = document.createElement('img');
      imgFollower.src = info.avatar_url;
      li.append(imgFollower);
      root.append(li);
    });
  });
}

function displayUI(data) {
  img.src = data.avatar_url;
  username.innerText = data.name;
  comp.innerText = `@` + data.login;
  displayExtra(
    `https://api.github.com/users/${data.login}/followers`,
    followerUl
  );
  displayExtra(
    `https://api.github.com/users/${data.login}/following`,
    followingUl
  );
}

function handleChange(event) {
  if (event.keyCode === 13 && input.value) {
    const url = `https://api.github.com/users/`;
    let username = input.value;
    fetch(url + username, displayUI);
    input.value = '';
  }
}

input.addEventListener('keydown', handleChange);

let catsImg = document.querySelector('.cat_img');
let catsBtn = document.querySelector('.cat_btn');

function handleClick() {
  fetch(
    `https://api.thecatapi.com/v1/images/search?limit=1&size=full`,
    function (catInfo) {
      catsImg.src = catInfo[0].url;
    }
  );
}

catsBtn.addEventListener('click', handleClick);
