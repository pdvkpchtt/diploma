"use server";

import { prisma } from "../../db";

export const getEducationLevel = async () => {
  const educationLevel = await prisma.EducationLevel.findMany({
    select: { id: true, label: true },
  });

  return educationLevel;
};
