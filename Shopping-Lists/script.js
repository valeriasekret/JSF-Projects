const listForm = document.getElementById("listForm");
const listNameInput = document.getElementById("listNameInput");
const listSelect = document.getElementById("listSelect");
const deleteListButton = document.getElementById("deleteListButton");
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// const myWindow = window.open("https://raw.githubusercontent.com/valeriasekret/JSF-Projects/main/Shopping-Lists/img/jokeslogan.PNG", "", "left=500,top=180,width=440,height=440");
// setTimeout(() => {
//     myWindow.close();
// }, 6000);

// Load task lists on page load with "Default List" selected
window.addEventListener("load", () => {
  loadTaskLists();
  listSelect.value = "Default List"; // Set default list name
  displaySavedTasks(); // Display tasks for the default list
});

// Add event listener for list form submission
listForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newListName = listNameInput.value.trim();
  if (newListName !== "") {
    addTaskList(newListName);
    listNameInput.value = "";
  }
});

// Add event listener for task form submission
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const selectedList = listSelect.value;
  const newTaskName = taskInput.value.trim();
  if (newTaskName !== "") {
    addTask(selectedList, newTaskName);
    taskInput.value = "";
  }
});

// Add event listener for delete list button
deleteListButton.addEventListener("click", () => {
  const selectedList = listSelect.value;
  deleteTaskList(selectedList);
});

// Function to add a new task list
function addTaskList(newListName) {
  const savedLists = JSON.parse(localStorage.getItem("taskLists")) || {};
  if (!savedLists[newListName]) {
    savedLists[newListName] = [];
    localStorage.setItem("taskLists", JSON.stringify(savedLists));
    loadTaskLists();
  } else {
    alert("Task list name already exists!");
  }
}

// Function to load task lists
function loadTaskLists() {
  const savedLists = JSON.parse(localStorage.getItem("taskLists")) || {};
  listSelect.innerHTML = "";
  Object.keys(savedLists).forEach(list => {
    const option = document.createElement("option");
    option.textContent = list;
    listSelect.appendChild(option);
  });
  loadTasks(listSelect.value);
}

// Function to delete a task from a list
function deleteTask(selectedList, taskIndex) {
  const savedLists = JSON.parse(localStorage.getItem("taskLists")) || {};
  if (savedLists[selectedList]) {
    savedLists[selectedList].splice(taskIndex, 1); // Remove task from the list
    localStorage.setItem("taskLists", JSON.stringify(savedLists)); // Update saved task lists in local storage
    loadTasks(selectedList); // Update displayed tasks in the selected list
  } else {
    alert("Selected list not found in local storage!");
  }
}

// Function to load tasks for the selected list
function loadTasks(selectedList) {
  const savedLists = JSON.parse(localStorage.getItem("taskLists")) || {};
  const tasks = savedLists[selectedList] || [];
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task;

    // Create a container element for task item and delete button
    const container = document.createElement("div");
    container.classList.add("taskContainer");

    // Append task item to the container
    container.appendChild(li);

    // Create a delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "-";
    deleteButton.classList.add("deleteButton");

    // Add a click event listener to the delete button
    deleteButton.addEventListener("click", (e) => {
      deleteTask(selectedList, index);
    });

    // Append delete button to the container
    container.appendChild(deleteButton);

    // Add a click event listener to each task list item
    container.addEventListener("click", () => {
      // Toggle the "done" class to add/remove the strike-through effect
      container.classList.toggle("done");

      // Check if the text node is not undefined before accessing its textContent
      if (taskList.childNodes[index]) {
        // Update the task status in the saved lists in local storage
        savedLists[selectedList][index] = taskList.childNodes[index].textContent;
        localStorage.setItem("taskLists", JSON.stringify(savedLists));
      }
    });

    taskList.appendChild(container);
  });
}

// Function to delete a task list
function deleteTaskList(selectedList) {
  const savedLists = JSON.parse(localStorage.getItem("taskLists")) || {};
  if (savedLists[selectedList]) {
    delete savedLists[selectedList];
    localStorage.setItem("taskLists", JSON.stringify(savedLists));
    listSelect.remove(listSelect.selectedIndex);
    taskList.innerHTML = "";
  }
}

// Load task lists on page load
window.addEventListener("load", loadTaskLists);


// Function to add a new task to a list
function addTask(selectedList, newTaskName) {
  const savedLists = JSON.parse(localStorage.getItem("taskLists")) || {};
  const maxTasks = 8; // Specify the maximum number of tasks allowed in a list

  if (savedLists[selectedList]) {
    if (savedLists[selectedList].length < maxTasks) {
      savedLists[selectedList].push(newTaskName);
      localStorage.setItem("taskLists", JSON.stringify(savedLists));
      loadTasks(selectedList); // Update displayed tasks in the selected list
    } else {
      alert(`Maximum of ${maxTasks} tasks allowed in ${selectedList} list!`);
    }
  } else {
    alert("Selected list not found in local storage!");
  }
}



// Function to display saved tasks in the list that is chosen
function displaySavedTasks() {
  const selectedList = listSelect.value;
  loadTasks(selectedList);
}

// Add event listener for list select change
listSelect.addEventListener("change", displaySavedTasks);

// Add event listener for delete task button
document.addEventListener("click", (e) => {
  if (e.target && e.target.className === "deleteButton") {
    e.target.parentElement.remove();
  }
});