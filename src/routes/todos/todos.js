const express = require("express");
const todosQueries = require("./todos.query");
const authenticateToken = require("../../middleware/auth");

const router = express.Router();

// View all the todos
router.get("/todo", authenticateToken, (req, res) => {
    todosQueries.getAllTodo(req, res);
});

// View the todo
router.get("/todo/:id", authenticateToken, (req, res) => {
    todosQueries.getTodoById(req, res);
});

// Create a todo
router.post("/todo", authenticateToken, (req, res) => {
    todosQueries.createTodo(req, res);
});

// Update a todo
router.put("/todo/:id", authenticateToken, (req, res) => {
    todosQueries.updateTodoById(req, res);
});

// Delete a todo
router.delete("/todo/:id", authenticateToken, (req, res) => {
    todosQueries.deleteTodoById(req, res);
});

module.exports = router;