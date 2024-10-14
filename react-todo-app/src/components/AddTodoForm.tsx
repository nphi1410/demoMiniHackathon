// src/components/AddTodoForm.tsx
import React, { useState } from 'react';
import 'react-calendar/dist/Calendar.css'; // Import Calendar styles

interface AddTodoFormProps {
  addTodo: (todo: Todo) => void;
  selectedDate: Date; // Accept selected date
}

export interface Todo {
  id: number;
  title: string;
  labels: string[];
  comments: string[];
  createdAt: string;
  updatedAt: string;
  date: string; // Include the date field
}

const AddTodoForm: React.FC<AddTodoFormProps> = ({ addTodo, selectedDate }) => {
  const [title, setTitle] = useState('');
  const [labelInput, setLabelInput] = useState(''); // Keep raw label input as a string

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const now = new Date().toISOString();
    
    if (title) {
      // Split labels by comma, trim whitespace, and filter out empty labels
      const labels = labelInput
        .split(',')
        .map(label => label.trim())
        .filter(label => label !== ''); // Remove empty or blank labels

      const newTodo: Todo = {
        id: Date.now(),
        title,
        labels, // Set filtered labels
        comments: [],
        createdAt: now,
        updatedAt: now,
        date: selectedDate.toISOString(), // Store the selected date
      };

      addTodo(newTodo);
      setTitle('');
      setLabelInput(''); // Reset label input after submission
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        placeholder="Enter your task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Add labels (comma separated)"
        value={labelInput} // Use labelInput state for raw input
        onChange={(e) => setLabelInput(e.target.value)} // Update raw input state
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTodoForm;
