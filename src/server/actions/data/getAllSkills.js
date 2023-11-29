import { prisma } from "../../db";

export const getAllSkills = async () => {
  const skills = await prisma.Skill.findMany({
    select: {
      id: true,
      name: true,
      type: true,
      area: {
        select: {
          label: true,
        },
      },
    },
  });

  return { skills };
};
