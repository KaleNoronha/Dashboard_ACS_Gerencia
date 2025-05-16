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
      exec usp_Transacciones
    `);

    res.json(result.recordset); // Envía los datos al frontend como JSON
  } catch (err) {
    console.error("Error al obtener datos:", err);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

app.get("/api/bins", async (req, res) => {
  try {
    await sql.connect(config); // Conexión a SQL Server

    const result = await sql.query(`
      exec usp_bines
    `);

    res.json(result.recordset); // Envía los datos al frontend como JSON
  } catch (err) {
    console.error("Error al obtener datos:", err);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

app.get('/api/transacciones-por-bin', async (req, res) => {
  const bin = req.query.bin || '';  // Si no pasa ?bin=, queda vacío
  const trax = req.query.trax || '';
  const top_bin = req.query.top_bin || '';
  try {
    // 1) Conectar
    await sql.connect(config);

    // 2) Preparar la petición y el parámetro
    const request = new sql.Request();
    request.input('bin', sql.Char(6), bin);
    request.input('trax', sql.VarChar(8), trax);
    request.input('top_bin', sql.Bit, top_bin);

    // 3) Ejecutar el SP
    const result = await request.execute('usp_transac_acquirer_filtro');

    // 4) Enviar los datos al cliente
    res.json(result.recordset);
  } catch (err) {
    console.error('Error en /api/transacciones-por-bin:', err);
    res.status(500).json({ error: 'Error al ejecutar el procedimiento' });
  }
});

app.get("/api/total_trans", async (req, res) => {
  try {
    await sql.connect(config); // Conexión a SQL Server

    const result = await sql.query(`
      exec usp_total_transaction
    `);

    res.json(result.recordset); // Envía los datos al frontend como JSON
  } catch (err) {
    console.error("Error al obtener datos:", err);
    res.status(500).json({ error: "Error en el servidor" });
  }
});
app.get("/api/transacciones", async (req, res) => {
  try {
    await sql.connect(config); // Conexión a SQL Server

    const result = await sql.query('exec usp_en_jul_2024');
    res.json(result.recordset); // Envía los datos al frontend como JSON
  } catch (err) {
    console.error("Error al obtener datos:", err);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

app.get("/api/comercios",async(req,res)=>{
  try {
    await sql.connect(config);
    const result = await sql.query`exec usp_transac_acquirer`;
    res.json(result.recordset);
  } catch (error) {
    console.error("error con la consulta",error);
    res.status(500).json({error:"Error en el servidor"});
  }
});

// ▶️ INICIAR EL SERVIDOR
app.listen(PORT, () => {
  console.log(`Servidor backend activo en http://localhost:${PORT}`);
});
