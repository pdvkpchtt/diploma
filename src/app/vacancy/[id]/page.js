"use server";

import VacancyPage from "../../../components/vacancy/VacancyPage";
import { getVacancyById } from "../../../server/actions/company/getVacancyById";
import { getServSession } from "../../api/auth/[...nextauth]/route";

const VacancyIdPage = async ({ params: { id } }) => {
  const session = await getServSession();

  const data = await getVacancyById(id);
  console.log("vacancy", data);

  return (
    <VacancyPage
      role={session.user.role}
      data={data}
      userId={session.user.id}
    />
  );
};

export default VacancyIdPage;
