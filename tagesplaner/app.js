// Elemente holen
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const clearBtn = document.getElementById('clearBtn');

// Lade gespeicherte Aufgaben aus localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
renderTasks();

// Neue Aufgabe hinzufügen
addTaskBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText === '') return;

  tasks.push({ text: taskText, completed: false });
  saveAndRender();
  taskInput.value = '';
  taskInput.focus();
});

// Aufgabe als erledigt markieren oder löschen (bei Klick)
taskList.addEventListener('click', e => {
  if (e.target.tagName === 'LI') {
    const index = [...taskList.children].indexOf(e.target);
    if (tasks[index].completed) {
      // Löschen, wenn schon erledigt
      tasks.splice(index, 1);
    } else {
      // Markieren als erledigt
      tasks[index].completed = true;
    }
    saveAndRender();
  }
});

// Alle Aufgaben löschen
clearBtn.addEventListener('click', () => {
  if (confirm('Möchtest du wirklich alle Aufgaben löschen?')) {
    tasks = [];
    saveAndRender();
  }
});

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.textContent = task.text;
    if (task.completed) li.classList.add('completed');
    taskList.appendChild(li);
  });
}

function saveAndRender() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}
