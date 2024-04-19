// Function to fetch and display tasks
function displayTasks() {
  // Fetch tasks from the backend API
  fetch('http://localhost:3000/tasks')
      .then(response => response.json())
      .then(tasks => {
          // Clear the task list
          const taskList = document.getElementById('taskList');
          taskList.innerHTML = '';

          // Iterate over each task and create a list item for it
          tasks.forEach(task => {
              const taskItem = document.createElement('li');
              taskItem.textContent = task.name; // Display task name

              // Create edit button
              const editButton = document.createElement('button');
              editButton.textContent = 'Edit';
              editButton.addEventListener('click', () => editTask(task.id));
              taskItem.appendChild(editButton);

              // Create delete button
              const deleteButton = document.createElement('button');
              deleteButton.textContent = 'Delete';
              deleteButton.addEventListener('click', () => deleteTask(task.id));
              taskItem.appendChild(deleteButton);

              taskList.appendChild(taskItem);
          });
      })
      .catch(error => {
          // Display an error message if an error occurred during the fetch request
          console.error('Error fetching tasks:', error);
          alert('An error occurred while fetching tasks.');
      });
}

// Function to add a new task
function addTask() {
  console.log('Adding task...');

  // Get the task input value
  const taskInput = document.getElementById('taskInput').value;

  console.log('Task input:', taskInput);

  // Check if the task input is not empty
  if (taskInput.trim() !== '') {
      // Create a new task object
      const newTask = {
          name: taskInput,
          description: '', // You can add a description field if needed
          status: 'pending' // Set the default status
      };

      console.log('New task:', newTask);

      // Send a POST request to the backend API to add the new task
      fetch('http://localhost:3000/tasks', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(newTask)
      })
          .then(response => {
              // Check if the request was successful (status code 200-299)
              if (response.ok) {
                  console.log('Task added successfully.');

                  // Clear the task input field
                  document.getElementById('taskInput').value = '';

                  //relaod if added successfully
                  location.reload();

              } else {
                  // Display an error message if the request was not successful
                  console.error('Failed to add task. Status:', response.status);
                  alert('Failed to add task. Please try again.');
              }
          })
          .catch(error => {
              // Display an error message if an error occurred during the fetch request
              console.error('Error adding task:', error);
              alert('An error occurred. Please try again.');
          });
  } else {
      // Display an error message if the task input is empty
      console.error('Task input is empty.');
      alert('Please enter a task.');
  }
}

// Function to edit a task
function editTask(taskId) {
  const newName = prompt("Enter the new name for the task:");
  if (newName !== null) {
      // Send a PUT request to update the task on the backend
      fetch(`http://localhost:3000/tasks/${taskId}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name: newName })
      })
          .then(response => {
              if (response.ok) {
                  // Reload the tasks after editing
                  displayTasks();
              } else {
                  console.error('Failed to edit task. Status:', response.status);
                  alert('Failed to edit task. Please try again.');
              }
          })
          .catch(error => {
              console.error('Error editing task:', error);
              alert('An error occurred. Please try again.');
          });
  }
}

// Function to delete a task
function deleteTask(taskId) {
  if (confirm("Are you sure you want to delete this task?")) {
      // Send a DELETE request to remove the task from the backend
      fetch(`http://localhost:3000/tasks/${taskId}`, {
          method: 'DELETE'
      })
          .then(response => {
              if (response.ok) {
                  // Reload the tasks after deletion
                  displayTasks();
              } else {
                  console.error('Failed to delete task. Status:', response.status);
                  alert('Failed to delete task. Please try again.');
              }
          })
          .catch(error => {
              console.error('Error deleting task:', error);
              alert('An error occurred. Please try again.');
          });
  }
}

// Initial call to display tasks when the page loads
displayTasks();