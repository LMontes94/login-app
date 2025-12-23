import db from "../db/connection.js";

export async function getTokensAdmins() {
    const [rows] = await db.query(`
    SELECT u.expo_push_token
    FROM usuarios u
    INNER JOIN usuarios_tipos ut
      ON u.id_usuario_tipo = ut.id_usuario_tipo
    WHERE ut.nombre = 'administrador'
      AND u.expo_push_token IS NOT NULL
      AND u.estado = 1
  `);

    return rows.map(r => r.expo_push_token);
}

