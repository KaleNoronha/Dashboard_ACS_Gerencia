import { Router } from "express";
import { search } from "../services/elasticService.js";

const router = Router();

// /api/es/ssm → índice ssm_transactions_new
router.post("/ssm", async (req, res) => {
  try {
    const hits = await search(req.body, "/ssm_transactions_new/_search");
    res.json(hits);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// /api/es/scm → índice scm_transactions
router.post("/scm", async (req, res) => {
  try {
    const hits = await search(req.body, "/scm_transactions/_search");
    res.json(hits);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
