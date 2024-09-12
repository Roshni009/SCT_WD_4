document.addEventListener("DOMContentLoaded", () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'))

    if(storedTasks) {
        storedTasks.forEach((task) => tasks.push(task))
        updateTaskList();
        updateTaskStats();
    }
})

let tasks = [];

const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

const addTask = () => {
    const taskInput = document.querySelector('.input-value');
    const task = taskInput.value.trim();
    
    if(task) {
        tasks.push({task: task, completed: false});
        taskInput.value = "";
        updateTaskList();updateTaskStats();
        saveTasks();
    }
    console.log(tasks);
};

const toggleTaskCompleted = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTaskList();
    updateTaskStats();
    saveTasks();
}

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTaskList();
    updateTaskStats();
    saveTasks();
}

const editTask = (index) => {
    const taskEdit = document.querySelector('.input-value');
    taskEdit.value = tasks[index].task;

    tasks.splice(index, 1);
    updateTaskList();
    updateTaskStats();
    saveTasks();
}

const updateTaskStats = () => {
    const completeTasks = tasks.filter(task => task.completed).length

    const totalTasks = tasks.length
    const progress = ( completeTasks/totalTasks) * 100;

    const progressBar = document.querySelector('#green-line');
    progressBar.style.width = `${progress}%`

    document.querySelector('#numbers').innerText = `${completeTasks} / ${totalTasks}`;

    if(tasks.length && completeTasks === totalTasks) {
        blaskConfetti();
    }

}

const updateTaskList = () => {
    const taskList = document.querySelector('.task-list');
    taskList.innerHTML = "";

    tasks.forEach((e, index) => {
        const listItem = document.createElement('li');

        listItem.innerHTML = `
          <div class="taskItem">
           <div class="task ${e.completed ? 'completed' : ''}">
           <input type="checkbox" class="checkbox" ${e.completed ? 'checked':''} />
           <p>${e.task}</p>
           </div>
           <div class="icons">
            <img src="./image/edit.png" onClick='editTask(${index})' />
            <img src="./image/delete.png" onClick='deleteTask(${index})' />
           </div>
          </div>
        `;

        listItem.addEventListener('change', () => toggleTaskCompleted(index));
        taskList.append(listItem);
    })
    
}
document.querySelector('#btn').addEventListener('click', (e) => {
    e.preventDefault();
    addTask();
});

const blaskConfetti = () => {
    const count = 200,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
}