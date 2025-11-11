import express from "express";
import session from "express-session";
import passport from "passport";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();

// 🔹 Middlewares
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// 🔹 Routes
app.use("/auth", authRoutes);

// 🔹 Default Route
app.get("/", (req, res) => {
  res.send("✅ Auth API is running...");
});

// 🔹 Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
