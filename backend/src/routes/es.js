import { Router } from "express";
import { search } from "../services/elasticService.js";

const router = Router();

// /api/es/ssm → índice ssm_transactions_new
router.post("/ssm", async (req, res) => {
  try {
    const hits = await search(req.body, "/ssm_transactions_new/_search");
    if (!hits) {
      res.status(204).json({ error: "Sin contenido (No Content)" }); // 204: No Content, pero igual das JSON
    } else {
      res.json(hits);
    }
    console.log("Respuesta de search:", hits);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// /api/es/scm → índice scm_transactions
router.post("/scm", async (req, res) => {
  try {
    const hits = await search(req.body, "/scm_transactions/_search");
    if (!hits) {
      res.status(204).json({ error: "Sin contenido (No Content)" }); // 204: No Content, pero igual das JSON
    } else {
      res.json(hits);
    }
    console.log("Respuesta de search:", hits); // Nunca responde vacío
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
