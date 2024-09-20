const connection = require('../config/db');

exports.getTodos = (req, res) => {
  const { status, priority, category, search_q } = req.query;
  let query = 'SELECT * FROM todo WHERE 1=1';

  if (status) query += ` AND status = '${status}'`;
  if (priority) query += ` AND priority = '${priority}'`;
  if (category) query += ` AND category = '${category}'`;
  if (search_q) query += ` AND todo LIKE '%${search_q}%'`;

  connection.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.getTodoById = (req, res) => {
  const { todoId } = req.params;
  connection.query('SELECT * FROM todo WHERE id = ?', [todoId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0]);
  });
};

exports.createTodo = (req, res) => {
  const { id, todo, priority, status, category, dueDate } = req.body;
  const query = 'INSERT INTO todo (id, todo, priority, status, category, due_date) VALUES (?, ?, ?, ?, ?, ?)';
  connection.query(query, [id, todo, priority, status, category, dueDate], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Todo Successfully Added' });
  });
};

exports.updateTodo = (req, res) => {
  const { todoId } = req.params;
  const updates = req.body;
  let query = 'UPDATE todo SET ';
  let values = [];

  for (const [key, value] of Object.entries(updates)) {
    query += `${key} = ?, `;
    values.push(value);
  }

  query = query.slice(0, -2) + ' WHERE id = ?';
  values.push(todoId);

  connection.query(query, values, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Todo Updated' });
  });
};

exports.deleteTodo = (req, res) => {
  const { todoId } = req.params;
  connection.query('DELETE FROM todo WHERE id = ?', [todoId], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Todo Deleted' });
  });
};
