(function () {
  let root = document.querySelector(`.root`);
  let characterRoot = document.querySelector(`.character-root`);
  let close = document.querySelector(`.close-btn`);
  let url = 'https://www.anapioficeandfire.com/api/books';

  function donut(status = false) {
    let loader = document.querySelector(`.loader-div`);
    if (status) {
      loader.classList.add(`loader`);
    } else {
      loader.classList.remove(`loader`);
    }
  }

  function createUI(rootEle, data) {
    data.forEach((e) => {
      let article = document.createElement('article');

      let h2 = document.createElement('h2');
      h2.innerText = e.name;

      let h3 = document.createElement('h3');
      h3.innerText = e.authors;

      let a = document.createElement('a');
      a.classList.add(`btn`);
      a.innerText = `Show Characters : (${e.characters.length})`;
      a.addEventListener(`click`, () => {
        showCharacter(e.characters);
      });

      article.append(h2, h3, a);
      rootEle.append(article);
    });
  }

  function init() {
    donut(true);
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((d) => {
        if (Array.isArray(d)) {
          return createUI(root, d);
        }
      })
      .finally(donut);
  }

  function showCharacter(characterData) {
    donut(true);
    charVisible(true);
    Promise.all(
      characterData.map((character) =>
        fetch(character).then((res) => res.json())
      )
    )
      .then((d) => {
        d.forEach((char) => {
          let p = document.createElement('p');
          p.innerText = `Name : ${char.name}
         Aliases : ${char.aliases}
          Gender : ${char.gender}
           TvSeries : ${char.tvSeries}`;
          characterRoot.append(p);
        });
      })
      .finally(donut);
  }

  function charVisible(isVis = false) {
    let characterSection = document.querySelector('.character-sec');
    let header = document.querySelector('header');
    if (isVis) {
      characterSection.classList.remove('hide');
      header.classList.add('hide');
    } else {
      characterSection.classList.add('hide');
    }
  }

  close.addEventListener('click', () => {
    charVisible();
  });

  charVisible();
  init();
})();
