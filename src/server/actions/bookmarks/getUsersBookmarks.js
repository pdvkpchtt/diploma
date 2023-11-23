"use server";

import { getServSession } from "../../../app/api/auth/[...nextauth]/route";
import { prisma } from "../../db";

export const getUsersBookmarks = async (userId, cursor) => {
  const session = await getServSession();

  const bookmarks = await prisma.bookmarks.findMany({
    take: 11,
    ...(cursor && cursor.length > 0 && { cursor: { id: cursor }, skip: 1 }),
    where: {
      userId: userId,
    },
    select: {
      id: true,
      user: true,
      vacancy: {
        select: {
          id: true,
          name: true,
          description: true,
          shortDescription: true,
          conditions: true,
          waitings: true,
          salaryStart: true,
          salaryEnd: true,
          format: {
            select: {
              id: true,
              label: true,
            },
          },
          hrCreator: {
            select: {
              user: {
                select: {
                  id: true,
                  username: true,
                  name: true,
                  image: true,
                },
              },
            },
          },
          contract: {
            select: {
              id: true,
              label: true,
            },
          },
          currency: {
            select: {
              id: true,
              label: true,
            },
          },
          experience: {
            select: {
              id: true,
              label: true,
            },
          },
          Company: {
            select: {
              id: true,
              userId: true,
              username: true,
              name: true,
              image: true,
              HR: { select: { userId: true } },
            },
          },
          Bookmarks: true,
        },
      },
    },
  });

  const hasNextPage = bookmarks.length > 10;
  let slicedPosts = bookmarks;
  if (bookmarks.length > 10) {
    slicedPosts = bookmarks.slice(0, -1);
  }

  const result = slicedPosts.map((item) => {
    item.vacancy.hrCreator = item?.vacancy?.hrCreator?.user;
    // const myReply = item.vacancy.VacancyReply.find(
    //   (i) => i.userId === session?.user?.id
    // );
    // item.vacancy.hasMyReply = myReply;
    item.vacancy.myVac = item.vacancy?.hrCreator?.id === session?.user?.id;
    item.vacancy.partOfTeam = item.vacancy?.Company?.HR?.find(
      (i) => i.userId === session?.user?.id
    );

    return item;
  });
  const lastPostInResults = result[result.length - 1];
  const newCursor = lastPostInResults?.id || "";
  return {
    data: result,
    hasNextPage: hasNextPage,
    cursor: newCursor,
  };
};
