document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('new-task');
    const taskList = document.getElementById('task-list');
    const searchInput = document.getElementById('search-task');

    input.setAttribute('autocomplete', 'off');
    input.setAttribute('autocorrect', 'off');
    input.setAttribute('autocapitalize', 'off');

    // Cargar tareas del localStorage al cargar la página
    loadTasks();

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskValue = input.value.trim();
        if (taskValue) {
            addTask(taskValue);
            input.value = '';
        }
    });

    function addTask(task) {
        const li = createTaskElement(task);
        taskList.appendChild(li);
        saveTasks();
    }

    function createTaskElement(task) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task}</span>
            <div>
                <button class="complete-btn">✔️</button>
                <button class="delete-btn">❌</button>
            </div>
        `;

        li.querySelector('.complete-btn').addEventListener('click', () => {
            li.classList.toggle('completed');
            saveTasks();
        });

        li.querySelector('.delete-btn').addEventListener('click', () => {
            li.remove();
            saveTasks();
        });

        return li;
    }

    function saveTasks() {
        const tasks = Array.from(taskList.children).map(li => ({
            text: li.querySelector('span').innerText,
            completed: li.classList.contains('completed')
        }));
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const li = createTaskElement(task.text);
            if (task.completed) {
                li.classList.add('completed');
            }
            taskList.appendChild(li);
        });
    }

    function buscarTareas() {
        const filter = searchInput.value.toLowerCase();
        const tasks = document.querySelectorAll('#task-list li');
        tasks.forEach(task => {
            const text = task.querySelector('span').innerText.toLowerCase();
            task.style.display = text.includes(filter) ? '' : 'none';
        });
    }

    searchInput.addEventListener('input', buscarTareas);
});



