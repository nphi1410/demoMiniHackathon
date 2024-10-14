// src/components/TodoItem.tsx
import React, { useState } from "react";
import { Todo } from "./AddTodoForm";
// import '../App.css';

interface TodoItemProps {
  todo: Todo;
  editTodo: (id: number, updatedTodo: Partial<Todo>) => void;
  deleteTodo: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, editTodo, deleteTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);
  const [comment, setComment] = useState("");

  const handleEdit = () => {
    if (isEditing) {
      const now = new Date().toISOString();
      editTodo(todo.id, { title: newTitle, updatedAt: now });
    }
    setIsEditing(!isEditing);
  };

  const handleAddComment = () => {
    if (comment.trim()) {
      editTodo(todo.id, { comments: [...todo.comments, comment] });
      setComment("");
    }
  };

  return (
    <div className="todo-item">
      {isEditing ? (
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          required
        />
      ) : (
        <h3>{todo.title}</h3>
      )}
      <div>
        {todo.labels.map((label) => (
          <span className="todo-label" key={label}>
            {label}
          </span>
        ))}
      </div>
      <div>
        <button onClick={handleEdit}>{isEditing ? "Save" : "Edit"}</button>
        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
      </div>
      <div>
        <h4>Comments:</h4>
        {todo.comments.map((comment, index) => (
          <p key={index}>- {comment}</p>
        ))}
        <input
          type="text"
          placeholder="Add comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button onClick={handleAddComment}>Add Comment</button>
      </div>
      <div className="todo-dates">
        <p>Created At: {new Date(todo.createdAt).toLocaleString()}</p>
        <p>Last Edited: {new Date(todo.updatedAt).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default TodoItem;
