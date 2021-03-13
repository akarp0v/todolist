/*
Create ToDo list
https://www.figma.com/file/rqD44gWgK1eG1b0NUSHxSE/Untitled?node-id=3%3A4
*/

import '../styles/style.css';
import '../styles/normalize.css';

if (process.env.NODE_ENV === 'development') {
  require('../index.html');
}

document.body.querySelector('.save_button').addEventListener('click', (event) => {
  let textInput = document.body.querySelector('.text_input');
  let divTasks = document.body.querySelector('.task_list');

  const divElem = document.createElement('div');
  divElem.className = 'task';
  divElem.innerHTML = `
    <div class='task_title'>${textInput.value}</div>
    <button class='delete_button'>x</button>
  `;
  divTasks.appendChild(divElem);

  textInput.value = '';
});

document.body.querySelector('.task_list').addEventListener('click', function (event) {
  let target = event.target;
  if (target.className.includes('delete_button')) {
    target.parentElement.remove();
  }
});

document.body.querySelector('.task_list').addEventListener('dblclick', function (event) {
  let target = event.target;
  
  if (target.className.includes('task_title')) {
    target.innerHTML = `<textarea class="edit_text" id="newcont" rows="1">${target.textContent}</textarea>`;
    target.focus();
  }
});

document.body.querySelector('.task_list').addEventListener('click', function (event) {
  let target = event.target;
  let textAreaElem = document.body.querySelector('#newcont');

  if (!(target.className.includes('edit_text')) && textAreaElem !== null) {
    textAreaElem.parentElement.textContent = textAreaElem.value;
    textAreaElem.remove();
  }
});