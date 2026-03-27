import "dotenv/config";

import express from "express";
import cors from "cors";
import { connectDB } from "./db.js";
import authAdminRouter from "./routes/admin/auth.routes.js";
import blogAdminRouter from "./routes/admin/blog.routes.js";
import fictionAdminRouter from "./routes/admin/fiction.routes.js";
import workSampleAdminRouter from "./routes/admin/workSample.routes.js";
import publicBlogRouter from "./routes/public/blog.routes.js";
import publicFictionRouter from "./routes/public/fiction.routes.js";
import publicWorkSampleRouter from "./routes/public/workSample.routes.js";

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  process.env.FRONTEND_URL,
].filter(Boolean) as string[];

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

connectDB();

/* ================= ROUTES ================= */

app.use("/admin/auth", authAdminRouter);
app.use("/admin/blog", blogAdminRouter);
app.use("/admin/fiction", fictionAdminRouter);
app.use("/admin/sample", workSampleAdminRouter);
app.use("/blog", publicBlogRouter);
app.use("/fiction", publicFictionRouter);
app.use("/sample", publicWorkSampleRouter);

/* ================= SERVER ================= */

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`running on port:${PORT}`);
});