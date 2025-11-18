import prisma from "../prisma/client.js";

export const updateOfficeHours = async (req, res) => {
  try {
    const { officeStart, officeEnd } = req.body;

    if (!officeStart || !officeEnd) {
      return res.status(400).json({ message: "Both times required" });
    }

    const newEntry = await prisma.officeHours.create({
      data: {
        officeStart,
        officeEnd,
        createdById: req.user.id,
      },
    });

    return res.json({
      message: "Office hours updated successfully",
      data: newEntry,
    });
  } catch (error) {
    console.log("Office Hours Error:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};
