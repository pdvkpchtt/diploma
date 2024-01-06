import { redirect } from "next/navigation";

import { getCompanyProfile } from "../../../server/actions/company/getCompanyProfile";
import { getServSession } from "../../api/auth/[...nextauth]/route";
import CreateVacancy from "../../../components/createvacancy/CreateVacancy";
import { getAllSkills } from "../../../server/actions/data/getAllSkills";

const CreateVacancyPage = async () => {
  const session = await getServSession();

  const data = await getCompanyProfile({
    userId: session.user.id,
    role: session.user.role,
  });
  console.log(data);
  const skills = await getAllSkills();

  if (!data) redirect("/not_found");

  return <CreateVacancy skills={skills} data={data} />;
};

export default CreateVacancyPage;
