import { prisma } from "../../db";

export const getFiltersInfo = async (cursor) => {
  // vacancies
  const vacArea = await prisma.vacArea.groupBy({
    by: ["label"],
  });

  const skills = await prisma.skill.findMany({});

  const vacskills = await prisma.VacancySkills.findMany({});
  // vacancies

  var filteredArray = vacskills.filter(function (array_el) {
    return (
      skills.filter(function (anotherOne_el) {
        return anotherOne_el.name === array_el.name;
      }).length !== 0
    );
  });

  return {
    vacArea: vacArea,
    vacskills: filteredArray,
  };
};
