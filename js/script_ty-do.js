const addTaskBtn = document.getElementById('addTaskBtn');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const showAllBtn = document.getElementById('showAll');
const showCompletedBtn = document.getElementById('showCompleted');
const showIncompleteBtn = document.getElementById('showIncomplete');

// Массив для хранения задач
let tasks = [];

// Функция добавления новой задачи
function addTask() {
    if (taskInput.value.trim() !== '') {
        const newTask = {
            text: taskInput.value,
            completed: false
        };
        tasks.push(newTask);
        taskInput.value = '';
        renderTasks();
    }
}

// Функция удаления задачи
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

// Функция изменения статуса задачи (выполнена/не выполнена)
function toggleTaskStatus(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

// Функция редактирования текста задачи
function editTask(index) {
    const newText = prompt('Редактировать задачу:', tasks[index].text);
    if (newText !== null) {
        tasks[index].text = newText;
        renderTasks();
    }
}

// Функция отображения задач
function renderTasks(filter = 'all') {
    taskList.innerHTML = '';
    let filteredTasks = tasks;

    if (filter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    } else if (filter === 'incomplete') {
        filteredTasks = tasks.filter(task => !task.completed);
    }

    filteredTasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.className = 'task';

        const taskText = document.createElement('input');
        taskText.type = 'text';
        taskText.value = task.text;
        taskText.disabled = true;
        if (task.completed) taskText.classList.add('completed');
        taskItem.appendChild(taskText);

        const editBtn = document.createElement('button');
        editBtn.innerText = 'Редактировать';
        editBtn.onclick = () => editTask(index);
        taskItem.appendChild(editBtn);

        const toggleBtn = document.createElement('button');
        toggleBtn.innerText = task.completed ? 'Отметить как невыполненную' : 'Отметить как выполненную';
        toggleBtn.onclick = () => toggleTaskStatus(index);
        taskItem.appendChild(toggleBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Удалить';
        deleteBtn.onclick = () => deleteTask(index);
        taskItem.appendChild(deleteBtn);

        taskList.appendChild(taskItem);
    });
}

// Обработчики событий
addTaskBtn.addEventListener('click', addTask);
showAllBtn.addEventListener('click', () => renderTasks('all'));
showCompletedBtn.addEventListener('click', () => renderTasks('completed'));
showIncompleteBtn.addEventListener('click', () => renderTasks('incomplete'));