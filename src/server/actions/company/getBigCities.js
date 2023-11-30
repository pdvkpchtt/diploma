"use server";

import { prisma } from "../../db";

export const getBigCities = async (cursor) => {
  const cities = await prisma.BigCity.findMany({
    select: {
      label: true,
    },
  });

  return cities;
};
