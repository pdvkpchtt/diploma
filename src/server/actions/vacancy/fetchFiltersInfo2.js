"use server";

import { getFiltersInfo2 } from "./getFiltersInfo2";

export async function fetchFiltersInfo2() {
  const data = await getFiltersInfo2();

  return data;
}
