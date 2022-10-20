const url = `https://api.unsplash.com/photos/?client_id=lYRsDbRT5SddIdEZXyTrZ4Facb-LFufVyXBWZjVNZos
`;

const getSearchUrl = (query) =>
  `https://api.unsplash.com/search/photos?query=${query}&client_id=lYRsDbRT5SddIdEZXyTrZ4Facb-LFufVyXBWZjVNZos`;
const root = document.querySelector('.images');
const searchElm = document.querySelector('input');

function fetch(url, handler) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onload = () => handler(JSON.parse(xhr.response));
  xhr.send();
}

function displayImages(images) {
  root.innerHTML = '';
  images.forEach((image) => {
    let li = document.createElement('li');
    let img = document.createElement('img');
    img.src = image.urls.thumb;
    li.append(img);
    root.append(li);
  });
}
fetch(url, displayImages);

function handleSearch(event) {
  if (event.keyCode == 13 && searchElm.value) {
    fetch(getSearchUrl(searchElm.value), (searchRes) => {
      displayImages(searchRes.results);
    });
    searchElm.value = '';
  }
}

searchElm.addEventListener('keyup', handleSearch);
