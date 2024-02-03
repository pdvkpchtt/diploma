"use server";

import { getTests } from "./getTests";

export async function fetchTests(id, cursor) {
  const vacs = await getTests(id, cursor);

  return vacs;
}
