import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// 🔹 Verify JWT Token (Main Auth Middleware)
export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Access Denied: No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // id, email, role
    next();
  } catch (error) {
    console.error("JWT Error:", error);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

// 🔹 Allow Only Admin
export const adminOnly = (req, res, next) => {
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
};
