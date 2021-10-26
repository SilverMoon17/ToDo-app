window.addEventListener('DOMContentLoaded', () => {
    const addTask = document.querySelector('.add__task'),
          taskList = document.querySelector('.task__list'),
          tasks = document.querySelectorAll('.task'),
          taskInput = document.querySelector('.task__input'),
          saveBtn = document.querySelector('.save__btn'),
          cancelBtn = document.querySelector('.cancel__btn');


    addTask.addEventListener('click', () => {
        if (taskInput.classList.contains('hide')) {
            taskInput.classList.remove('hide');
            taskInput.classList.add('show');
        }
    });
    cancelBtn.addEventListener('click', () => {
        if (taskInput.classList.contains('show')) {
            taskInput.classList.remove('show');
            taskInput.classList.add('hide');
        }
    });
});

