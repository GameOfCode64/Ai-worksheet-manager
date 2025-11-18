import fs from "fs";
import xlsx from "xlsx";
import csv from "csv-parser";
import prisma from "../config/prisma.js";
import { isOfficeClosed } from "../utils/checkOfficeLock.js";

// Save file info in DB
export const uploadFile = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ message: "File is required." });

    const filePath = req.file.path;
    const fileName = req.file.filename;

    // Save metadata in DB
    await prisma.workFile.create({
      data: {
        fileName: fileName,
        fileUrl: filePath,
        uploadedBy: req.user.id,
      },
    });

    res.json({
      message: "File uploaded successfully",
      fileName,
      filePath,
    });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ message: "Error uploading file" });
  }
};

// Parse CSV or XLSX into JSON
export const readFileData = async (req, res) => {
  try {
    const { fileId } = req.params;

    const file = await prisma.workFile.findUnique({
      where: { id: fileId },
    });

    if (!file) return res.status(404).json({ message: "File not found" });

    const filePath = file.fileUrl;

    const ext = file.fileName.split(".").pop();

    if (ext === "csv") {
      const rows = [];
      fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (data) => rows.push(data))
        .on("end", () => {
          res.json(rows);
        });
    } else {
      const workbook = xlsx.readFile(filePath);
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = xlsx.utils.sheet_to_json(sheet);
      res.json(jsonData);
    }
  } catch (error) {
    console.error("File Read Error:", error);
    res.status(500).json({ message: "Error reading file" });
  }
};

export const getAllFiles = async (req, res) => {
  try {
    const files = await prisma.workFile.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        uploadedByUser: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    return res.json({ files });
  } catch (error) {
    console.log("Fetch files error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getFileWithRows = async (req, res) => {
  try {
    const { fileId } = req.params;

    const file = await prisma.workFile.findUnique({
      where: { id: fileId },
      include: { uploadedByUser: true },
    });

    if (!file) return res.status(404).json({ message: "File not found" });

    const officeLock = await isOfficeClosed();

    const rows = await prisma.workFileRow.findMany({
      where: { fileId },
      orderBy: { createdAt: "asc" },
    });

    return res.json({ file, rows, officeLock });
  } catch (error) {
    console.log("Fetch file rows error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getPaginatedRows = async (req, res) => {
  try {
    const { fileId } = req.params;
    let { page = 1, limit = 20 } = req.query;

    page = Number(page);
    limit = Number(limit);

    const skip = (page - 1) * limit;

    const [rows, total] = await Promise.all([
      prisma.workFileRow.findMany({
        where: { fileId },
        skip,
        take: limit,
      }),
      prisma.workFileRow.count({ where: { fileId } }),
    ]);

    return res.json({
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
      rows,
    });
  } catch (error) {
    console.log("Pagination error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateRow = async (req, res) => {
  try {
    const { rowId } = req.params;
    const { data } = req.body; // updated row JSON

    const updated = await prisma.workFileRow.update({
      where: { id: rowId },
      data: { data },
    });

    return res.json({ message: "Row updated", updated });
  } catch (error) {
    console.log("Update row error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
