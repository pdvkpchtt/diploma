"use server";

import { getServSession } from "../../../app/api/auth/[...nextauth]/route";
import { getRecruters } from "./getRecruters";

export async function fetchGetRecruters(companyId, cursor, input) {
  //   const session = await getServSession();

  const data = await getRecruters(companyId, cursor, input);
  return data;
}
