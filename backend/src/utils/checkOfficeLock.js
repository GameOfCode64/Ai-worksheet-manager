import prisma from "../prisma/client.js";

export const isOfficeClosed = async () => {
  const latest = await prisma.officeHours.findFirst({
    orderBy: { createdAt: "desc" },
  });

  if (!latest) return false;

  const now = new Date();
  const start = new Date(latest.officeStart);
  const end = new Date(latest.officeEnd);

  return !(now >= start && now <= end);
};
