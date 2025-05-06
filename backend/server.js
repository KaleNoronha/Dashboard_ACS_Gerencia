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

app.get("/api/comerciosnombre",async(req,res)=>{
  try {
    await sql.connect(config);
    let bin = req.query.bin || ''; 
    let trax=req.query.trax || '';
    let top_bin=req.query.top_bin || '';
    const result = await sql.query`
      exec usp_transac_acquirer_filtro @bin = ${bin}, @trax=${trax},@top_bin=${top_bin}`;;
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
