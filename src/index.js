// Récupère les variables du fichier .env
require("dotenv").config();

const express = require("express");
const userRoutes = require("./routes/user/user");
const todoRoutes = require("./routes/todos/todos");
const notFound = require("./middleware/notFound");

const PORT = process.env.PORT || 3000;
const app = express();

// built-in middleware d'express, sert à récuperer les données envoyés depuis un formulaire (par exemple)
app.use(express.urlencoded({ extended: true }));

// Permet au serveur de communiquer au format JSON
app.use(express.json());

// ROUTES
app.use(userRoutes);
app.use(todoRoutes);

// Si aucune route n'est trouvée
app.use(notFound);

// Ecoute du serveur sur le port renseigné dans la variable PORT
app.listen(PORT, () => {
    console.log(`Server ready at http://localhost:${PORT}`);
});