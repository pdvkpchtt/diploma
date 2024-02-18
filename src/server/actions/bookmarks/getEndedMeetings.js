"use server";

import { prisma } from "../../db";

export const getEndedMeetings = async (id, status) => {
  if (status === true) {
    const data = await prisma.Meeting.findMany({
      where: { AND: [{ hrCreator: id }, { endedAt: { not: null } }] },
      select: {
        id: true,
        name: true,
        creator: {
          select: {
            id: true,
            name: true,
            image: true,
            username: true,
            HR: { select: { id: true, user: true, userId: true } },
          },
        },
        endedAt: true,
        student: true,
        studentId: true,
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
    };
  } else {
    const data = await prisma.Meeting.findMany({
      where: { AND: [{ studentId: id }, { endedAt: { not: null } }] },
      select: {
        id: true,
        name: true,
        creator: {
          select: {
            id: true,
            name: true,
            image: true,
            username: true,
            HR: { select: { id: true, user: true, userId: true } },
          },
        },
        endedAt: true,
        student: true,
        studentId: true,
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
    };
  }
};
