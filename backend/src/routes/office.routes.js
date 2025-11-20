import express from "express";
import { updateOfficeHours } from "../controllers/office.controller.js";
import { verifyToken, adminOnly } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/update", verifyToken, adminOnly, updateOfficeHours);

export default router;
