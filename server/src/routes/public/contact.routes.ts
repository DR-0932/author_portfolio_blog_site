import { Router } from "express";
import { sendContactEmail } from "../../controllers/contact.controllers.js";

const router = Router();

router.post("/", sendContactEmail);

export default router;
