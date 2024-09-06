const taskInput = document.getElementById("newTask");
const taskList = document.getElementById("taskList");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("p");
    li.innerHTML = `
      <span >${task.name}</span>
      <button onclick="deleteTask(${index})">Delete</button>
    `;
    taskList.appendChild(li);
  });
}

document.getElementById("addTask").addEventListener("click", () => {
  const taskName = taskInput.value.trim();
  if (taskName) {
    tasks.push({ name: taskName });
    taskInput.value = "";
    updateLocalStorage();
    renderTasks();
  }
});

function deleteTask(index) {
  tasks.splice(index, 1);
  updateLocalStorage();
  renderTasks();
}

function updateLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Initial rendering of tasks from local storage
renderTasks();
