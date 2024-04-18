"use server";

import { getMessages } from "./getMessages";

export async function fetchMessages(id, cursor) {
  const data = await getMessages(id, cursor);

  return data;
}
