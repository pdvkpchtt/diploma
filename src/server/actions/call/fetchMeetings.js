"use server";

import { getServSession } from "../../../app/api/auth/[...nextauth]/route";
import { getMeetings } from "./getMeetings";

export async function fetchMeetings() {
  const session = await getServSession();

  const data = await getMeetings(session.user.id);
  return data;
}
