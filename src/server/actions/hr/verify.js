"use server";

import { getServerSession } from "next-auth";
import { prisma } from "../../db";

export const verify = async (token) => {
  const session = await getServerSession();

  const hr = await prisma.Hr.updateMany({
    where: {
      AND: [{ token: token }, { dataVerified: null }],
    },
    data: {
      dataVerified: new Date(),
    },
  });

  const user = await prisma.User.updateMany({
    where: {
      HR: { some: { token: token } },
    },
    data: {
      role: "hr",
    },
  });

  return hr?.token == token;
};
