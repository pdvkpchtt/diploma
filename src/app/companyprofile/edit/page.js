import { updateCompanyProfile } from "../../../server/actions/company/updateCompanyProfile";
import { getServSession } from "../../../app/api/auth/[...nextauth]/route";
import { getCompanyProfile } from "../../../server/actions/company/getCompanyProfile";
import EditCompany from "../../../components/companyedit/EditCompany";
import { getCompanyIndustries } from "../../../server/actions/company/getCompanyIndustries";
import { getBigCities } from "../../../server/actions/company/getBigCities";

const CompanyEditPage = async () => {
  const session = await getServSession();

  const data = await getCompanyProfile({
    userId: session.user.id,
  });
  const itemsForDD = await getCompanyIndustries();
  const itemsForDD3 = await getBigCities();

  console.log("company", data);

  async function updateCompanyData(data) {
    "use server";
    const session = await getServSession();
    console.log("edit data", data);
    const res = await updateCompanyProfile({
      userId: session.user.id,
      data: data,
    });

    return res;
  }

  return (
    <EditCompany
      itemsForDD={itemsForDD}
      itemsForDD3={itemsForDD3}
      data={data}
      dataToCompare={data}
      updateCompanyData={updateCompanyData}
      userId={session.user.id}
    />
  );
};

export default CompanyEditPage;
