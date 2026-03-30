import { Router } from "express";
import type { Request, Response } from "express";
import multer from "multer";
import path from "path";
import { adminMiddleware } from "../../middleware/admin.middleware.js";

const router = Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Only image files are allowed"));
  },
});

router.post("/", adminMiddleware, upload.single("image"), (req: Request, res: Response) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });
  const url = `${process.env.BACKEND_URL || "http://localhost:5000"}/uploads/${req.file.filename}`;
  res.json({ url });
});

export default router;
