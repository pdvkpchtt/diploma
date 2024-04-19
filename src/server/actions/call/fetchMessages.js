"use server";

import { getMessages } from "./getMessages";

export async function fetchMessages(id) {
  const data = await getMessages(id);

  return data;
}
