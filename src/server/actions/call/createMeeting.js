"use server";

import { getServSession } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "../../db";

export const createMeeting = async (data, id, compId, vacId) => {
  const session = await getServSession();

  const meeting = await prisma.Meeting.create({
    data: {
      id: id,
      name: data.name,
      hrCreator: session?.user?.id,
      creator: {
        connect: { id: compId },
      },
      student: {
        connect: {
          id: data.user.id,
        },
      },
      Vacancy: { connect: { id: vacId } },
    },
  });
};
