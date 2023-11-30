"use server";

import { getServSession } from "../../../app/api/auth/[...nextauth]/route";
import { prisma } from "../../db";

export const getRecruters = async (companyId, cursor, input) => {
  const session = await getServSession();

  const hrs = await prisma.Hr.findMany({
    take: 11,
    where:
      input?.length === 0
        ? { companyId: companyId, dataVerified: { not: null } }
        : {
            companyId: companyId,
            dataVerified: { not: null },
            user: { name: { contains: input, mode: "insensitive" } },
          },
    ...(cursor && cursor.length > 0 && { cursor: { id: cursor }, skip: 1 }),
    select: {
      dataVerified: true,
      user: {
        select: {
          id: true,
          name: true,
          image: true,
          username: true,
        },
      },
    },
  });

  const hasNextPage = hrs.length > 10;

  let slicedPosts = hrs;
  if (hrs.length > 10) {
    slicedPosts = hrs.slice(0, -1);
  }
  const result = slicedPosts.map((r) => {
    if (r.dataVerified !== null)
      return {
        name: r?.user?.name,
        image: r?.user?.image,
        id: r?.user?.id,
        username: r?.user?.username,
      };
  });

  const lastPostInResults = result[result.length - 1];
  const newCursor = lastPostInResults?.id || "";
  console.log(result);
  return {
    data: result,
    hasNextPage: hasNextPage,
    cursor: newCursor,
    role: session?.user?.role,
  };
};
