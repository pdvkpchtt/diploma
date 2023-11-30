"use server";

import { getCompanyVacancies } from "./getCompanyVacancies";

export async function fetchCompanyVacancies(id, cursor) {
  const vacs = await getCompanyVacancies(id, cursor);

  return vacs;
}
