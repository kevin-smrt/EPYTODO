const express = require("express");
const userQueries = require("./user.query");
const authenticateToken = require("../../middleware/auth");

const router = express.Router();

// Register a new user
router.post("/register", userQueries.checkIfUserExists, (req, res) => {
    userQueries.registerUser(req, res);
});

// Connect a user
router.post("/login", (req, res) => {
    userQueries.loginUser(req, res);
});

// View all user informations
router.get("/user", authenticateToken, (req, res) => {
    userQueries.getAllUsers(req, res);
});

// View all user tasks
router.get("/user/todos", authenticateToken, (req, res) => {
    userQueries.getAllUserTodos(req, res);
});

// View user information
router.get("/user/:email", authenticateToken, (req, res) => {
    userQueries.getUserInfo(req, res);
});

// Update user information
router.put("/user/:id", (req, res) => {
    userQueries.updateUserById(req, res);
});

// Delete user
router.delete("/user/:id", (req, res) => {
    userQueries.deleteUser(req, res);
});

module.exports = router;