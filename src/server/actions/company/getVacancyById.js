"use server";

import { getServSession } from "../../../app/api/auth/[...nextauth]/route";
import { prisma } from "../../db";

export const getVacancyById = async (id) => {
  const session = await getServSession();

  const currentVacancy = await prisma.vacancy.findUnique({
    where: {
      id: id,
    },
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
          about: true,
          name: true,
          image: true,
          Cities: true,
          HR: true,
          user: {
            select: {
              id: true,
              email: true,
            },
          },
        },
      },

      vacArea: {
        select: {
          label: true,
        },
      },
      VacancySkills: true,
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
      Bookmarks: true,
    },
  });

  return {
    id: currentVacancy.id,
    name: currentVacancy.name,
    salaryStart: currentVacancy.salaryStart,
    format: currentVacancy.format,
    salaryEnd: currentVacancy.salaryEnd,
    contract: currentVacancy.contract,
    shortDescription: currentVacancy.shortDescription,
    description: currentVacancy.description,
    vacArea: currentVacancy.vacArea,
    company: currentVacancy.Company,
    VacancySkills: currentVacancy.VacancySkills,
    currency: currentVacancy.currency,
    conditions: currentVacancy.conditions,
    waitings: currentVacancy.waitings,
    Bookmarks: currentVacancy.Bookmarks,
    Company: currentVacancy.Company,
    distantWork: currentVacancy.distantWork,
    hrCreator: currentVacancy?.hrCreator?.user,
    amICreator: currentVacancy?.hrCreator?.user?.id === session?.user?.id,
    hrcount: currentVacancy?.Company?.HR?.filter((i) => i.dataVerified !== null)
      ?.length,
    followersCount: currentVacancy?.Company?.user?._count?.myCompanyFolowers,
  };
};
