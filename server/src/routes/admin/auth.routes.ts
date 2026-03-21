import { Router } from "express";
import jwt from "jsonwebtoken";

const router = Router();

/*
  POST /admin/login
*/
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    const token = jwt.sign(
      { role: "admin" },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token
    });
  } catch (e) {
    res.status(500).json({
      message: "Login error"
    });
  }
});

export default router;
