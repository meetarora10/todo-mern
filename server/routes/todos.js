const express = require('express');
const router = express.Router();
const { getTodos,createTodo,getTodo,updateTodo,deleteTodo } = require('../controllers/todos');
const restrictAccess = require('../middlewares/auth');
router.route('/').get(restrictAccess, getTodos).post( restrictAccess,createTodo);
router.route('/:id').get(restrictAccess,getTodo).patch(restrictAccess,updateTodo).delete(restrictAccess,deleteTodo);
module.exports = router;