"use server";

import { getPeoples } from "./getPeoples";

export async function fetchPeople(cursor, filters) {
  const users = await getPeoples(cursor, filters);

  return users;
}
