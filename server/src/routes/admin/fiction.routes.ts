import { Router } from "express";
import { FictionModel } from "../../db.js";
import { adminMiddleware } from "../../middleware/admin.middleware.js";

const router = Router();

/*
  ADMIN — GET ALL FICTION
  GET /admin/fiction
*/
router.get("/", adminMiddleware, async (_req, res) => {
  try {
    const fictionList = await FictionModel.find().sort({ createdAt: -1 });
    res.json({ fiction: fictionList });
  } catch (e) {
    res.status(500).json({ message: "Error fetching fiction" });
  }
});

/*
  ADMIN — CREATE FICTION
  POST /admin/fiction
*/
router.post("/", adminMiddleware, async (req, res) => {
  try {
    const { title, slug, chapters, published } = req.body;

    if (!title || !slug) {
      return res.status(400).json({
        message: "title and slug are required"
      });
    }

    const existing = await FictionModel.findOne({ slug });
    if (existing) {
      return res.status(400).json({
        message: "Slug already exists"
      });
    }

    const fiction = await FictionModel.create({
      title,
      slug,
      chapters: chapters ?? [],
      published
    });

    res.status(201).json({
      message: "Fiction created successfully",
      fiction
    });
  } catch (e) {
    res.status(500).json({
      message: "Error creating fiction"
    });
  }
});

/*
  ADMIN — UPDATE FICTION
  PUT /admin/fiction/:id
*/
router.put("/:id",adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, slug, chapters, published } = req.body;

    const updatedFiction = await FictionModel.findByIdAndUpdate(
      id,
      { title, slug, chapters, published },
      {
        returnDocument: "after",
        runValidators: true
      }
    );

    if (!updatedFiction) {
      return res.status(404).json({
        message: "Fiction not found"
      });
    }

    res.json({
      message: "Fiction updated successfully",
      fiction: updatedFiction
    });
  } catch (e) {
    res.status(500).json({
      message: "Error updating fiction"
    });
  }
});

/*
  ADMIN — DELETE FICTION
  DELETE /admin/fiction/:id
*/
router.delete("/:id",adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const deletedFiction = await FictionModel.findByIdAndDelete(id);

    if (!deletedFiction) {
      return res.status(404).json({
        message: "Fiction not found"
      });
    }

    res.json({
      message: "Fiction deleted successfully"
    });
  } catch (e) {
    res.status(500).json({
      message: "Error deleting fiction"
    });
  }
});

export default router;
