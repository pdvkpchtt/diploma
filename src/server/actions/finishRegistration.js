"use server";

import { uuid } from "uuidv4";
import { getServSession } from "../../app/api/auth/[...nextauth]/route";
import { generateNames } from "../../shared/utils/generateNames";
import { prisma } from "../db";

export const finishRegistration = async (inputRole) => {
  const session = await getServSession();

  // const { role, email, name, id } = await prisma.user.findFirst({
  //   where: { id: session.user.id },
  //   select: {
  //     id: true,
  //     role: true,
  //     email: true,
  //     name: true,
  //   },
  // });
  //if (role) return
  if (inputRole === "student") {
    const user = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        role: inputRole,
        name: generateNames(),
        username: session.user.id,
        plan: {
          connect: {
            id: "cloe5d9670000viko6sm3k870",
          },
        },
      },
      select: { role: true },
    });
    return user;
  }

  const company = await prisma.company.upsert({
    where: { userId: session.user.id },
    update: {
      name: generateNames(),
      username: session.user.id,
    },
    create: {
      name: generateNames(),
      username: session.user.id,
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
      role: "hr_no_nickname",
      name: generateNames(),
      username: session.user.id,
      plan: {
        connect: {
          id: "cloe5d9670000viko6sm3k870",
        },
      },
    },
    select: { role: true },
  });
  return user;
};
