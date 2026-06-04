// Data structure to store application state
let appState = {
    teammates: [], // Array of teammate names
    tasks: []      // Array of task objects
};

// DOM elements
const teammateNameInput = document.getElementById('teammateName');
const teammateSelector = document.getElementById('teammateSelector');
const taskNameInput = document.getElementById('taskName');
const dueDateInput = document.getElementById('dueDate');
const taskList = document.getElementById('taskList');
const deleteCompletedBtn = document.getElementById('deleteCompleted');
const resetBtn = document.getElementById('reset');

// Initialize the app
function init() {
    loadFromLocalStorage();
    renderTeammateSelector();
    renderTaskList();
    setupEventListeners();
}

// Set up event listeners
function setupEventListeners() {
    deleteCompletedBtn.addEventListener('click', clearCompletedTasks);
    resetBtn.addEventListener('click', resetApp);
}

// PART 2: Teammate Management
function addTeammate() {
    const name = teammateNameInput.value.trim();

    // Validation
    if (!name) {
        alert('Please enter a teammate name!');
        return;
    }

    if (appState.teammates.includes(name)) {
        alert(`${name} already exists!`);
        return;
    }

    // Add to teammates array and sort alphabetically
    appState.teammates.push(name);
    appState.teammates.sort();

    // Clear input field
    teammateNameInput.value = '';

    // Update UI
    renderTeammateSelector();
    saveToLocalStorage();
}

function renderTeammateSelector() {
    // Clear existing options except the first one
    while (teammateSelector.options.length > 1) {
        teammateSelector.remove(1);
    }

    // Add teammates to dropdown
    appState.teammates.forEach(teammate => {
        const option = document.createElement('option');
        option.value = teammate;
        option.textContent = teammate;
        teammateSelector.appendChild(option);
    });

    // Update placeholder based on whether teammates exist
    const placeholderOption = teammateSelector.options[0];
    if (appState.teammates.length > 0) {
        placeholderOption.disabled = true;
        placeholderOption.textContent = 'Assign to';
    } else {
        placeholderOption.disabled = false;
        placeholderOption.textContent = 'Assign to';
    }
}

// PART 3: Task Management
function addTask() {
    const selectedTeammate = teammateSelector.value;
    const taskText = taskNameInput.value.trim();
    const dueDate = dueDateInput.value;
    const currentDate = new Date().toISOString().split('T')[0];

    // Validation
    if (!selectedTeammate || selectedTeammate === 'Assign to') {
        alert('Please select a teammate!');
        return;
    }

    if (!taskText) {
        alert('Please enter a task description!');
        return;
    }

    if (!dueDate) {
        alert('Please select a due date!');
        return;
    }

    if (dueDate < currentDate) {
        alert('Due date cannot be in the past!');
        return;
    }

    // Create new task object
    const newTask = {
        id: Date.now(), // Unique identifier
        teammate: selectedTeammate,
        text: taskText,
        dueDate: dueDate,
        completed: false
    };

    // Add to tasks array
    appState.tasks.push(newTask);

    // Clear input fields
    taskNameInput.value = '';
    dueDateInput.value = '';

    // Update UI
    renderTaskList();
    saveToLocalStorage();
}

function renderTaskList() {
    // Clear task list
    taskList.innerHTML = '';

    // If no tasks, show empty message
    if (appState.tasks.length === 0) {
        const emptyMessage = document.createElement('div');
        emptyMessage.className = 'empty-message';
        emptyMessage.textContent = 'No tasks right now. Please add a teammate and assign a task.';
        emptyMessage.style.textAlign = 'center';
        emptyMessage.style.padding = '40px 0';
        emptyMessage.style.color = '#666';
        taskList.appendChild(emptyMessage);
        return;
    }

    // Group tasks by teammate
    const tasksByTeammate = {};
    appState.tasks.forEach(task => {
        if (!tasksByTeammate[task.teammate]) {
            tasksByTeammate[task.teammate] = [];
        }
        tasksByTeammate[task.teammate].push(task);
    });

    // Sort teammates alphabetically
    const sortedTeammates = Object.keys(tasksByTeammate).sort();

    // Render tasks for each teammate
    sortedTeammates.forEach(teammate => {
        const teammateSection = document.createElement('div');
        teammateSection.className = 'team-member-task-list';

        // Teammate heading
        const heading = document.createElement('h3');
        heading.textContent = teammate;
        teammateSection.appendChild(heading);

        // Sort tasks by due date (soonest first)
        const sortedTasks = tasksByTeammate[teammate].sort((a, b) =>
            new Date(a.dueDate) - new Date(b.dueDate)
        );

        // Render each task
        sortedTasks.forEach(task => {
            const taskCard = document.createElement('div');
            taskCard.className = 'task-card';
            if (task.completed) {
                taskCard.style.opacity = '0.7';
            }

            // Task text with strikethrough if completed
            const taskSpan = document.createElement('span');
            taskSpan.textContent = task.text;
            if (task.completed) {
                taskSpan.style.textDecoration = 'line-through';
            }

            // Due date
            const dueDateSpan = document.createElement('span');
            dueDateSpan.className = 'due-date';
            dueDateSpan.textContent = `Due: ${task.dueDate}`;

            // Checkbox
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'checkmark-btn';
            checkbox.checked = task.completed;
            checkbox.addEventListener('change', () => toggleTaskCompletion(task.id));

            taskCard.appendChild(taskSpan);
            taskCard.appendChild(dueDateSpan);
            taskCard.appendChild(checkbox);

            teammateSection.appendChild(taskCard);
        });

        taskList.appendChild(teammateSection);
    });
}

function toggleTaskCompletion(taskId) {
    const task = appState.tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        renderTaskList();
        saveToLocalStorage();
    }
}

// PART 4: Reset and Save functionality
function clearCompletedTasks() {
    // Filter out completed tasks
    appState.tasks = appState.tasks.filter(task => !task.completed);

    // Update UI
    renderTaskList();
    saveToLocalStorage();
}

function resetApp() {
    if (confirm('Are you sure you want to reset all teammates and to-do items?')) {
        // Clear all data
        appState = {
            teammates: [],
            tasks: []
        };

        // Reset UI
        renderTeammateSelector();
        renderTaskList();
        saveToLocalStorage();
    }
}

// Local Storage functions
function saveToLocalStorage() {
    localStorage.setItem('todoAppState', JSON.stringify(appState));
}

function loadFromLocalStorage() {
    const saved = localStorage.getItem('todoAppState');
    if (saved) {
        appState = JSON.parse(saved);
    }
}

// Add some CSS for the empty message (add this to your style.css)
const style = document.createElement('style');
style.textContent = `
    .empty-message {
        text-align: center;
        padding: 40px 0;
        color: #666;
        font-style: italic;
    }
`;
document.head.appendChild(style);

// Initialize the app when the page loads
document.addEventListener('DOMContentLoaded', init);