import { Router } from "express";
import { WorkSampleModel } from "../../db.js";
import { adminMiddleware } from "../../middleware/admin.middleware.js";
const router = Router();
router.get("/", adminMiddleware, async (_req, res) => {
    const samples = await WorkSampleModel.find().sort({ createdAt: -1 });
    res.json({ samples });
});
router.post("/", adminMiddleware, async (req, res) => {
    const { title, text, image } = req.body;
    if (!title || !text)
        return res.status(400).json({ message: "title and text are required" });
    const sample = await WorkSampleModel.create({ title, text, image });
    res.status(201).json({ sample });
});
router.put("/:id", adminMiddleware, async (req, res) => {
    const sample = await WorkSampleModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!sample)
        return res.status(404).json({ message: "Not found" });
    res.json({ sample });
});
router.delete("/:id", adminMiddleware, async (req, res) => {
    await WorkSampleModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
});
export default router;
//# sourceMappingURL=workSample.routes.js.map