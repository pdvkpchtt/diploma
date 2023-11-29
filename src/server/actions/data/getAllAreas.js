import { prisma } from "../../db";

export const getAllAreas = async () => {
  const areas = await prisma.Area.findMany({
    select: {
      id: true,
      label: true,
    },
  });

  return areas;
};
