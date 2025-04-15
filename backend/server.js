const express = require("express");
const cors = require("cors");
const sql = require("mssql"); // Cliente SQL Server

const app = express();
const PORT = 3001;

app.use(cors()); // Permite conexión desde tu frontend (React)

// 🔧 CONFIGURACIÓN DE LA CONEXIÓN A SQL SERVER
const config = {
  user: "sa",
  password: "Alignet2025",
  server: "localhost",
  database: "Negocios",
  options: {
    encrypt: false, // Para conexión local
    trustServerCertificate: true, // Evita errores de certificado
  },
};

// 🚀 RUTA QUE OBTIENE DATOS DE LA TABLA
app.get("/api/tabla", async (req, res) => {
  try {
    await sql.connect(config); // Conexión a SQL Server

    const result = await sql.query(`
      Select * from Ventas.Transacciones
    `);

    res.json(result.recordset); // Envía los datos al frontend como JSON
  } catch (err) {
    console.error("Error al obtener datos:", err);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// ▶️ INICIAR EL SERVIDOR
app.listen(PORT, () => {
  console.log(`Servidor backend activo en http://localhost:${PORT}`);
});
