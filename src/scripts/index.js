/*
Create ToDo list
https://www.figma.com/file/rqD44gWgK1eG1b0NUSHxSE/Untitled?node-id=3%3A4
*/

import '../styles/normalize.css';
import '../styles/style.css';

if (process.env.NODE_ENV === 'development') {
  require('../index.html');
}

function saveToServer(toSave) {
  const url = 'http://localhost:3000/item';
  const request = fetch(url, {
    method: 'PUT',
    // headers: {  
    //   "Content-type": "application/json"
    // },  
    body: { title: toSave }
  });

  request.then(res => {
    return res.json();
  }, res => {
    throw `Ошибка ${res.status}`;
  })
    .then(res => console.log(res));
    
  // let xhr = new XMLHttpRequest(); // new HttpRequest instance 
  // xhr.open("PUT", 'http://localhost:3000/item');
  // xhr.setRequestHeader("Content-Type", "application/json");
  // xhr.send(JSON.stringify({
  //   title: toSave
  // }));
  // xhr.onload = function () {
  //   if (xhr.status != 200) {
  //     alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
  //   } else {
  //     let response = JSON.parse(xhr.response);
  //     console.log(response);
  //   }
  // };
}

function removeFromServer(toRemove) {
  let xhr = new XMLHttpRequest(); // new HttpRequest instance 
  xhr.open("DELETE", 'http://localhost:3000/item');
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify({
    title: toRemove
  }));
  xhr.onload = function () {
    if (xhr.status != 200) {
      alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
    } else {
      let response = JSON.parse(xhr.response);
      console.log(response);
    }
  };
}

function getFromServer(callBack) {
  const url = 'http://localhost:3000/item';
  fetch(url)
    .then(response => response.json())
    .then(result => callBack(result));

  // let xhr = new XMLHttpRequest(); // new HttpRequest instance 
  // xhr.open("GET", url);
  // xhr.setRequestHeader("Content-Type", "application/json");
  // xhr.send();
  // xhr.onload = function () {
  //   if (xhr.status != 200) {
  //     alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
  //   } else {
  //     let response = JSON.parse(xhr.response);
  //     callBack(response);
  //   }
  // };
  // let response = await fetch(url);
  // let result = await response.json();
  // callBack(result);
  // console.log(result);
}

function getItemByText(text) {
  let newTask = document.createElement('div');
  newTask.className = 'task';
  newTask.innerHTML = `
    <div class='task_title'>${text}
      <button class='delete_button'>x</button>
    </div>
  `;

  return newTask;
}

document.body.querySelector('.save_button').addEventListener('click', function (event) {
  let taskElement = document.body.querySelector('.text_input');
  let tasksList = document.body.querySelector('.task_list');

  let newTask = document.createElement('div');
  newTask.className = 'task';
  newTask.innerHTML = `
    <div class='task_title'>${taskElement.value}
      <button class='delete_button'>x</button>
    </div>
  `;
  tasksList.appendChild(newTask);
  saveToServer(taskElement.value);
  taskElement.value = '';
});

document.body.querySelector('.task_list').addEventListener('click', function (event) {
  let target = event.target;
  if (target.className.includes('delete_button')) {
    let textContent = target.parentElement.innerText;
    let endOfLine = textContent.indexOf('\n');

    removeFromServer(textContent.slice(0, endOfLine));
    target.parentElement.parentElement.remove();
  }
});

document.body.querySelector('.task_list').addEventListener('dblclick', function (event) {
  let target = event.target;

  if (target.className.includes('task_title')) {
    target.innerHTML = `<textarea class="edit_text" id="newcont" rows="1">${target.textContent}</textarea>`;
    target.focus();
  }
});

document.body.querySelector('.task_list').addEventListener('focusout', function (event) {

  if (event.target.className.includes('edit_text')) {
    let textAreaElem = document.body.querySelector('#newcont');
    textAreaElem.parentElement.textContent = textAreaElem.value;
    textAreaElem.remove();
  }
});

function addNewElementToTaskList(text) {
  let newItem = getItemByText(text);
  document.querySelector('.task_list').appendChild(newItem);
}

function addItemsFromServer(itemList) { /// itemList = ['esdfdeswf', 'wefewfewf']
  itemList.forEach(function (element) {
    addNewElementToTaskList(element);
  });
}

function main() {
  getFromServer(addItemsFromServer);
}

main();