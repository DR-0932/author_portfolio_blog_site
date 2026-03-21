import { Router } from "express";
import { BlogModel } from "../../db.js";
import { adminMiddleware } from "../../middleware/admin.middleware.js";
const router = Router();
/*
  ADMIN — GET ALL BLOGS
  GET /admin/blog
*/
router.get("/", adminMiddleware, async (_req, res) => {
    try {
        const blogs = await BlogModel.find().sort({ createdAt: -1 });
        res.json({ blogs });
    }
    catch (e) {
        res.status(500).json({ message: "Error fetching blogs" });
    }
});
/*
  ADMIN — CREATE BLOG
  POST /admin/blog
*/
router.post("/", adminMiddleware, async (req, res) => {
    try {
        const { title, slug, content, published } = req.body;
        if (!title || !slug || !content) {
            return res.status(400).json({
                message: "title, slug and content are required"
            });
        }
        const existing = await BlogModel.findOne({ slug });
        if (existing) {
            return res.status(400).json({
                message: "Slug already exists"
            });
        }
        const blog = await BlogModel.create({
            title,
            slug,
            content,
            published
        });
        res.status(201).json({
            message: "Blog created",
            blog
        });
    }
    catch (e) {
        res.status(500).json({ message: "Error creating blog" });
    }
});
/*
  ADMIN — UPDATE BLOG
  PUT /admin/blog/:id
*/
router.put("/:id", adminMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const { title, slug, content, published } = req.body;
        const updatedBlog = await BlogModel.findByIdAndUpdate(id, { title, slug, content, published }, {
            returnDocument: "after",
            runValidators: true
        });
        if (!updatedBlog) {
            return res.status(404).json({
                message: "Blog not found"
            });
        }
        res.json({
            message: "Blog updated successfully",
            blog: updatedBlog
        });
    }
    catch (e) {
        res.status(500).json({
            message: "Error updating blog"
        });
    }
});
/*
  ADMIN — DELETE BLOG
  DELETE /admin/blog/:id
*/
router.delete("/:id", adminMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBlog = await BlogModel.findByIdAndDelete(id);
        if (!deletedBlog) {
            return res.status(404).json({
                message: "Blog not found"
            });
        }
        res.json({
            message: "Blog deleted successfully"
        });
    }
    catch (e) {
        res.status(500).json({
            message: "Error deleting blog"
        });
    }
});
export default router;
//# sourceMappingURL=blog.routes.js.map