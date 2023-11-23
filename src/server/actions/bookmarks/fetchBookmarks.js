"use server";

import { getServSession } from "../../../app/api/auth/[...nextauth]/route";
import { getUsersBookmarks } from "./getUsersBookmarks";

export async function fetchBookmarks(cursor) {
  const session = await getServSession();

  const data = await getUsersBookmarks(session.user.id, cursor);
  return data;
}
