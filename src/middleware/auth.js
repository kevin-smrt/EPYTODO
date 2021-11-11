// Récupère les variables du fichier .env
require("dotenv").config();
// Récupère le module JWT
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    // Récupère le token
    const token = process.env.TOKEN;

    // Si il n'y a pas de token
    if (!token) {
        // Retourne un code d'erreur et le code s'arrête la
        console.error("No token, authorization denied.");
        return res.status(401).send("No token, authorization denied.");
    }

    // Vérifie si le token récupéré est le bon grace à la variable avec laquelle le token est hash
    jwt.verify(token, process.env.SECRET, (err, user) => {
        if (err) {
            console.error("Authorization denied")
            return res.status(403).send("Authorization denied");
        }
        req.user = user;
        next();
    });

}

module.exports = authenticateToken;