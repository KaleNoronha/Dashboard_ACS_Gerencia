import { Router } from "express";
import { search } from "../services/elasticService.js";

const router = Router();

// /api/es/ssm → índice ssm_transactions_new
router.post("/ssm", async (req, res) => {
  try {
    console.log("POST /ssm body:", req.body); // LOG para saber si llega la petición
    const hits = await search(req.body, "/ssm_transactions_new/_search");
    console.log("Resultado de search:", hits); // LOG para ver si search retorna algo
    res.json(hits || { empty: true });
  } catch (e) {
    console.error("Error en /ssm:", e);
    res.status(500).json({ error: e.message });
  }
});

router.post("/scm", async (req, res) => {
  try {
    console.log("POST /scm body:", req.body);
    const hits = await search(req.body, "/scm_transactions/_search");
    console.log("Resultado de search:", hits);
    res.json(hits || { empty: true });
  } catch (e) {
    console.error("Error en /scm:", e);
    res.status(500).json({ error: e.message });
  }
});


export default router;
