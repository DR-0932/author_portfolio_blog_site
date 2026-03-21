// src/routes/public/blog.routes.ts
import { Router } from "express";
import { BlogModel } from "../../db.js";
const router = Router();
/*
  PUBLIC — GET ALL PUBLISHED BLOGS (Paginated + Optimized)
  GET /blog?page=1
*/
router.get("/", async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = 10;
        const skip = (page - 1) * limit;
        const blogs = await BlogModel
            .find({ published: true })
            .select("title slug createdAt views") // lightweight response
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
        res.json({
            page,
            blogs
        });
    }
    catch {
        res.status(500).json({
            message: "Error fetching blogs"
        });
    }
});
/*
  PUBLIC — GET SINGLE BLOG BY SLUG
  GET /blog/:slug
  (increments views)
*/
router.get("/:slug", async (req, res) => {
    try {
        const slug = req.params.slug.toLowerCase();
        const blog = await BlogModel.findOneAndUpdate({
            slug,
            published: true
        }, {
            $inc: { views: 1 }
        }, {
            returnDocument: "after"
        });
        if (!blog) {
            return res.status(404).json({
                message: "Blog not found"
            });
        }
        res.json({ blog });
    }
    catch {
        res.status(500).json({
            message: "Error fetching blog"
        });
    }
});
export default router;
//# sourceMappingURL=blog.routes.js.map