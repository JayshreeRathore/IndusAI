const express = require('express');
const cors = require('cors');
const app = express();
const port = 5500;

// Use CORS middleware
app.use(cors());

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

// In-memory storage (replace with database in production)
let todos = [];

// Create - Add a new Todo
app.post('/api/todos', (req, res) => {
  const { todo, priority, status, category, dueDate } = req.body;
  const newTodo = { id: todos.length + 1, todo, priority, status, category, dueDate };
  todos.push(newTodo);
  res.send('Todo Successfully Added');
});

// Read - Get all Todos
app.get('/api/todos', (req, res) => {
  const todoList = todos.map(todo => 
    `${todo.id}|${todo.todo}|${todo.priority}|${todo.status}|${todo.category}|${todo.dueDate}`
  ).join('\n');
  res.send(todoList);
});

// Update - Update a Todo
app.post('/api/todos/update/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { todo, priority, status, category, dueDate } = req.body;
  const index = todos.findIndex(t => t.id === id);
  
  if (index !== -1) {
    todos[index] = { id, todo, priority, status, category, dueDate };
    res.send('Todo Updated Successfully');
  } else {
    res.status(404).send('Todo Not Found');
  }
});

// Delete - Delete a Todo
app.post('/api/todos/delete/:id', (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter(t => t.id !== id);
  res.send('Todo Deleted Successfully');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
