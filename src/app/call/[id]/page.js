"use server";

import { getServSession } from "@/app/api/auth/[...nextauth]/route";
import { getExactCall } from "@/server/actions/call/getExactCall";
import Call from "@/components/call/Call";
import { getVacancyById } from "@/server/actions/company/getVacancyById";

const CallIdPage = async ({ params: { id } }) => {
  const session = await getServSession();

  const data = await getExactCall(id);
  const vacancy = await getVacancyById(data.vacancy.id);

  return (
    <Call
      roomID={id}
      role={session?.user?.role}
      id={session?.user?.id}
      data={data}
      VacTests={vacancy.VacTests}
    />
  );
};

export default CallIdPage;
