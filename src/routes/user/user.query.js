// Récupère les variables du fichier .env
require("dotenv").config();

const db = require("../../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userQueries = {
    checkIfUserExists: (req, res, next) => {
        const email = req.body.email;
        const query = "SELECT * FROM user WHERE email = ?";

        db.query(query, email, function (err, results) {
            if (err) {
                console.error(err);
                return res.status(500).send(err);
            } else if (results.length) {
                console.error("Account already exists.");
                return res.status(403).json({"msg": "Account already exists."});
            } else {
                next();
            }
        });
    },

    registerUser: (req, res) => {
        const { email, password, name, firstname } = req.body;
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const values = [email, hash, name, firstname];
        const query = "INSERT INTO user (email, password, name, firstname) VALUES (?, ?, ?, ?)";

        db.query(query, values, function (err, results) {
            if (err) {
                console.error(err);
                return res.status(500).send(err);
            } else {
                const user = { email, hash, name, firstname };
                jwt.sign({user}, process.env.SECRET, (error, token) => {
                    if (error) {
                        console.error(error);
                        return res.status(500).send(error);
                    }
                    process.env.TOKEN = token;
                    return res.status(200).json(token);
                })
            }
        });
    },

    loginUser: (req, res) => {
        const { email, password } = req.body;
        const query = "SELECT * FROM user WHERE email = ?";

        db.query(query, email, function (err, results) {
            if (err) {
                console.log(err);
                return res.status(500).json(err);
            } else if (!results.length) {
                return res.status(500).json({"msg": "Invalid Credentials"});
            } else {
                const hash = results[0].password;
                const isSamePassword = bcrypt.compareSync(password, hash);

                if (isSamePassword) {
                    const user = results[0];
                    jwt.sign({ user }, process.env.SECRET, (error, token) => {
                        if (error) {
                            console.error(error);
                            return res.status(500).send(error);
                        }
                        process.env.TOKEN = token;
                        return res.status(200).json({token});
                    })
                }
            }
        });

    },

    getAllUsers: (req, res) => {
        db.query(
            "SELECT * FROM user",
            function (err, results) {
                if (err) {
                    console.log(err);
                    return res.status(500).json(err);
                }
                return res.status(200).json(results);
            }
        )
    },

    getAllUserTodos: (req, res) => {
        const userId = req.user.user.id;
        const query = "SELECT * FROM todo WHERE user_id = ?";

        db.query(query, userId, function (err, results) {
            if (err) {
                console.log(err);
                return res.status(500).json(err);
            }
            return res.status(200).json(results);
        });
    },

    getUserInfo: (req, res) => {
        const userEmail = req.user.user.email;
        const query = "SELECT * FROM user WHERE email = ?";

        db.query(query, userEmail, function (err, results) {
            if (err) {
                console.log(err);
                return res.status(500).json(err);
            }
            return res.status(200).json(results);
        });
    },

    updateUserById: (req, res) => {
        const userId = req.params.id;
        const newName = req.body.name;
        const query = `UPDATE user SET name = '${newName}' WHERE id = ${userId}`;

        db.query(query, function (err, results) {
            if (err) {
                console.error(err);
                return res.status(500).json(err);
            }
            return res.status(200).json(results);
        });
    },

    deleteUser: (req, res) => {
        const userId = req.params.id;
        const query = "DELETE FROM user WHERE id = ?";

        db.query(query, userId, function (err, results) {
            if (err) {
                console.log(err);
                return res.status(500).send(err);
            }
            return res.status(200).send(results);
        });
    },
}

module.exports = userQueries;