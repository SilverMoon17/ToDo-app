window.addEventListener('DOMContentLoaded', (e) => {
    const addTask = document.querySelector('.add__task'),
          taskList = document.querySelector('.task__list'),
          tasks = document.querySelectorAll('.task'),
          taskInput = document.querySelector('.task__input'),
          saveBtn = document.querySelector('.save__btn'),
          cancelBtn = document.querySelector('.cancel__btn'),
          newTaskInput = document.querySelector('.new__task'),
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
});