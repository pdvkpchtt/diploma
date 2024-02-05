"use server";

import { getTestsGlobal } from "./getTestsGlobal";

export async function fetchTestsGlobal(cursor, filters) {
  const vacs = await getTestsGlobal(cursor, filters);

  return vacs;
}
