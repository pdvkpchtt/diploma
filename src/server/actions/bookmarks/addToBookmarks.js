"use server";

import { getServSession } from "../../../app/api/auth/[...nextauth]/route";
import { prisma } from "../../db";

export const addToBookmarks = async (vacancyId) => {
  const session = await getServSession();

  const foundBookmark = await prisma.bookmarks.findFirst({
    where: { AND: [{ userId: session.user.id }, { vacancyId: vacancyId }] },
  });

  if (foundBookmark) {
    console.log("its to late");
    return 0;
  }

  const bookmark = await prisma.bookmarks.create({
    data: {
      createdAt: new Date(),
      user: {
        connect: {
          id: session.user.id,
        },
      },
      vacancy: {
        connect: {
          id: vacancyId,
        },
      },
    },
  });

  return bookmark;
};
