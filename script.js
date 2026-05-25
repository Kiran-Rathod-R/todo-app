let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function save() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    let text = taskInput.value;
    if (!text) return;

    tasks.push({
        text,
        category: category.value,
        priority: priority.value,
        date: dueDate.value,
        done: false
    });

    taskInput.value = "";
    save();
    render();
}

function render() {
    let list = document.getElementById("taskList");
    let search = document.getElementById("search").value.toLowerCase();
    list.innerHTML = "";

    let completed = 0;

    tasks.forEach((t, i) => {

        if (!t.text.toLowerCase().includes(search)) return;

        if (t.done) completed++;

        let div = document.createElement("div");
        div.className = "task " + (t.done ? "completed" : "");

        div.innerHTML = `
            <div onclick="toggle(${i})">
                <b>${t.text}</b><br>
                <small>${t.category} | ${t.date || "No date"}</small>
                <span class="badge ${t.priority}">${t.priority}</span>
            </div>
            <button onclick="remove(${i})">❌</button>
        `;

        list.appendChild(div);
    });

    let progress = (completed / tasks.length) * 100 || 0;
    document.getElementById("progressBar").style.width = progress + "%";
}

function toggle(i) {
    tasks[i].done = !tasks[i].done;
    save();
    render();
}

function remove(i) {
    tasks.splice(i, 1);
    save();
    render();
}

function toggleTheme() {
    document.body.classList.toggle("dark");
}

render();