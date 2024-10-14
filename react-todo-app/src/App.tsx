// src/App.tsx
import React, { useState, useEffect } from 'react';
import AddTodoForm, { Todo } from './components/AddTodoForm';
import TodoList from './components/TodoList';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './App.css';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); // State for the selected date

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch('http://localhost:5000/todos');
      const data = await response.json();
      setTodos(data);
    };

    fetchTodos();
  }, []);

  const addTodo = async (todo: Todo) => {
    const response = await fetch('http://localhost:5000/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todo),
    });
    const newTodo = await response.json();
    setTodos([newTodo, ...todos]);
  };

  const editTodo = async (id: number, updatedTodo: Partial<Todo>) => {
    const response = await fetch(`http://localhost:5000/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTodo),
    });
    const updated = await response.json();
    setTodos(todos.map((todo) => (todo.id === id ? updated : todo)));
  };

  const deleteTodo = async (id: number) => {
    await fetch(`http://localhost:5000/todos/${id}`, {
      method: 'DELETE',
    });
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const filteredTodos = todos.filter(todo => {
    const todoDate = new Date(todo.date);
    return todoDate.toDateString() === selectedDate?.toDateString();
  });

  return (
    <div className="app">
      <h1 className="app-title">To-Do List</h1>
      
      {selectedDate === null ? (
        // Show calendar if no date is selected
        <div className="calendar-wrapper">
          <Calendar
            onChange={(date) => setSelectedDate(date as Date | null)} // Use type assertion
            value={selectedDate}
          />
        </div>
      ) : (
        // Show todo list and form if a date is selected
        <div>
          <h2>Tasks for {selectedDate.toDateString()}</h2>
          <AddTodoForm addTodo={addTodo} selectedDate={selectedDate} />
          <TodoList todos={filteredTodos} editTodo={editTodo} deleteTodo={deleteTodo} />
          <button onClick={() => setSelectedDate(null)}>Back to Calendar</button>
        </div>
      )}
    </div>
  );
};

export default App;
