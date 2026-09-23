const taskInput = document.getElementById("task-input");
const addTaskButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");
const taskCounter = document.getElementById("task-counter");
const emptyMessage = document.getElementById("empty-message");
const clearCompletedButton = document.getElementById("clear-completed");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

displayTasks();


// Add task with button
addTaskButton.addEventListener("click", addTask);


// Add task with Enter key
taskInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});


// Add a new task
function addTask() {

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    const newTask = {
        text: taskText,
        completed: false
    };

    tasks.push(newTask);

    saveTasks();

    displayTasks();

    taskInput.value = "";
}


// Display all tasks
function displayTasks() {

    taskList.innerHTML = "";


    // Show or hide empty message
    if (tasks.length === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";
    }


    // Create each task
    tasks.forEach(function(task, index) {

        const taskElement = document.createElement("li");

        taskElement.classList.add("task");


        if (task.completed) {
            taskElement.classList.add("completed");
        }


        taskElement.innerHTML = `
            <span>${task.text}</span>
            <button class="delete-btn">Delete</button>
        `;


        // Mark task as completed
        taskElement.querySelector("span").addEventListener("click", function() {

            tasks[index].completed = !tasks[index].completed;

            saveTasks();

            displayTasks();
        });


        // Delete task
        taskElement.querySelector(".delete-btn").addEventListener("click", function() {

            tasks.splice(index, 1);

            saveTasks();

            displayTasks();
        });


        taskList.appendChild(taskElement);

    });


    // Count remaining tasks
    const remainingTasks = tasks.filter(function(task) {
        return !task.completed;
    }).length;


    if (remainingTasks === 1) {
        taskCounter.textContent = "1 task remaining";
    } else {
        taskCounter.textContent = remainingTasks + " tasks remaining";
    }


    // Show or hide Clear Completed button
    const hasCompletedTasks = tasks.some(function(task) {
        return task.completed;
    });


    if (hasCompletedTasks) {
        clearCompletedButton.style.display = "block";
    } else {
        clearCompletedButton.style.display = "none";
    }

}


// Clear completed tasks
clearCompletedButton.addEventListener("click", function() {

    tasks = tasks.filter(function(task) {
        return !task.completed;
    });

    saveTasks();

    displayTasks();

});


// Save tasks to browser
function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));

}