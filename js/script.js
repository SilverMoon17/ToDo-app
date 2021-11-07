window.addEventListener('DOMContentLoaded', (e) => {
    const addTask = document.querySelector('.add__task'),
          taskList = document.querySelector('.task__list'),
          tasks = document.querySelectorAll('.task'),
          taskInput = document.querySelector('.task__input'),
          saveBtn = document.querySelector('.save__btn'),
          cancelBtn = document.querySelector('.cancel__btn'),
          newTaskInput = document.querySelector('.new__task');

    function createTask(task) {
        const li = document.createElement('li');
        li.classList.add('task');
        li.innerHTML = `
        <img src="img/notDone.svg" class="icon" alt="">
        <p class="task__text">${task}</p>
        `;
        taskList.prepend(li);
    }

    document.addEventListener('keyup', (e) => {
        if (taskInput.classList.contains('show') && e.key == 'Enter' && newTaskInput.value !== '') {
            createTask(newTaskInput.value);
            newTaskInput.value = '';
        } else if (e.key == 'Escape' && taskInput.classList.contains('show')) {
            taskInput.classList.remove('show');
            taskInput.classList.add('hide');
            newTaskInput.value = '';
        }
    });


    addTask.addEventListener('click', () => {
        if (taskInput.classList.contains('hide')) {
            taskInput.classList.remove('hide');
            taskInput.classList.add('show');
        }
    });
    saveBtn.addEventListener('click', () => {
        createTask(newTaskInput.value);
        newTaskInput.value = '';
    });
    cancelBtn.addEventListener('click', () => {
        if (taskInput.classList.contains('show')) {
            taskInput.classList.remove('show');
            taskInput.classList.add('hide');
        }
    });
});

