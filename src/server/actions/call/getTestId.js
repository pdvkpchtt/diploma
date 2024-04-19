"use server";

import { prisma } from "../../db";

export const getTestId = async (tsetId) => {
  const data = await prisma.Test.findUnique({
    where: { id: tsetId },
    select: {
      id: true,

      questions: {
        select: {
          id: true,
          text: true,
          answers: {
            select: { id: true, text: true, rightAnswer: true },
          },
        },
      },
    },
  });

  return data;
};
