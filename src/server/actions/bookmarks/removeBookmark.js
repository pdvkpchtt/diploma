"use server";

import { getServSession } from "../../../app/api/auth/[...nextauth]/route";
import { prisma } from "../../db";

export const removeBookmark = async (vacancyId) => {
  const session = await getServSession();

  if (!session?.user?.id) {
    return;
  }

  const bookmark = await prisma.bookmarks.deleteMany({
    where: {
      AND: [
        {
          userId: { equals: session.user.id },
        },
        {
          vacancyId: { equals: vacancyId },
        },
      ],
    },
  });

  return bookmark;
};
