"use server";

import { getServSession } from "../../../app/api/auth/[...nextauth]/route";
import { getEndedMeetings } from "./getEndedMeetings";

export async function fetchBookmarks(status) {
  const session = await getServSession();

  const data = await getEndedMeetings(session.user.id, status);
  return data;
}
