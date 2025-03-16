
document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
  
    // Load tasks from local storage 
    loadTasks();
  
    // Function to add a new task
    addTaskBtn.addEventListener('click', () => {
      const taskText = taskInput.value.trim();
      if (taskText !== '') {
        addTask(taskText);
        taskInput.value = ''; // Clear the input field
        saveTasks(); // Save tasks to local storage
      }
    });
  
    // Function to add a task to the list
    function addTask(taskText) {
      const li = document.createElement('li');
      li.textContent = taskText;
  
      // Create a delete button
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.addEventListener('click', () => {
        taskList.removeChild(li);
        saveTasks(); // Save tasks to local storage after deletion
      });
  
      li.appendChild(deleteBtn);
      taskList.appendChild(li);
    }
  
    
    taskInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        addTaskBtn.click();
      }
    });
  
    
    function saveTasks() {
      const tasks = [];
      document.querySelectorAll('#taskList li').forEach((task) => {
        tasks.push(task.textContent.replace('Delete', '').trim()); // Remove the "Delete" button text
      });
      localStorage.setItem('tasks', JSON.stringify(tasks)); // Save tasks
    }
  

    function loadTasks() {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.forEach((taskText) => {
        addTask(taskText); 
      });
    }
  });