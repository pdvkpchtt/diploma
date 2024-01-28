import { redirect } from "next/navigation";

import { getCompanyProfile } from "../../../server/actions/company/getCompanyProfile";
import { getServSession } from "../../api/auth/[...nextauth]/route";
import { getAllAreas } from "../../../server/actions/data/getAllAreas";
import CreateTest from "../../../components/createtest/CreateTest";
import { getGenerationsCount } from "@/server/actions/company/getGenerationsCount";

const CreateTestPage = async () => {
  const session = await getServSession();

  const data = await getCompanyProfile({
    userId: session.user.id,
    role: session.user.role,
  });
  console.log(data);

  const areas = await getAllAreas();
  const aiCount = await getGenerationsCount();

  if (!data) redirect("/not_found");

  return <CreateTest data={data} areas={areas} aiCount={aiCount} />;
};

export default CreateTestPage;
