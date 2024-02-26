"use server";

import { getServSession } from "../../../app/api/auth/[...nextauth]/route";
import { prisma } from "../../db";

export const sendMessage = async () => {
  const session = await getServSession();

  const message = await prisma.Message.create({
    data: {
      Meeting: { connect: { id: "15c71fd7-2a64-43bf-a1d2-7ea4be33ccc6" } },
      Test: { connect: { id: "clrxsd0bg0015vi7ob6ofc7tz" } },
      text: "test",
      type: "test",
    },
  });
};
