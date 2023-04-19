// селектори
const listForm = document.getElementById("listForm");
const listNameInput = document.getElementById("listNameInput");
const listSelect = document.getElementById("listSelect");
const deleteListButton = document.getElementById("deleteListButton");
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// слоган-вітання чоловіка
// const myWindow = window.open("https://raw.githubusercontent.com/valeriasekret/JSF-Projects/main/Shopping-Lists/img/jokeslogan.PNG", "", "left=500,top=180,width=440,height=440");
// setTimeout(() => {
//     myWindow.close();
// }, 6000);

// завантажуємо списки з local st. і відображемо на сторінці, з дефолтним списком
window.addEventListener("load", () => {
  loadTaskLists();
  listSelect.value = "Default List";
  displaySavedTasks();
});

// додаю новий список у список вибору списків
listForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newListName = listNameInput.value.trim();
  if (newListName !== "") {
    addTaskList(newListName);
    listNameInput.value = "";
  }
});

// додаю нові товари у вибраний список
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const selectedList = listSelect.value;
  const newTaskName = taskInput.value.trim();
  if (newTaskName !== "") {
    addTask(selectedList, newTaskName);
    taskInput.value = "";
  }
});

// можливість видалити список
deleteListButton.addEventListener("click", () => {
  const selectedList = listSelect.value;
  deleteTaskList(selectedList);
});

/* додаю новий список завдань до додатку, перевіряю, чи не дублюється назва 
списку з існуючим списком, і зберігаю оновлений список завдань у локальному 
сховищі. */
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

// завантажую список завдань з локального сховища та створюю випадайку
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

// для видалення завдання з вибраного списку завдань
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

// завантаження списку завдань для обраного списку
function loadTasks(selectedList) {
  const savedLists = JSON.parse(localStorage.getItem("taskLists")) || {};
  const tasks = savedLists[selectedList] || [];
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task;

    // роблю контейнер для товару з кнопкою видалення
    const container = document.createElement("div");
    container.classList.add("taskContainer");

    container.appendChild(li);

    // роблю кнопку видалення
    const deleteButton = document.createElement("button");
    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa", "fa-minus");
    deleteButton.appendChild(deleteIcon);
    deleteButton.classList.add("deleteButton");

    // event listener на кнопку видалення
    deleteButton.addEventListener("click", (e) => {
      deleteTask(selectedList, index);
    });
    // Append delete button to the container
    container.appendChild(deleteButton);

    // Add a click event listener to each task list item
    li.addEventListener("click", () => {
      // Toggle the "done" class to add/remove the strike-through effect
      li.classList.toggle("done");

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

// функція для видалення списку
function deleteTaskList(selectedList) {
  const savedLists = JSON.parse(localStorage.getItem("taskLists")) || {};
  if (savedLists[selectedList]) {
    delete savedLists[selectedList];
    localStorage.setItem("taskLists", JSON.stringify(savedLists));
    listSelect.remove(listSelect.selectedIndex);
    taskList.innerHTML = "";
  }
}

// завантажуємо списки товарів при завантаженні сторінки
window.addEventListener("load", loadTaskLists);


// додаємо нову позицію/товар у список
function addTask(selectedList, newTaskName) {
  const savedLists = JSON.parse(localStorage.getItem("taskLists")) || {};
  const maxTasks = 8;

  if (savedLists[selectedList]) {
    if (savedLists[selectedList].length < maxTasks) {
      savedLists[selectedList].push(newTaskName);
      localStorage.setItem("taskLists", JSON.stringify(savedLists));
      loadTasks(selectedList); 
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