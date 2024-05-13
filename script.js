document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    let tasks = [];

    function addTask(taskText) {
        const newTask = {
            id: tasks.length + 1,
            text: taskText,
            completed: false
        };
        tasks.push(newTask);
        renderTasks();
    }

    function deleteTask(taskId) {
        const task = tasks.find(task => task.id === taskId);
        if (task) {
            Swal.fire({
                title: '¿Estás seguro de eliminar esta tarea?',
                text: 'Esta acción no se puede deshacer',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                confirmButtonText: 'Eliminar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    const taskIndex = tasks.findIndex(task => task.id === taskId);
                    if (taskIndex !== -1) {
                        tasks.splice(taskIndex, 1);
                        renderTasks();
                    }
                    Swal.fire(
                        'Tarea eliminada',
                        '',
                        'success'
                    );
                }
            });
        }
    }

    function modifyTask(taskId, newText, input) {
        const task = tasks.find(task => task.id === taskId);
        if (task) {
            if (newText.trim() === "") {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'El texto de la tarea no puede estar vacío'
                });
            } else {
                Swal.fire({
                    title: '¿Estás seguro de editar esta tarea?',
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonText: 'Aceptar',
                    cancelButtonText: 'Cancelar',
                }).then((result) => {
                    if (result.isConfirmed) {
                        task.text = newText.trim();
                        renderTasks();
                        Swal.fire(
                            'Tarea editada',
                            '',
                            'success'
                        );
                        input.disabled = true; 
                    }
                });
            }
        }
    }
    
    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach(task => {
            const li = document.createElement("li");
            const input = document.createElement("input");
            input.type = "text";
            input.value = task.text;
            input.classList.add("task-input");
            input.disabled = true; 

            const editBtn = document.createElement("button");
            editBtn.innerHTML = '<i class="fas fa-pencil-alt"></i>';
            editBtn.classList.add("edit-btn");
            editBtn.addEventListener("click", function(event) {
                event.stopPropagation();
                input.disabled = false; 
                input.focus(); 
            });

            const confirmBtn = document.createElement("button");
            confirmBtn.innerHTML = '<i class="fas fa-check"></i>';
            confirmBtn.classList.add("confirm-btn");
            confirmBtn.addEventListener("click", function(event) {
                event.stopPropagation(); 
                modifyTask(task.id, input.value, input);
                input.disabled = false; 
            });

            const deleteBtn = document.createElement("button");
            deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
            deleteBtn.classList.add("delete-btn");
            deleteBtn.addEventListener("click", function(event) {
                event.stopPropagation(); 
                deleteTask(task.id);
            });

            li.appendChild(input);
            li.appendChild(editBtn);
            li.appendChild(confirmBtn);
            li.appendChild(deleteBtn);

            if (task.completed) {
                li.classList.add("completed");
            }

            deleteBtn.addEventListener("click", function(event) {
                event.stopPropagation(); 
                deleteTask(task.id);
            });

            taskList.appendChild(li);
        });
    }

    addTaskBtn.addEventListener("click", function() {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            addTask(taskText);
            taskInput.value = "";
        }
    });

    addTaskBtn.disabled = true;

    taskInput.addEventListener("input", function() {
        addTaskBtn.disabled = taskInput.value.trim() === "";
    });

    renderTasks();
});
