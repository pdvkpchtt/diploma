"use server";

import { getVacancies } from "./getVacancies";

export async function fetchVacancies(cursor, filters) {
  const users = await getVacancies(cursor, filters);

  return users;
}
