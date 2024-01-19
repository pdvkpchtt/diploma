import CompanyProfile from "../../components/company/CompanyProfile";
import { getServSession } from "../../app/api/auth/[...nextauth]/route";
import { getCompanyProfile } from "../../server/actions/company/getCompanyProfile";
import { getGenerationsCount } from "../../server/actions/company/getGenerationsCount";

const CompanyPage = async () => {
  const session = await getServSession();

  const data = await getCompanyProfile({
    userId: session.user.id,
    role: "hr",
  });

  const generations = await getGenerationsCount();

  console.log(data, "lololo");

  return (
    <CompanyProfile
      data={data}
      role={session.user.role}
      userId={session.user.id}
      generations={generations}
    />
  );
};

export default CompanyPage;
