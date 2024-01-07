"use server";

import { getFiltersInfo } from "./getFiltersInfo";

export async function fetchFiltersInfo() {
  const data = await getFiltersInfo();

  return data;
}
