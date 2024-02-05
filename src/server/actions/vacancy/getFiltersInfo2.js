import { prisma } from "../../db";

export const getFiltersInfo2 = async (cursor) => {
  // people
  const peoplecity = await prisma.User.groupBy({
    by: ["city"],
  });

  const educationLevel = await prisma.EducationLevel.findMany({
    where: {
      user: {
        some: {},
      },
    },
    select: {
      label: true,
    },
  });
  const userskills = await prisma.Skill.findMany({
    where: {
      UserSkills: {
        some: {},
      },
    },
    select: {
      id: true,
      name: true,
      type: true,
    },
  });
  const vacArea = await prisma.Area.groupBy({
    by: ["label"],
  });

  // people

  return {
    peoplecity: peoplecity.map((i) => ({ label: i.city })),
    educationLevel: educationLevel,
    userskills: { skills: userskills },
    vacArea: vacArea,
  };
};
