"use server";

import { getServSession } from "@/app/api/auth/[...nextauth]/route";
import { getExactCall } from "@/server/actions/call/getExactCall";
import Call from "@/components/call/Call";

const CallIdPage = async ({ params: { id } }) => {
  const session = await getServSession();

  const data = await getExactCall(id);

  return <Call roomID={id} role={session?.user?.role} data={data} />;
};

export default CallIdPage;
