"use server";

import { getVacancyFields } from "./getVacancyFields";

export async function fetchVacancyData() {
  const data = await getVacancyFields();

  return data;
}
