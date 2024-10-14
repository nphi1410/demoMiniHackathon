// src/components/TodoList.tsx
import React from 'react';
import TodoItem from './TodoItem';
import { Todo } from './AddTodoForm';
// import '../App.css'

interface TodoListProps {
  todos: Todo[];
  editTodo: (id: number, updatedTodo: Partial<Todo>) => void;
  deleteTodo: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, editTodo, deleteTodo }) => {
  if (todos.length === 0) {
    return <p>No tasks yet.</p>;
  }

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          editTodo={editTodo}
          deleteTodo={deleteTodo}
        />
      ))}
    </div>
  );
};

export default TodoList;
