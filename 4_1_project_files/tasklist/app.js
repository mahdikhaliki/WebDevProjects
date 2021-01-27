// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // DOM Load event
  document.addEventListener('DOMContentLoaded', getTasks);

  // Add task event
  form.addEventListener('submit', addTask);

  // Remove task event
  taskList.addEventListener('click', removeTask);

  // Clear all tasks event
  clearBtn.addEventListener('click', clearTasks);

  // Filter tasks event
  filter.addEventListener('keyup', filterTasks);
}

// Get Tasks from LS
function getTasks() {
  let tasks = localStorage.getItem('tasks');

  if(tasks === null) {
    tasks = [];
  }
  else {
    tasks = JSON.parse(tasks);
  }

  tasks.forEach(createTaskRowElement);
}

// Filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(
    function(task) {
      const item = task.firstChild.textContent;

      if(item.toLowerCase().indexOf(text) != -1) {
        task.style.display = 'block';
      }
      else {
        task.style.display = 'none';
      }
    });
}

// Clear Tasks
function clearTasks(e) {
  // taskList.innerHTML = '';

  // Faster
  while(taskList.firstChild) {
    taskList.firstChild.remove();
  }

  localStorage.clear();
}

// Remove Task
function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')) {
    removeTaskFromLocalStorage(e.target.parentElement.parentElement.textContent);
    e.target.parentElement.parentElement.remove();
  }
}

// Add Task
function addTask(e) {
  if(taskInput.value === '') {
    alert('Add a task');
    return;
  }
  // Add task to UL
  createTaskRowElement(taskInput.value);
  // Persist to local storage
  storeTaskInLocalStorage(taskInput.value);
  // Clear input
  taskInput.value = '';

  e.preventDefault();
}

// Create list element and add to taskList
function createTaskRowElement(task) {
  // Create li element
  const li = document.createElement('li');
  // Add class
  li.className = 'collection-item';
  // Create text node and append to li
  li.appendChild(document.createTextNode(task));
  // Create new link element
  const link = document.createElement('a');
  // Add class
  link.className = 'delete-item secondary-content'
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append the link to li
  li.appendChild(link);
  // Append li to ul
  taskList.appendChild(li);
}

// Store task to local storage
function storeTaskInLocalStorage(task) {
  let tasks = localStorage.getItem('tasks');

  if(tasks === null) {
    tasks = [];
  }
  else {
    tasks = JSON.parse(tasks);
  }

  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove task from local storage
function removeTaskFromLocalStorage(task) {
  let tasks = localStorage.getItem('tasks');

  if(tasks === null) {
    tasks = [];
  }
  else {
    tasks = JSON.parse(tasks);
  }

  tasks.forEach(function(taskInStorage, index) {
    if(task === taskInStorage) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}
