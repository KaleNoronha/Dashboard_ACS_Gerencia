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
  res.send('Esta ruta solo acepta POST. Usa Postman o tu frontend para hacer POST.');
});


const port = process.env.PORT ;
app.listen(port, () => {
  console.log(`⚡️ Backend escuchando en ${port}`);
});
