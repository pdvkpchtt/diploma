"use server";

import { getServSession } from "../../../app/api/auth/[...nextauth]/route";
import { prisma } from "../../db";

export const getCompanyVacancies = async (id, cursor) => {
  const session = await getServSession();

  console.log(id);
  const vacancy = await prisma.vacancy.findMany({
    take: 11,
    ...(cursor && cursor.length > 0 && { cursor: { id: cursor }, skip: 1 }),
    where: { companyId: id },
    select: {
      createdAt: true,
      id: true,
      name: true,
      description: true,
      shortDescription: true,
      waitings: true,

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
      vacArea: {
        select: {
          label: true,
        },
      },
      VacancySkills: {
        select: {
          skillId: true,
          skill: {
            select: {
              name: true,
              type: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const hasNextPage = vacancy.length > 10;
  let slicedPosts = vacancy;
  if (vacancy.length > 10) {
    slicedPosts = vacancy.slice(0, -1);
  }
  const result = slicedPosts.map((vacancy) => {
    return {
      id: vacancy.id,
      name: vacancy.name,
      shortDescription: vacancy.shortDescription,
      description: vacancy.description,
      vacArea: vacancy.vacArea,
      company: vacancy.Company,
      VacancySkills: vacancy.VacancySkills,
      Company: vacancy.Company,
      hrCreator: vacancy?.hrCreator?.user,
      myVac: vacancy?.hrCreator?.id === session?.user?.id,
      myVac: vacancy?.hrCreator?.user?.id === session?.user?.id,
      partOfTeam: vacancy?.Company?.HR?.find(
        (i) => i.userId === session?.user?.id
      ),
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
