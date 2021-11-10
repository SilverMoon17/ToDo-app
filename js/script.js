window.addEventListener('DOMContentLoaded', (e) => {
    const addTask = document.querySelector('.add__task'),
          taskList = document.querySelector('.task__list'),
          tasks = document.querySelectorAll('.task'),
          taskInput = document.querySelector('.task__input'),
          saveBtn = document.querySelector('.save__btn'),
          cancelBtn = document.querySelector('.cancel__btn'),
          newTaskInput = document.querySelector('.new__task'),
          icons = document.querySelectorAll('.icon'),
          emptyListTitle = document.querySelector('.empty__list-title');

    let tasksDB = {
        tasks: []
    };

    tasksDB = JSON.parse(localStorage.getItem('tasksDB')) || tasksDB;

    const createTask = (task) => {
        console.log(task);
        tasksDB.tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasksDB));
    };

    const createTaskList = (tasks, parent) => {
        parent.innerHTML = '';

        tasks.forEach(task => {
            const li = document.createElement('li');
            li.classList.add('task', 'not__done');
            li.innerHTML = `
            <img src="img/notDone.svg" class="icon" alt="">
            <p class="task__text">${task}</p>
            `;
            parent.append(li);
        });
    };

    document.addEventListener('keyup', (e) => {
        if (taskInput.classList.contains('show') && e.key == 'Enter' && newTaskInput.value !== '') {
            createTask(newTaskInput.value);
            createTaskList(tasksDB.tasks, taskList);
            newTaskInput.value = '';
        } else if (e.key == 'Escape' && taskInput.classList.contains('show')) {
            taskInput.classList.remove('show');
            taskInput.classList.add('hide');
            newTaskInput.value = '';
        }
    });

    taskList.addEventListener('mouseenter', e => {
        const target = e.target;    
        if (target.classList.contains('not__done')) {
            target.children[0].src = 'img/done.svg';
            target.classList.add('hover');
        }
    },true);

    taskList.addEventListener('click', e => {
        const target = e.target;
        console.log(target);
        if (target && target.classList.contains('icon')) {
            tasksDB.tasks.splice(target.parentNode.dataset.index, 1);
            localStorage.removeItem('tasks');
            createTaskList(tasksDB.tasks, taskList);
        }
    });

    taskList.addEventListener('mouseleave', e => {
        const target = e.target;    
        if (target.classList.contains('hover')) {
            target.children[0].src = 'img/notDone.svg';
            target.classList.remove('hover');
        }
    },true);

    addTask.addEventListener('click', () => {
        if (taskInput.classList.contains('hide')) {
            emptyListTitle.classList.add('hide');
            taskInput.classList.remove('hide');
            taskInput.classList.add('show');
            newTaskInput.focus();
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
    
    console.log(localStorage.getItem('tasks'));

    if (localStorage.getItem('tasks')) {
        emptyListTitle.classList.remove('show');
        emptyListTitle.classList.add('hide');
        tasksDB = JSON.parse(localStorage.getItem('tasks'));
        createTaskList(tasksDB.tasks, taskList);
    } else {
        emptyListTitle.classList.remove('hide');
        emptyListTitle.classList.add('show');
    }
});