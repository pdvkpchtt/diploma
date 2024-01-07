"use server";

import { getServSession } from "../../../app/api/auth/[...nextauth]/route";
import { createVacancy } from "./createVacancy";

export async function createVacancyHandler(data) {
  const session = await getServSession();

  const res = await createVacancy(session.user.id, data, session.user.role);

  return res;
}
