document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});

function loadTasks() {
    let pendingTasks = JSON.parse(localStorage.getItem('pendingTasks')) || [];
    let completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];
    renderTasks(pendingTasks, 'pending-tasks');
    renderTasks(completedTasks, 'completed-tasks', true);
}

function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();
    if (taskText) {
        const task = {
            id: Date.now(),
            text: taskText,
            dateAdded: new Date().toLocaleString()
        };
        let pendingTasks = JSON.parse(localStorage.getItem('pendingTasks')) || [];
        pendingTasks.push(task);
        localStorage.setItem('pendingTasks', JSON.stringify(pendingTasks));
        taskInput.value = '';
        renderTasks(pendingTasks, 'pending-tasks');
    }
}

function renderTasks(tasks, listId, completed = false) {
    const taskList = document.getElementById(listId);
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = completed ? 'completed' : '';
        li.innerHTML = `
            ${task.text} <span>${task.dateAdded}</span>
            <button class="edit-btn" onclick="editTask(${task.id}, ${completed})">Edit</button>
            <button class="delete-btn" onclick="deleteTask(${task.id}, ${completed})">Delete</button>
            ${completed ? '' : `<button class="complete-btn" onclick="completeTask(${task.id})">Complete</button>`}
        `;
        taskList.appendChild(li);
    });
}

function editTask(id, completed) {
    const tasks = JSON.parse(localStorage.getItem(completed ? 'completedTasks' : 'pendingTasks')) || [];
    const task = tasks.find(task => task.id === id);
    if (task) {
        const newTaskText = prompt('Edit task:', task.text);
        if (newTaskText) {
            task.text = newTaskText;
            task.dateAdded = new Date().toLocaleString();
            localStorage.setItem(completed ? 'completedTasks' : 'pendingTasks', JSON.stringify(tasks));
            renderTasks(tasks, completed ? 'completed-tasks' : 'pending-tasks', completed);
        }
    }
}

function deleteTask(id, completed) {
    let tasks = JSON.parse(localStorage.getItem(completed ? 'completedTasks' : 'pendingTasks')) || [];
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem(completed ? 'completedTasks' : 'pendingTasks', JSON.stringify(tasks));
    renderTasks(tasks, completed ? 'completed-tasks' : 'pending-tasks', completed);
}

function completeTask(id) {
    let pendingTasks = JSON.parse(localStorage.getItem('pendingTasks')) || [];
    const taskIndex = pendingTasks.findIndex(task => task.id === id);
    if (taskIndex > -1) {
        const [task] = pendingTasks.splice(taskIndex, 1);
        task.dateCompleted = new Date().toLocaleString();
        let completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];
        completedTasks.push(task);
        localStorage.setItem('pendingTasks', JSON.stringify(pendingTasks));
        localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
        renderTasks(pendingTasks, 'pending-tasks');
        renderTasks(completedTasks, 'completed-tasks', true);
    }
}
