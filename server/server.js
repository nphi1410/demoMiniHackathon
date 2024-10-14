// server/server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const DATA_FILE = 'todos.json';

// Helper function to read and write JSON file
const readTodos = () => {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};

const writeTodos = (todos) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(todos, null, 2));
};

// Endpoint to get todos
app.get('/todos', (req, res) => {
  const todos = readTodos();
  res.json(todos);
});

// Endpoint to create a new todo
app.post('/todos', (req, res) => {
  const todos = readTodos();
  const newTodo = req.body;
  todos.push(newTodo);
  writeTodos(todos);
  res.status(201).json(newTodo);
});

// Endpoint to update a todo
app.put('/todos/:id', (req, res) => {
  const todos = readTodos();
  const todoId = parseInt(req.params.id);
  const updatedTodo = req.body;

  const index = todos.findIndex((todo) => todo.id === todoId);
  if (index !== -1) {
    todos[index] = { ...todos[index], ...updatedTodo };
    writeTodos(todos);
    res.json(todos[index]);
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
