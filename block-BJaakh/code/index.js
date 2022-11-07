let box = document.querySelector('.container');
let root = document.querySelector('.todo-list');
let todoInput = document.querySelector('input[type=text]');

let url = 'https://basic-todo-api.vercel.app/api/todo';

function getData() {
  fetch(url)
    .then((res) => res.json())
    .then((res) => {
      createUI(res.todos);
    });
}

function createUI(todos) {
  root.innerHTML = '';
  todos.forEach((todo) => {
    let li = document.createElement('li');
    li.classList.add('.todo-item', 'flex');
    let checkbox = document.createElement('input');
    checkbox.classList.add('checkbox');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.checked = todo.isCompleted;
    checkbox.setAttribute('data-id', todo._id);
    checkbox.addEventListener('click', () =>
      toggle(todo._id, todo.isCompleted)
    );
    let p = document.createElement('p');
    p.innerText = todo.title;
    p.addEventListener('dblclick', (event) => putTodo(event, todo._id));
    let span = document.createElement('span');
    span.innerText = '🗑️';
    span.setAttribute('data-id', todo._id);
    span.addEventListener('click', () => deleteTodo(todo._id));
    li.append(checkbox, p, span);
    root.append(li);
  });
}

function postTodo(title) {
  let data = {
    todo: {
      title: title,
    },
  };
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(() => {
    getData();
  });
}

todoInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    postTodo(event.target.value);
    event.target.value = '';
  }
});

function deleteTodo(id) {
  fetch(url + `/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(() => {
    getData();
  });
}

function putTodo(event, id) {
  let editInput = document.createElement('input');
  editInput.value = event.target.innerText;
  p = event.target;
  p.parentElement.replaceChild(editInput, p);
  editInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter' && event.target.value.trim()) {
      let data = {
        todo: {
          title: event.target.value,
        },
      };
      fetch(url + `/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then(() => {
        getData();
      });
    }
  });
}

function toggle(id, status) {
  let data = {
    todo: {
      isCompleted: !status,
    },
  };
  fetch(url + `/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(() => {
    getData();
  });
}
getData();
