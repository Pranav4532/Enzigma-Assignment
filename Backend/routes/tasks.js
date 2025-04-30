const express = require('express');
const router = express.Router();
const db = require('../db');
const cors = require('cors');
router.use(cors());

router.get('/tasks', (req, res) => {
  const { search = '' } = req.query;
  const query = 'SELECT * FROM tasks WHERE assigned_to LIKE ?';
  db.query(query, [`%${search}%`], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

router.post('/task', (req, res) => {
  const { assigned_to, status, due_date, priority, description } = req.body;
  const query = 'INSERT INTO tasks (assigned_to, status, due_date, priority, description) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [assigned_to, status, due_date, priority, description], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId, ...req.body });
  });
});

router.put('/task/:id', (req, res) => {
  const { id } = req.params;
  const { assigned_to, status, due_date, priority, description } = req.body;
  const query = 'UPDATE tasks SET assigned_to=?, status=?, due_date=?, priority=?, description=? WHERE id=?';
  db.query(query, [assigned_to, status, due_date, priority, description, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id, ...req.body });
  });
});

router.delete('/task/:id', (req, res) => {
  db.query('DELETE FROM tasks WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Task deleted successfully', id: req.params.id });
  });
});

module.exports = router;
