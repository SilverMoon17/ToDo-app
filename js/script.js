window.addEventListener('DOMContentLoaded', (e) => {
    const addTask = document.querySelector('.add__task'),
          taskList = document.querySelector('.task__list'),
          taskListDone = document.querySelector('.task__list-done'),
          completedTasksBlock = document.querySelector('.completed__task-block'),
          tasks = document.querySelectorAll('.task'),
          taskInput = document.querySelector('.task__input'),
          saveBtn = document.querySelector('.save__btn'),
          cancelBtn = document.querySelector('.cancel__btn'),
          newTaskInput = document.querySelector('.new__task'),
          icons = document.querySelectorAll('.icon'),
          emptyListTitle = document.querySelector('.empty__list-title'),
          checkMarkIcon = document.querySelectorAll('.check__mark'),
          trashIcon = document.querySelectorAll('.trash');

    let tasksDB = {
        tasks: [],
        completedTasks: []
    };

    tasksDB = JSON.parse(localStorage.getItem('tasksDB')) || tasksDB;

    const refreshLocalStrg = (object) => {
        localStorage.setItem('tasksDB', JSON.stringify(object));
    };

    const createTask = (task) => {
        tasksDB.tasks.push(task);
        localStorage.setItem('tasksDB', JSON.stringify(tasksDB));
    };

    const createTaskList = (tasks, parent) => {
        parent.innerHTML = '';

        tasks.forEach(task => {
            const li = document.createElement('li');
            li.classList.add('task', 'not__done');
            li.innerHTML = `
            <img src="img/notDone.svg" class="icon" alt="">
            <p class="task__text">${task}</p>
            <img class="trash-icon hide" src="img/trash.svg" alt="">
            <img class="check__mark-icon hide" src="img/checkMark.svg" alt="">
            `;
            parent.append(li);
        });
    };

    const createDoneTaskList = (tasks, parent) => {
        parent.innerHTML = '';

        tasks.forEach(task => {
            const li = document.createElement('li');
            li.classList.add('task', 'done');
            li.innerHTML = `
            <img src="img/done.svg" class="icon" alt="">
            <p class="task__text">${task}</p>
            <img class="trash-icon hide" src="img/trash.svg" alt="delete" style="right:10px;">
            `;
            parent.append(li);
        });

        // parent.innerHTML = '';

        // tasks.forEach(task => {
        //     const li = document.createElement('li');
        //     li.classList.add('task', 'not__done');
        //     li.innerHTML = `
        //     <li class="task">
        //     <img src="img/done.svg" class="icon" alt="">
        //     <p class="task__text">${task}</p>
        //     <img class="trash-icon hide" src="img/trash.svg" alt="">
        // </li>
        //     `;
        //     parent.append(li);
        // });
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

    taskListDone.addEventListener('mouseenter', e => {
        const target = e.target;
        if (target.classList.contains('done')) {
            target.classList.add('hover');
            target.children[2].classList.remove('hide');
            target.children[2].classList.add('show');
        }
    },true);

    taskListDone.addEventListener('mouseleave', e => {
        const target = e.target;
        if (target.classList.contains('done')) {
            target.classList.add('hover');
            target.children[2].classList.remove('show');
            target.children[2].classList.add('hide');
        }
    },true);
    
    taskListDone.addEventListener('click', e => {
        const target = e.target;
        if (target && target.classList.contains('trash-icon')) {
            tasksDB.completedTasks.forEach((task, i) => {
                if (task === target.parentElement.innerText) {
                    tasksDB.completedTasks.splice(i, 1);
                    refreshLocalStrg(tasksDB);
                    createDoneTaskList(tasksDB.completedTasks, taskListDone);       
                }
                if (JSON.parse(localStorage.getItem('tasksDB')).completedTasks.length == 0) {
                    completedTasksBlock.classList.remove('show');
                    completedTasksBlock.classList.add('hide');
                }    
            });
        }
    });

    taskList.addEventListener('mouseenter', e => {
        const target = e.target;
        if (target.classList.contains('not__done')) {
            target.classList.add('hover');
            target.children[2].classList.remove('hide');
            target.children[2].classList.add('show');
            target.children[3].classList.remove('hide');
            target.children[3].classList.add('show');
        }
    },true);

    taskList.addEventListener('mouseleave', e => {
        const target = e.target;    
        if (target.classList.contains('hover')) {
            target.classList.remove('hover');
            target.children[2].classList.remove('show');
            target.children[2].classList.add('hide');
            target.children[3].classList.remove('show');
            target.children[3].classList.add('hide');
        }
    },true);


    taskList.addEventListener('click', e => {
        const target = e.target;
        if (target && target.classList.contains('trash-icon')) {
            tasksDB.tasks.forEach((task, index) => {
                if (task === target.parentElement.innerText) {
                    tasksDB.tasks.splice(index, 1);
                    refreshLocalStrg(tasksDB);
                    createTaskList(tasksDB.tasks, taskList);       
                }
            });
        } else if (target && target.classList.contains('check__mark-icon')) {
            tasksDB.tasks.forEach((task, index) => {
                if (task === target.parentElement.innerText) {
                    tasksDB.tasks.splice(index, 1);
                    tasksDB.completedTasks.push(task);
                    refreshLocalStrg(tasksDB);
                    createTaskList(tasksDB.tasks, taskList);
                    createDoneTaskList(tasksDB.completedTasks, taskListDone);
                    if (JSON.parse(localStorage.getItem('tasksDB')).completedTasks.length != 0) {
                        completedTasksBlock.classList.remove('hide');
                        completedTasksBlock.classList.add('show');
                    }
                }
            });
        }
        if (JSON.parse(localStorage.getItem('tasksDB')).tasks.length === 0 && taskInput.classList.contains('hide')) {
            emptyListTitle.classList.remove('hide');
            emptyListTitle.classList.add('show');
        }
    });

    addTask.addEventListener('click', () => {
        if (taskInput.classList.contains('hide')) {
            emptyListTitle.classList.remove('show');
            emptyListTitle.classList.add('hide');
            taskInput.classList.remove('hide');
            taskInput.classList.add('show');
            newTaskInput.focus();
        }
    });
    saveBtn.addEventListener('click', () => {
        createTask(newTaskInput.value);
        createTaskList(tasksDB.tasks, taskList);
        newTaskInput.value = '';
        newTaskInput.focus();
    });
    cancelBtn.addEventListener('click', () => {
        if (taskInput.classList.contains('show')) {
            taskInput.classList.remove('show');
            taskInput.classList.add('hide');
            if (JSON.parse(localStorage.getItem('tasksDB')).tasks.length === 0) {
                emptyListTitle.classList.remove('hide');
                emptyListTitle.classList.add('show');
            }
        }
    });

    if (JSON.parse(localStorage.getItem('tasksDB')).tasks.length != 0) {
        emptyListTitle.classList.remove('show');
        emptyListTitle.classList.add('hide');
        tasksDB = JSON.parse(localStorage.getItem('tasksDB'));
        createTaskList(tasksDB.tasks, taskList);
    } else {
        emptyListTitle.classList.remove('hide');
        emptyListTitle.classList.add('show');
    }
    if (JSON.parse(localStorage.getItem('tasksDB')).completedTasks.length != 0) {
        completedTasksBlock.classList.remove('hide');
        completedTasksBlock.classList.add('show');
        createDoneTaskList(tasksDB.completedTasks, taskListDone);   
    } else {
        completedTasksBlock.classList.remove('show');
        completedTasksBlock.classList.add('hide');

    }
});