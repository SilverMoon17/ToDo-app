window.addEventListener('DOMContentLoaded', (e) => {
    const addTask = document.querySelector('.add__task'),
          taskList = document.querySelector('.task__list'),
          tasks = document.querySelectorAll('.task'),
          taskInput = document.querySelector('.task__input'),
          saveBtn = document.querySelector('.save__btn'),
          cancelBtn = document.querySelector('.cancel__btn'),
          newTaskInput = document.querySelector('.new__task'),
<<<<<<< HEAD
          icons = document.querySelectorAll('.icon');
          

          
    function createTask(task) {
        const li = document.createElement('li');
        li.classList.add('task', 'not__done');
        li.innerHTML = `
        <img src="img/notDone.svg" class="icon" alt="">
        <p class="task__text">${task}</p>
        `;
        taskList.prepend(li);
    }
=======
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
>>>>>>> 19b02977022966595f5fe7f39ee4ad4dce6bcb2a

    document.addEventListener('keyup', (e) => {
        if (taskInput.classList.contains('show') && e.key == 'Enter' && newTaskInput.value !== '') {
            createTask(newTaskInput.value);
<<<<<<< HEAD
=======
            createTaskList(tasksDB.tasks, taskList);
>>>>>>> 19b02977022966595f5fe7f39ee4ad4dce6bcb2a
            newTaskInput.value = '';
        } else if (e.key == 'Escape' && taskInput.classList.contains('show')) {
            taskInput.classList.remove('show');
            taskInput.classList.add('hide');
            newTaskInput.value = '';
        }
    });

<<<<<<< HEAD
    // tasks.forEach((task) => {
    //     task.addEventListener('mouseenter', (e) => {
    //         const target = e.target;
    //        if (target.classList.contains('not__done')) {
    //            target.children[0].src = 'img/done.svg';
    //        }
    //     });
    //     task.addEventListener('mouseleave', (e) => {
    //         const target = e.target;
    //        if (target.classList.contains('not__done')) {
    //            target.children[0].src = 'img/notDone.svg';
    //        }
    //     });
    // });

    // делегирование событий в списке задач 
    
    

=======
>>>>>>> 19b02977022966595f5fe7f39ee4ad4dce6bcb2a
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
            target.parentElement.remove();
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
<<<<<<< HEAD
=======
            emptyListTitle.classList.add('hide');
>>>>>>> 19b02977022966595f5fe7f39ee4ad4dce6bcb2a
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
<<<<<<< HEAD
=======

    if (localStorage.getItem('tasks')) {
        emptyListTitle.classList.add('hide');
        tasksDB = JSON.parse(localStorage.getItem('tasks'));
        createTaskList(tasksDB.tasks, taskList);
    } else {
        emptyListTitle.classList.add('show');
    }
        
>>>>>>> 19b02977022966595f5fe7f39ee4ad4dce6bcb2a
});