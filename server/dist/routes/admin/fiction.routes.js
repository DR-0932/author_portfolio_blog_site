import { Router } from "express";
import { FictionModel } from "../../db.js";
import { adminMiddleware } from "../../middleware/admin.middleware.js";
const router = Router();
/*
  ADMIN — CREATE FICTION
  POST /admin/fiction
*/
router.post("/", adminMiddleware, async (req, res) => {
    try {
        const { title, slug, content, published } = req.body;
        if (!title || !slug || !content) {
            return res.status(400).json({
                message: "title, slug and content are required"
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
            content,
            published
        });
        res.status(201).json({
            message: "Fiction created successfully",
            fiction
        });
    }
    catch (e) {
        res.status(500).json({
            message: "Error creating fiction"
        });
    }
});
/*
  ADMIN — UPDATE FICTION
  PUT /admin/fiction/:id
*/
router.put("/:id", adminMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const { title, slug, content, published } = req.body;
        const updatedFiction = await FictionModel.findByIdAndUpdate(id, { title, slug, content, published }, {
            returnDocument: "after",
            runValidators: true
        });
        if (!updatedFiction) {
            return res.status(404).json({
                message: "Fiction not found"
            });
        }
        res.json({
            message: "Fiction updated successfully",
            fiction: updatedFiction
        });
    }
    catch (e) {
        res.status(500).json({
            message: "Error updating fiction"
        });
    }
});
/*
  ADMIN — DELETE FICTION
  DELETE /admin/fiction/:id
*/
router.delete("/:id", adminMiddleware, async (req, res) => {
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
    }
    catch (e) {
        res.status(500).json({
            message: "Error deleting fiction"
        });
    }
});
export default router;
//# sourceMappingURL=fiction.routes.js.map