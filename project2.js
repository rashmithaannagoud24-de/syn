let draggedTask = null;

function addTask(columnId) {
    const taskText = prompt("Enter Task");

    if (!taskText) return;

    const task = document.createElement("div");
    task.className = "task";
    task.draggable = true;
    task.innerHTML = `
        ${taskText}
        <button onclick="deleteTask(this)">X</button>
    `;

    addDragEvents(task);

    document.getElementById(columnId).appendChild(task);

    saveBoard();
}

function deleteTask(button) {
    button.parentElement.remove();
    saveBoard();
}

function addDragEvents(task) {
    task.addEventListener("dragstart", () => {
        draggedTask = task;
    });
}

document.querySelectorAll(".column").forEach(column => {

    column.addEventListener("dragover", (e) => {
        e.preventDefault();
    });

    column.addEventListener("drop", () => {
        column.appendChild(draggedTask);
        saveBoard();
    });

});

function saveBoard() {
    const data = {};

    document.querySelectorAll(".column").forEach(column => {
        data[column.id] = [];
        column.querySelectorAll(".task").forEach(task => {
            data[column.id].push(task.childNodes[0].textContent.trim());
        });
    });

    localStorage.setItem("kanbanData", JSON.stringify(data));
}

function loadBoard() {
    const data = JSON.parse(localStorage.getItem("kanbanData"));

    if (!data) return;

    Object.keys(data).forEach(columnId => {
        data[columnId].forEach(text => {
            const task = document.createElement("div");
            task.className = "task";
            task.draggable = true;
            task.innerHTML = `
                ${text}
                <button onclick="deleteTask(this)">X</button>
            `;
            addDragEvents(task);
            document.getElementById(columnId).appendChild(task);
        });
    });
}

loadBoard();