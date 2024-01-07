"use server";

import { prisma } from "../../db";

export const deleteVacancy = async (id) => {
  console.log(id);
  const post = await prisma.Vacancy.delete({
    where: {
      id: id,
    },
  });
};
