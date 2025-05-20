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
    await sql.connect(config);

    const result = await sql.query(`
      exec usp_Transacciones
    `);

    res.json(result.recordset);
  } catch (err) {
    console.error("Error al obtener datos:", err);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

app.get("/api/bins", async (req, res) => {
  try {
    await sql.connect(config);

    const result = await sql.query(`
      exec usp_bines
    `);

    res.json(result.recordset);
  } catch (err) {
    console.error("Error al obtener datos:", err);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

app.get('/api/transacciones-por-bin', async (req, res) => {
  
  const {
    bin     = '',    // p.ej. '100030'
    tranx   = '',    // p.ej. 'TX3001'
    top_bin = '0'    // '1' o '0'
  } = req.query;

  try {
    // 2) Conectamos y obtenemos el pool
    const pool = await sql.connect(config);

    // 3) Creamos la request y le pasamos los inputs
    const request = pool.request();
    request.input('bin',     sql.Char(6),     bin);
    request.input('trax',    sql.VarChar(10), tranx);
    request.input('top_bin', sql.Bit,         top_bin === '1');

    // 4) Ejecutamos el SP
    const result = await request.execute('usp_transac_acquirer_filtro');

    // 5) Devolvemos el recordset al cliente
    res.json(result.recordset);
  } catch (err) {
    console.error('Error en /api/transacciones-por-bin:', err);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

app.get("/api/total_trans", async (req, res) => {
  try {
    await sql.connect(config);

    const result = await sql.query(`
      exec usp_total_transaction
    `);

    res.json(result.recordset);
  } catch (err) {
    console.error("Error /api/total_trans", err);
    res.status(500).json({ error: "Error en el servidor" });
  }
});
app.get("/api/transacciones", async (req, res) => {
  try {
    await sql.connect(config); // Conexión a SQL Server

    const result = await sql.query("exec usp_en_jul_2024");
    res.json(result.recordset); // Envía los datos al frontend como JSON
  } catch (err) {
    console.error("Error /api/transacciones", err);
    res.status(500).json({ error: "Error en el servidor" });
  }
});
app.get('/api/search-transacciones', async (req, res) => {
  const { q = '', offset = 0, limit = 50 } = req.query;
  try {
    // Conectar y obtener el pool
    const pool = await sql.connect(config);

    // Crear la request a partir del pool
    const request = pool.request();
    request.input('prefijo', sql.VarChar(10), q);
    request.input('offset',  sql.Int,        parseInt(offset, 10));
    request.input('limit',   sql.Int,        parseInt(limit, 10));

    // Ejecutar el SP
    const result = await request.execute('usp_nro_transaccion');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error en /api/search-transacciones:', err);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// ▶️ INICIAR EL SERVIDOR
app.listen(PORT, () => {
  console.log(`Servidor backend activo en http://localhost:${PORT}`);
});
