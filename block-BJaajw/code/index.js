(function () {
  let url = `https://api.spaceflightnewsapi.net/v3/articles?_limit=30`;
  let newsEle = document.querySelector('.news');
  let select = document.querySelector('select');
  let all = [];
  let main = document.querySelector('.main');
  let errorElm = document.querySelector('.error-message');

  function error(message = 'Something went wrong!') {
    main.style.display = 'none';
    errorElm.style.display = `block`;
    errorElm.innerText = message;
  }

  function donut(status = false) {
    if (status) {
      newsEle.innerHTML = `<div class = "spinner"><div class="donut"></div></div>`;
    }
  }

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

  function init() {
    donut(true);
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(`Response not ok!`);
        }
      })
      .then((news) => {
        donut();
        all = news;
        getNews(news);
        let allSources = Array.from(new Set(news.map((n) => n.newsSite)));
        selectSource(allSources);
      })
      .catch((e) => {
        error(e);
      });
  }

  select.addEventListener('change', (e) => {
    let source = e.target.value.trim();
    if (source) {
      var selected = all.filter((n) => n.newsSite === source);
    } else {
      selected = all;
    }
    getNews(selected);
  });

  if (navigator.onLine) {
    init();
  } else {
    error(`Check your internet connection🕸️`);
  }
})();
