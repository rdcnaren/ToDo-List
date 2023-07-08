import React, { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');

  const [newTask, setNewTask] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const handleTaskChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setNewDescription(e.target.value);
  };

  const addTodo = () => {
    if (newTask.trim() !== '') {
      const newTodo = {
        id: new Date().getTime(),
        task: newTask,
        description: newDescription,
        status: 'not completed',
      };

      setTodos([...todos, newTodo]);

      setNewTask('');
      setNewDescription('');
    }
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const updateTodo = (id, updatedTask, updatedDescription) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          task: updatedTask,
          description: updatedDescription,
        };
      }
      return todo;
    });

    setTodos(updatedTodos);
  };

  const toggleStatus = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          status: todo.status === 'not completed' ? 'completed' : 'not completed',
        };
      }
      return todo;
    });

    setTodos(updatedTodos);
  };

  const filterTodos = () => {
    if (filter === 'completed') {
      return todos.filter((todo) => todo.status === 'completed');
    } else if (filter === 'not completed') {
      return todos.filter((todo) => todo.status === 'not completed');
    } else {
      return todos;
    }
  };

  return (
    <div className="App">
      <h1>Todo App</h1>

      <div className="input-container">
        <input
          type="text"
          placeholder="Task"
          value={newTask}
          onChange={handleTaskChange}
        />
        <textarea
          placeholder="Description"
          value={newDescription}
          onChange={handleDescriptionChange}
        ></textarea>
        <button onClick={addTodo}>Add Task</button>
      </div>

      <div className="filter-container">
        <label htmlFor="filter">Filter:</label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="not completed">Not Completed</option>
        </select>
      </div>

      <div className="todo-container">
        {filterTodos().map((todo) => (
          <div className="todo-card" key={todo.id}>
            <h3>{todo.task}</h3>
            <p>{todo.description}</p>
            <p>Status: {todo.status}</p>
            <button onClick={() => toggleStatus(todo.id)}>
              {todo.status === 'not completed' ? 'Mark Completed' : 'Mark Not Completed'}
            </button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
