import express from "express";
import passport from "passport";
import "../config/passport.js";
import {
  registerUser,
  loginUser,
  googleCallback,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

// 🔹 Manual Auth
router.post("/signup", registerUser);
router.post("/login", loginUser);

// 🔹 Protected Route Example
router.get("/profile", verifyToken, (req, res) => {
  res.json({ message: "Welcome to your profile!", user: req.user });
});

// 🔹 Google OAuth Routes
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/failure" }),
  googleCallback
);

router.get("/failure", (req, res) => {
  res.status(401).json({ message: "Google Authentication Failed" });
});

export default router;
