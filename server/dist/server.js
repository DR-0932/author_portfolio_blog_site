import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./db.js";
import authAdminRouter from "./routes/admin/auth.routes.js";
import blogAdminRouter from "./routes/admin/blog.routes.js";
import fictionAdminRouter from "./routes/admin/fiction.routes.js";
import workSampleAdminRouter from "./routes/admin/workSample.routes.js";
import uploadAdminRouter from "./routes/admin/upload.routes.js";
import publicBlogRouter from "./routes/public/blog.routes.js";
import publicFictionRouter from "./routes/public/fiction.routes.js";
import publicWorkSampleRouter from "./routes/public/workSample.routes.js";
import contactRouter from "./routes/public/contact.routes.js";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const allowedOrigins = [
    "http://localhost:3000",
    process.env.FRONTEND_URL,
].filter(Boolean);
app.use(cors({ origin: allowedOrigins }));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
connectDB();
/* ================= ROUTES ================= */
app.use("/admin/auth", authAdminRouter);
app.use("/admin/upload", uploadAdminRouter);
app.use("/admin/blog", blogAdminRouter);
app.use("/admin/fiction", fictionAdminRouter);
app.use("/admin/sample", workSampleAdminRouter);
app.use("/blog", publicBlogRouter);
app.use("/fiction", publicFictionRouter);
app.use("/sample", publicWorkSampleRouter);
app.use("/contact", contactRouter);
/* ================= SERVER ================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`running on port:${PORT}`);
});
//# sourceMappingURL=server.js.map