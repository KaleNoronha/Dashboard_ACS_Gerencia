import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connect } from "@ngrok/ngrok"; // 👈 Ngrok importado
import esRoute from "./routes/es.js";

dotenv.config();

const app = express();
const port = process.env.PORT ;

app.use(cors());
app.use(express.json());

// Rutas básicas
app.get('/', (req, res) => {
  res.send('✅ Backend activo y listo 🚀');
});
app.get('/status', (req, res) => {
  res.json({ ok: true, message: 'API Elasticsearch corriendo correctamente' });
});

// API Elasticsearch
app.use("/api/es", esRoute);

app.get('/api/es/ssm', (req, res) => {
  res.status(405).json({ error: "Método no permitido. Usa POST." });
});
app.get('/api/es/scm', (req, res) => {
  res.status(405).json({ error: "Método no permitido. Usa POST." });
});

// Middleware 404
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// Middleware de error
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message || "Error interno del servidor" });
});

// Iniciar servidor
app.listen(port, '0.0.0.0', async () => {
  console.log(`⚡️ Backend accesible localmente en http://localhost:${port}`);

  try {
    const listener = await connect({
      addr: port,
      authtoken: process.env.NGROK_AUTHTOKEN,
    });
    console.log(`🚀 Ngrok activo en: ${listener.url()}`);
  } catch (err) {
    console.error("❌ Error al iniciar Ngrok:", err.message);
  }
});
