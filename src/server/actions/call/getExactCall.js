"use server";

import { prisma } from "../../db";

export const getExactCall = async (id) => {
  const data = await prisma.Meeting.findUnique({
    where: { id: id },
    select: {
      id: true,
      name: true,
      creator: true,
      student: true,
      hrCreator: true,
      createdAt: true,
      Vacancy: {
        select: {
          name: true,
          VacTests: {
            select: {
              Test: {
                select: {
                  id: true,
                  type: true,
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
              },
            },
          },
        },
      },
    },
  });

  return {
    data: data,
    vacancy: data.Vacancy,
  };
};
