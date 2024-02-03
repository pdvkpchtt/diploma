"use server";

import { getServSession } from "../../../app/api/auth/[...nextauth]/route";
import { prisma } from "../../db";

export const getTests = async (id, cursor) => {
  const tests = await prisma.Test.findMany({
    take: 11,
    ...(cursor && cursor.length > 0 && { cursor: { id: cursor }, skip: 1 }),
    where: { companyId: id },
    select: {
      id: true,
      _count: {
        select: {
          questions: true,
          VacTests: true,
        },
      },
      Company: true,
      Area: true,
      createdAt: true,
      type: true,
    },
  });

  const hasNextPage = tests.length > 10;
  let slicedPosts = tests;
  if (tests.length > 10) {
    slicedPosts = tests.slice(0, -1);
  }
  const result = slicedPosts.map((tests) => {
    return {
      id: tests.id,

      questionsLen: tests?._count?.questions,
      VacTestsLen: tests?._count?.VacTests,

      Company: tests?.Company,
      Area: tests?.Area,
      createdAt: tests?.createdAt,
      type: tests?.type,
    };
  });

  const lastPostInResults = result[result.length - 1];
  const newCursor = lastPostInResults?.id || "";

  return {
    data: result,
    hasNextPage: hasNextPage,
    cursor: newCursor,
  };
};
