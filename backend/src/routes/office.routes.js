import express from "express";
import { updateOfficeHours } from "../controllers/office.controller.js";
import { authMiddleware, adminOnly } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/update", authMiddleware, adminOnly, updateOfficeHours);

export default router;
