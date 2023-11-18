"use server";

import { uuid } from "uuidv4";
import { getServSession } from "../../app/api/auth/[...nextauth]/route";
import { generateNames } from "../../shared/utils/generateNames";
import { prisma } from "../db";

export const finishRegistration = async (inputRole) => {
  const session = await getServSession();

  if (inputRole === "student") {
    const user = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        role: inputRole,
        name: generateNames(),
        username: session.user.id,
        // plan: {
        //   connect: {
        //     id: "cloe5d9670000viko6sm3k870",
        //   },
        // },
      },
      select: { role: true },
    });
    return user;
  }

  const company = await prisma.company.upsert({
    where: { userId: session.user.id },
    update: {
      name: generateNames(),
    },
    create: {
      name: generateNames(),
      user: { connect: { id: session.user.id } },
    },
    select: {
      id: true,
    },
  });

  const data = await prisma.Hr.create({
    data: {
      user: { connect: { id: session.user.id } },
      company: {
        connect: {
          id: company.id,
        },
      },
      token: uuid(),
      dataVerified: new Date(),
    },
  });

  const user = await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      role: "hr",
      name: generateNames(),
      username: session.user.id,
      // plan: {
      //   connect: {
      //     id: "cloe5d9670000viko6sm3k870",
      //   },
      // },
    },
    select: { role: true },
  });
  return user;
};
