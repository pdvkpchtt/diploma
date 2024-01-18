import { redirect } from "next/navigation";

import { getCompanyProfile } from "../../../server/actions/company/getCompanyProfile";
import { getServSession } from "../../api/auth/[...nextauth]/route";
import CreateTest from "../../../components/createtest/CreateTest";

const CreateTestPage = async () => {
  const session = await getServSession();

  const data = await getCompanyProfile({
    userId: session.user.id,
    role: session.user.role,
  });
  console.log(data);

  if (!data) redirect("/not_found");

  return <CreateTest data={data} />;
};

export default CreateTestPage;
