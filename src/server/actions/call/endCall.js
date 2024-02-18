"use server";

import { prisma } from "../../db";

export const endCall = async (id) => {
  const data = await prisma.Meeting.update({
    where: { id: id },
    data: {
      endedAt: new Date(),
    },
  });
};
