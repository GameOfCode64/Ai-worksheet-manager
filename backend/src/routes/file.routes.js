import express from "express";
import { upload } from "../middleware/upload.middleware.js";
import {
  uploadWorkFile,
  getAllFiles,
  getFileWithRows,
  getPaginatedRows,
  updateRow,
} from "../controllers/file.controller.js";
import { verifyToken, adminOnly } from "../middleware/auth.middleware.js";

const router = express.Router();

/*------------------------------------------
   ADMIN: Upload CSV/XLSX File
-------------------------------------------*/
router.post(
  "/upload",
  verifyToken,
  adminOnly,
  upload.single("file"),
  uploadWorkFile
);

/*------------------------------------------
   Fetch All Files (Admin + Employees)
-------------------------------------------*/
router.get("/", verifyToken, getAllFiles);

/*------------------------------------------
   Fetch Single File + All Rows
-------------------------------------------*/
router.get("/:fileId", verifyToken, getFileWithRows);

/*------------------------------------------
   Paginated Rows for Big Files
   /files/:fileId/paginated?page=1&limit=20
-------------------------------------------*/
router.get("/:fileId/paginated", verifyToken, getPaginatedRows);

/*------------------------------------------
   Update Specific Row (Employee Edit)
-------------------------------------------*/

router.put("/row/:rowId", verifyToken, updateRow);

export default router;
