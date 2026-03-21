import { Router } from "express";
import { WorkSampleModel } from "../../db.js";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const samples = await WorkSampleModel.find().sort({ createdAt: -1 });
    res.json({ samples });
  } catch {
    res.status(500).json({ message: "Error fetching samples" });
  }
});

export default router;
