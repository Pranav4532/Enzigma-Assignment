import React, { useState, useEffect } from 'react';
import TaskService from './components/TaskService';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const loadTasks = async () => {
    const res = await TaskService.getTasks();
    setTasks(res.data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleSave = async (task) => {
    if (task.id) {
      await TaskService.updateTask(task.id, task);
    } else {
      await TaskService.createTask(task);
    }
    setEditingTask(null);
    loadTasks();
  };

  const handleDelete = async (id) => {
    await TaskService.deleteTask(id);
    loadTasks();
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>To-Do List</h2>
      <TaskForm task={editingTask} onSave={handleSave} />
      <TaskList tasks={tasks} onEdit={setEditingTask} onDelete={handleDelete} />
    </div>
  );
}

export default App;
