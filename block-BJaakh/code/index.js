// ## Callback to Promise

// Below you will final a collection of functions and example using callback pattern. Convert the function using callback pattern to use promise. Also convert the example.

// 1.

// ```js
// function timeout(cb,ms) {
//   setTimeout(cb, ms);
// }

// timeout(() => console.log('Hey'), 1000);

// // Using Promise
// ```
const timeout = (cb, ms) => {
  return new Promise((res, rej) => {
    res(setTimeout(cb, ms));
  });
};
timeout(() => console.log('Hello WOrld!'), 2000);

// 2.

// ```js
const logMsg = (msg) => {
  return new Promise((res, rej) => {
    res(
      setTimeout(() => {
        console.log(msg);
      }, 2000)
    );
  });
};

logMsg(`Hello World!`);
logMsg(`Hey JS!`);

// // Using Promise
// ```

// 3.

// ```js

const getData = (url, onSuccess, onError) => {
  //   let xhr = new XMLHttpRequest();
  //   xhr.open(url);
  //   xhr.onload = () => onSuccess(xhr.response);
  //   xhr.onerror = () => onError(xhr.response);
  //   xhr.send();
  return fetch(url).then(onSuccess).catch(onError);
};

getData(
  'https://api.github.com/users/getify',
  (res) => console.log(res),
  (error) => console.error(error)
);

// // Using Promise
// ```

// 4.

// ```js
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error for ${src}`));

  document.head.append(script);
}

loadScript(
  'https://cdnjs.cloudflare.com/ajax/libs/particlesjs/2.2.3/particles.min.js',
  (res) => console.log(res)
);

// // Using Promise
// ```

// 5.

// ```js
// function getName(firstName, callback) {
//   setTimeout(() => {
//     if (!firstName) return callback(new Error('no first name passed in!'));

//     const fullName = `${firstName} Doe`;

//     return callback(fullName);
//   }, 2000);
// }

// getName('John', console.log);
// getName(null, console.log);

// // Using Promise
// ```
const getName = (firstName) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!firstName) reject(new Error('no first name passed in!'));

      const fullName = `${firstName} Doe`;

      resolve(fullName);
    }, 2000);
  });
};

getName('John').then(console.log);

// 6.

// ```js
// function getCurrentTime(onSuccess, onFail) {
//   return setTimeout(function () {
//     if (didSucceed) {
//       var currentTime = new Date();
//       onSuccess(currentTime);
//     } else {
//       onFail('Unknown error');
//     }
//   }, 2000);
// }

// // Using Promise
// ```
const getCurrentTime = (onSuccess, onFail) => {
  var didSucceed = Math.random() >= 0.5;

  return new Promise((res, rej) => {
    setTimeout(function () {
      if (didSucceed) {
        var currentTime = new Date();
        res(onSuccess(currentTime));
      } else {
        rej(onFail('Unknown Error'));
      }
    }, 2000);
  });
};

getCurrentTime(
  function (currentTime) {
    console.log('The current time is: ' + currentTime);
  },
  function (error) {
    console.log('There was an error fetching the time');
  }
);
