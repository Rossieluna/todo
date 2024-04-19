const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

//Use CORS middleware to allow requests from all origins
app.use(cors());

// Placeholder array to store tasks temporarily
let tasks = [];

// Define route handler for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the Todo List API');
});

// GET /tasks route handler
app.get('/tasks', (req, res) => {
  // Send all tasks as JSON response
  res.json(tasks);
});

// POST /tasks route handler
app.post('/tasks', (req, res) => {
  // Extract task data from the request body
  const { name, description } = req.body;

  // Create a new task object
  const newTask = { id: tasks.length + 1, name, description, status: 'todo' };

  // Add the new task to the tasks array
  tasks.push(newTask);

  // Send the newly created task as JSON response
  res.status(201).json(newTask);
});

// GET /tasks/:id route handler
app.get('/tasks/:id', (req, res) => {
  // Extract task ID from request parameters
  const taskId = parseInt(req.params.id);

  // Log the received task ID
  console.log('Received request for task ID:', taskId);

  // Find the task with the corresponding ID
  const task = tasks.find(task => task.id === taskId);

  // If task is found, send it as JSON response
  if (task) {
    res.json(task);
  } else {
    // Log an error message if task is not found
    console.log('Task not found for ID:', taskId);
    
    // If task is not found, send 404 (Not Found) response
    res.status(404).json({ error: 'Task not found' });
  }
});

// PUT /tasks/:id route handler
app.put('/tasks/:id', (req, res) => {
  // Extract task ID from request parameters
  const taskId = parseInt(req.params.id);

  // Extract updated task data from request body
  const { name, description, status } = req.body;

  // Find the index of the task with the corresponding ID
  const taskIndex = tasks.findIndex(task => task.id === taskId);

  // If task is found, update it with the new data
  if (taskIndex !== -1) {
    tasks[taskIndex] = {
      ...tasks[taskIndex],
      name: name || tasks[taskIndex].name,
      description: description || tasks[taskIndex].description,
      status: status || tasks[taskIndex].status
    };
    
    // Send the updated task as JSON response
    res.json(tasks[taskIndex]);
  } else {
    // If task is not found, send 404 (Not Found) response
    res.status(404).json({ error: 'Task not found' });
  }
});

// DELETE /tasks/:id route handler
app.delete('/tasks/:id', (req, res) => {
  // Extract task ID from request parameters
  const taskId = parseInt(req.params.id);

  // Find the index of the task with the corresponding ID
  const taskIndex = tasks.findIndex(task => task.id === taskId);

  // If task is found, remove it from the tasks array
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    
    // Send success message as JSON response
    res.json({ message: 'Task deleted successfully' });
  } else {
    // If task is not found, send 404 (Not Found) response
    res.status(404).json({ error: 'Task not found' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
