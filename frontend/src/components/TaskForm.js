import React, { useState, useEffect } from 'react';

function TaskForm({ task, onSave }) {
  const [form, setForm] = useState({
    assigned_to: '',
    status: 'Not Started',
    due_date: '',
    priority: 'Normal',
    description: ''
  });

  useEffect(() => {
    if (task) setForm(task);
    else setForm({ assigned_to: '', status: 'Not Started', due_date: '', priority: 'Normal', description: '' });
  }, [task]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input name="assigned_to" placeholder="Assigned To" value={form.assigned_to} onChange={handleChange} required />
      <input name="due_date" type="date" value={form.due_date} onChange={handleChange} required />
      <select name="status" value={form.status} onChange={handleChange}>
        <option>Not Started</option>
        <option>In Progress</option>
        <option>Completed</option>
      </select>
      <select name="priority" value={form.priority} onChange={handleChange}>
        <option>Low</option>
        <option>Normal</option>
        <option>High</option>
      </select>
      <input name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
      <button type="submit">{form.id ? 'Update' : 'Add'} Task</button>
    </form>
  );
}

export default TaskForm;
