import { redirect } from "next/navigation";

import { getCompanyProfile } from "../../../server/actions/company/getCompanyProfile";
import { getServSession } from "../../api/auth/[...nextauth]/route";
import { getAllAreas } from "../../../server/actions/data/getAllAreas";
import CreateTest from "../../../components/createtest/CreateTest";

const CreateTestPage = async () => {
  const session = await getServSession();

  const data = await getCompanyProfile({
    userId: session.user.id,
    role: session.user.role,
  });
  console.log(data);

  const areas = await getAllAreas();

  if (!data) redirect("/not_found");

  return <CreateTest data={data} areas={areas} />;
};

export default CreateTestPage;
