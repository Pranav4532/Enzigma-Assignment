import React from 'react';

function TaskList({ tasks, onEdit, onDelete }) {
  return (
    <table border="1" cellPadding="5">
      <thead>
        <tr>
          <th>Assigned To</th>
          <th>Status</th>
          <th>Due Date</th>
          <th>Priority</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.length === 0 && (
          <tr><td colSpan="6">No tasks available.</td></tr>
        )}
        {tasks.map(task => (
          <tr key={task.id}>
            <td>{task.assigned_to}</td>
            <td>{task.status}</td>
            <td>{task.due_date}</td>
            <td>{task.priority}</td>
            <td>{task.description}</td>
            <td>
              <button onClick={() => onEdit(task)}>Edit</button>
              <button onClick={() => onDelete(task.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TaskList;
