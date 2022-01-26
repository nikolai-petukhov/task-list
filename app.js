// define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
    // DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);
    // add task event
    form.addEventListener('submit', addTask);
    // remove task event
    taskList.addEventListener('click', removeTask);
    // clear tasks event
    clearBtn.addEventListener('click', clearTasks);
    // filter tasks event
    filter.addEventListener('keyup', filterTasks)
}

// Get tasks from LS
function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach((task) => {
        // Create <li>
        const li = document.createElement('li');
        li.className = 'collection-item';

        // create text node and append to <li>
        li.appendChild(document.createTextNode(task));
        // Create new <link> element
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        // add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // append the <link> to <li>
        li.appendChild(link);

        // append <li> to <ul>
        taskList.appendChild(li);
    });
}

// Add task
function addTask(e) {
    if (taskInput.value === '') {
        alert('Add a task')
    } else {
        // Create <li>
        const li = document.createElement('li');
        li.className = 'collection-item';

        // create text node and append to <li>
        li.appendChild(document.createTextNode(taskInput.value));
        // Create new <link> element
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        // add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // append the <link> to <li>
        li.appendChild(link);

        // append <li> to <ul>
        taskList.appendChild(li);

        //Store in Ls
        storeTaskInLocalStorage(taskInput.value);

        // clear input
        taskInput.value = '';
    }

    e.preventDefault();
}

// store task
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// remove task
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        e.target.parentElement.parentElement.remove();

        // remove from LS
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
}

// remove from LS
function removeTaskFromLocalStorage(taskItem, index) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach((task) => {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// clear tasks
function clearTasks(e) {
    //taskList.innerHTML = '';

    // faster
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    // clear from LS
    clearTasksFromLocalStorage();
}

// clear tasks from LS
function clearTasksFromLocalStorage() {
    localStorage.clear();
}

// filter tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach((task) => {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}