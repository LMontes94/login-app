const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Token no enviado" });
    }

    const token = authHeader.split(" ")[1]; // "Bearer token"

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // guardamos info del usuario
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token inválido o expirado" });
    }
};

module.exports = authMiddleware;
