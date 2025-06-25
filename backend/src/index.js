import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import esRoute from "./routes/es.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('✅ Backend activo y listo 🚀');
});
app.get('/status', (req, res) => {
  res.json({ ok: true, message: 'API Elasticsearch corriendo correctamente' });
});

app.use("/api/es", esRoute);

app.get('/api/es/ssm', (req, res) => {
  res.status(405).json({ error: "Método no permitido. Usa POST." });
});
app.get('/api/es/scm', (req, res) => {
  res.status(405).json({ error: "Método no permitido. Usa POST." });
});

// Middleware para rutas no encontradas (opcional pero recomendado)
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// Middleware de errores global (opcional pero recomendado)
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message || "Error interno del servidor" });
});

const port = process.env.PORT ;
app.listen(port, () => {
  console.log(`⚡️ Backend escuchando en ${port}`);
});
