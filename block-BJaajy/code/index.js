const One = new Promise((res, rej) => {
  setTimeout(() => res('ONE'), 1000);
});
const Two = new Promise((res, rej) => {
  setTimeout(() => res('TWO'), 2000);
});
const Three = new Promise((res, rej) => {
  setTimeout(() => res('THREE'), 3000);
});
const Four = new Promise((res, rej) => {
  setTimeout(() => res('FOUR'), 4000);
});

const all = Promise.all([One, Two, Three, Four]).then((res) =>
  console.log(res)
);

// https://api.github.com/users;

const names = ['takeo', 'caged', 'roland', 'lucas', 'ricl'];

const usernames = Promise.all(
  names.map((user) =>
    fetch(`https://api.github.com/users/${user}`)
      .then((res) => res.json())
      .then((res) => console.log(res.name, res.followers))
  )
);

///////////////////////////////////

const race = Promise.race([
  ' https://random.dog/woof.json',
  'https://aws.random.cat/meow',
]).then(console.log);

/////////////////////////////////////

const one = new Promise((resolve, reject) =>
  setTimeout(() => resolve('Arya'), 1000)
);
const two = new Promise((resolve, reject) =>
  setTimeout(() => reject(new Error('Whoops!')), 2000)
);
const three = new Promise((resolve, reject) =>
  setTimeout(() => resolve('John'), 3000)
);

const blah = Promise.allSettled([one, two, three]).then(console.log);
