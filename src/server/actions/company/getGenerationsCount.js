"use server";

import { prisma } from "../../db";
import { getServSession } from "../../../app/api/auth/[...nextauth]/route";

export const getGenerationsCount = async () => {
  const session = await getServSession();

  const user = await prisma.user.findUnique({
    where: { id: session?.user.id },
    select: { planId: true, Company: { select: { id: true } } },
  });

  let lastDay = new Date(new Date().setHours(0, 0, 0, 0));
  lastDay = new Date(lastDay).toISOString();

  const todayTests = await prisma.Test.findMany({
    select: {
      type: true,
      createdAt: true,
    },
    where: {
      companyId: user.Company.id,
      type: "ai",
      createdAt: {
        gte: lastDay,
      },
    },
  });

  const generationsByPlan = await prisma.Plan.findMany({
    select: {
      id: true,
      generations: true,
      name: true,
    },
    where: {
      id: user.planId,
    },
  });

  return generationsByPlan[0].generations - todayTests.length;
};
