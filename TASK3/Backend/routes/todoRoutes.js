const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

router.get('/todos', todoController.getTodos);
router.get('/todos/:todoId', todoController.getTodoById);
router.post('/todos', todoController.createTodo);
router.put('/todos/:todoId', todoController.updateTodo);
router.delete('/todos/:todoId', todoController.deleteTodo);

module.exports = router;
