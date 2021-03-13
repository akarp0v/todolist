/*
Create ToDo list
https://www.figma.com/file/rqD44gWgK1eG1b0NUSHxSE/Untitled?node-id=3%3A4
*/

import '../styles/style.css';
import '../styles/normalize.css';

if (process.env.NODE_ENV === 'development') {
  require('../index.html');
}

let inc = 0;

document.body.querySelector('.save_button').addEventListener('click', (event) => {
  let textInput = document.body.querySelector('.text_input');
  let divTasks = document.body.querySelector('.task_list');

  const divElem = document.createElement('div');
  divElem.className = 'task';
  divElem.dataset.id = inc;
  divElem.innerHTML = `
        <div class='task_title'>${textInput.value}</div>
        <button class='delete_button' value=``>x</button>`;
  divTasks.appendChild(divElem);

  inc++;
  textInput.value = '';
});

document.body.querySelector('.task_list').addEventListener('click', (event) => {
  let target = event.target;
  if (target.className.includes('delete_button')) {
    target.parentElement.remove();
  }
});
