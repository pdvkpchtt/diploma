"use server";

import { prisma } from "../../db";

export const deleteTest = async (id) => {
  console.log(id);
  const post = await prisma.Test.delete({
    where: {
      id: id,
    },
  });
};
