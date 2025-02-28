const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController'); // Ensure correct path

router.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    next();
});


router.post('/todos/', todoController.createTodo);
router.get('/todos', todoController.getTodos);
router.get('/todos/:id', todoController.getTodo);
router.put('/todos/:id', todoController.updateTodo);

router.delete('/todos/:id', todoController.deleteTodo );

module.exports = router;
