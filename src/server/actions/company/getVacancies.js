"use server";

import { getServSession } from "../../../app/api/auth/[...nextauth]/route";
import { prisma } from "../../db";

export const getVacancies = async (cursor, filters) => {
  const session = await getServSession();

  const vacancy = await prisma.vacancy.findMany({
    take: 11,
    ...(cursor && cursor.length > 0 && { cursor: { id: cursor }, skip: 1 }),
    select: {
      id: true,
      name: true,
      description: true,
      shortDescription: true,
      conditions: true,
      waitings: true,
      salaryStart: true,
      salaryEnd: true,
      distantWork: true,

      format: {
        select: {
          id: true,
          label: true,
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
      educationLevel: {
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
      vacArea: {
        select: {
          label: true,
        },
      },
      VacancySkills: true,
      Bookmarks: true,
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
    },
    where: filters?.startFiltering
      ? filters?.input.length > 0
        ? {
            name: { contains: filters?.input, mode: "insensitive" },

            VacancySkills:
              filters?.VacancySkills?.length > 0
                ? {
                    some: {
                      name: {
                        in: filters?.VacancySkills?.map(
                          (item) => true && item.name
                        ),
                      },
                    },
                  }
                : {},
            vacArea:
              filters?.area?.length > 0
                ? {
                    some: {
                      label: {
                        in: filters?.area?.map((item) => true && item.label),
                      },
                    },
                  }
                : {},
          }
        : {
            VacancySkills:
              filters?.VacancySkills?.length > 0
                ? {
                    some: {
                      name: {
                        in: filters?.VacancySkills?.map(
                          (item) => true && item.name
                        ),
                      },
                    },
                  }
                : {},
            vacArea:
              filters?.area?.length > 0
                ? {
                    some: {
                      label: {
                        in: filters?.area?.map((item) => true && item.label),
                      },
                    },
                  }
                : {},
          }
      : filters?.input.length > 0
      ? {
          name: { contains: filters?.input, mode: "insensitive" },
        }
      : {},
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
      salaryStart: vacancy.salaryStart,
      salaryEnd: vacancy.salaryEnd,
      contract: vacancy.contract,
      shortDescription: vacancy.shortDescription,
      description: vacancy.description,
      vacArea: vacancy.vacArea,
      company: vacancy.Company,
      VacancySkills: vacancy.VacancySkills,
      currency: vacancy.currency,
      Bookmarks: vacancy.Bookmarks,
      Company: vacancy.Company,
      distantWork: vacancy.distantWork,
      hrCreator: vacancy?.hrCreator?.user,
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
