import { Router } from "express";
import { FictionModel } from "../../db.js";

const router = Router();

/*
  PUBLIC — GET ALL PUBLISHED FICTION
  GET /fiction
*/
router.get("/", async (_req, res) => {
  try {
    const fictionList = await FictionModel
      .find({ published: true })
      .select("-__v")
      .sort({ createdAt: -1 });

    res.json({ fiction: fictionList });
  } catch (e) {
    res.status(500).json({
      message: "Error fetching fiction"
    });
  }
});

/*
  PUBLIC — GET SINGLE FICTION BY SLUG
  GET /fiction/:slug
*/
router.get("/:slug", async (req, res) => {
  try {
    const fiction = await FictionModel.findOne({
      slug: req.params.slug,
      published: true
    });

    if (!fiction) {
      return res.status(404).json({
        message: "Fiction not found"
      });
    }

    res.json({ fiction });
  } catch (e) {
    res.status(500).json({
      message: "Error fetching fiction"
    });
  }
});

export default router;
