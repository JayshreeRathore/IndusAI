import React, { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');
  const [date, setDate] = useState(''); // State for storing user input date
  const [time, setTime] = useState(''); // State for storing user input time
  const [isEditing, setIsEditing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

  const addTodo = () => {
    if (task.trim() && date.trim() && time.trim()) {
      if (isEditing) {
        // Update existing todo
        const updatedTodos = [...todos];
        updatedTodos[currentIndex].text = task;
        updatedTodos[currentIndex].date = date;
        updatedTodos[currentIndex].time = time;
        setTodos(updatedTodos);
        setIsEditing(false);
        setCurrentIndex(null);
      } else {
        // Add new todo
        setTodos([...todos, { text: task, completed: false, date: date, time: time }]);
      }
      setTask('');
      setDate('');
      setTime('');
    }
  };

  const editTodo = (index) => {
    setTask(todos[index].text);
    setDate(todos[index].date);
    setTime(todos[index].time);
    setIsEditing(true);
    setCurrentIndex(index);
  };

  const toggleTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <div className="input-container">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Task description"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="Date"
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          placeholder="Time"
        />
      </div>
      <button className="add-btn" onClick={addTodo}>
        {isEditing ? 'Update' : 'Add'}
      </button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index} className={todo.completed ? 'completed' : ''}>
            {todo.text} <small>({todo.date} {todo.time})</small>
            <div className="todo-actions">
              <button className="complete-btn" onClick={() => toggleTodo(index)}>
                {todo.completed ? 'Undo' : 'Complete'}
              </button>
              <button className="edit-btn" onClick={() => editTodo(index)}>
                Edit
              </button>
              <button className="delete-btn" onClick={() => deleteTodo(index)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
