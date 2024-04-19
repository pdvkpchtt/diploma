"use server";

import { prisma } from "../../db";

export const getMessages = async (id) => {
  const result = await prisma.Message.findMany({
    where: { meetingId: id },
    select: {
      id: true,
      text: true,
      type: true,
      Test: true,
    },
  });

  return result;
};
