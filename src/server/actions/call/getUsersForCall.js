"use server";

import { prisma } from "../../db";

export const getUsersForCall = async () => {
  const users = await prisma.user.findMany({
    where: { role: "student" },
    select: {
      id: true,
      name: true,
    },
  });

  return users;
};
