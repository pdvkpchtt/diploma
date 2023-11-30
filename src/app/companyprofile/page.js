import CompanyProfile from "../../components/company/CompanyProfile";
import { getServSession } from "../../app/api/auth/[...nextauth]/route";
import { getCompanyProfile } from "../../server/actions/company/getCompanyProfile";

const CompanyPage = async () => {
  const session = await getServSession();

  const data = await getCompanyProfile({
    userId: session.user.id,
    role: "hr",
  });

  console.log(data, "lololo");

  return (
    <CompanyProfile
      data={data}
      role={session.user.role}
      userId={session.user.id}
    />
  );
};

export default CompanyPage;
