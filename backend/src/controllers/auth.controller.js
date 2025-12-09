const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../../config/db");

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Buscar usuario por email
        const [rows] = await pool.query(
            "SELECT * FROM usuarios WHERE email = ?",
            [email]
        );

        if (rows.length === 0) {
            return res.status(400).json({ message: "Usuario no encontrado" });
        }

        const user = rows[0];

        // Normalizar hash ($2y$ → $2a$ para bcryptjs)
        let hash = user.password;
        if (hash.startsWith("$2y$")) {
            hash = "$2a$" + hash.slice(4);
        }

        // Comparar contraseña
        const validPassword = await bcrypt.compare(password, hash);
        if (!validPassword) {
            return res.status(400).json({ message: "Contraseña incorrecta" });
        }

        // Generar token
        const token = jwt.sign(
            { id_usuario: user.id_usuario, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        // Respuesta
        res.json({
            message: "Login correcto",
            token,
            user: {
                id: user.id_usuario,
                nombre: user.nombre,
                apellido: user.apellido,
                email: user.email,
                tipo: user.id_usuario_tipo,
                estado: user.estado
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error en el login" });
    }
};

module.exports = { login };

