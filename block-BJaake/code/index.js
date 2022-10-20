let url = `https://api.spaceflightnewsapi.net/v3/articles?_limit=30`;
let newsEle = document.querySelector('.news');
let select = document.querySelector('select');
let all = [];

function getNews(news) {
  newsEle.innerHTML = '';
  news.forEach((newsItem) => {
    let li = document.createElement('li');
    let img = document.createElement('img');
    img.src = newsItem.imageUrl;
    let div = document.createElement('div');
    div.classList.add('source');
    let span = document.createElement('span');
    span.innerText = newsItem.newsSite;
    let h3 = document.createElement('h3');
    h3.innerText = newsItem.title;
    let a = document.createElement('a');
    a.href = newsItem.url;
    let button = document.createElement('button');
    button.innerText = 'Read More';
    a.append(button);
    div.append(span, h3, a);
    li.append(img, div);
    newsEle.append(li);
  });
}

function selectSource(sources) {
  sources.forEach((src) => {
    let option = document.createElement('option');
    option.innerText = src;
    option.value = src;
    select.append(option);
  });
}
fetch(url)
  .then((res) => res.json())
  .then((news) => {
    all = news;
    getNews(news);
    let allSources = Array.from(new Set(news.map((n) => n.newsSite)));
    selectSource(allSources);
  });

select.addEventListener('change', (e) => {
  let source = e.target.value.trim();
  let selected;
  if (source) {
    selected = all.filter((n) => n.newsSite === source);
  } else {
    selected = all;
  }
  getNews(selected);
});
