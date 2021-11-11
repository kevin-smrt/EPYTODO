const db = require("../../config/db");

const todosQueries = {
    getAllTodo: (req, res) => {
        db.query(
            "SELECT * FROM todo",
            function (err, results) {
                if (err) {
                    console.log(err);
                    return res.status(500).json(err);
                }
                console.log(results);
                return res.status(200).json(results);
            }
        )
    },

    getTodoById: (req, res) => {
        const todoId = req.params.id;
        const query = "SELECT * FROM todo WHERE id = ?";

        db.query(query, todoId, function (err, results) {
            if (err) {
                console.error(err);
                return res.status(500).json(err);
            }
            return res.status(200).json(results);
        })
    },

    createTodo: (req, res) => {
        const { title, description, due_time, user_id, status } = req.body;
        const values = [title, description, due_time, user_id, status];
        const query = "INSERT INTO todo (title, description, due_time, user_id, status) VALUES (?, ?, ?, ?, ?)";

        db.query(query, values,
            function (err, results) {
                if (err) {
                    console.log(err);
                    return res.status(500).json(err);
                }
                console.log(results);
                return res.status(200).json(results);
            }
        )
    },

    updateTodoById: (req, res) => {
        const todoId = req.params.id;
        const newTitle = req.body.title;
        const query = `UPDATE todo SET title = '${newTitle}' WHERE id = ${todoId}`;

        db.query(query, function (err, results) {
            if (err) {
                console.error(err);
                return res.status(500).json(err);
            }
            return res.status(200).json(results);
        });
    },

    deleteTodoById: (req, res) => {
        const todoId = req.params.id;
        const query = "DELETE FROM todo WHERE id = ?";

        db.query(query, todoId, function (err, results) {
            if (err) {
                console.error(err);
                return res.status(500).json(err);
            }
            return res.status(200).json(results);
        })
    },
}

module.exports = todosQueries;