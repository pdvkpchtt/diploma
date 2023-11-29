"use server";

import { getServSession } from "../../../app/api/auth/[...nextauth]/route";
import { prisma } from "../../db";

export const updateEmail = async (data) => {
  const session = await getServSession();

  const editedMail = await prisma.user.update({
    where: {
      id: session?.user?.id,
    },
    data: {
      email: data,
      emailVerified: null,
    },
  });

  return editedMail;
};
