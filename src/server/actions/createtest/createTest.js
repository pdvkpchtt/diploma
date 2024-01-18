"use server";

import { prisma } from "../../db";
import { getAllAreas } from "../data/getAllAreas";

export const createTest = async ({ area, test, compId }) => {
  const createdTest = await prisma.Test.create({
    data: {
      Company: { connect: { id: compId } },
      Area: { connect: { id: area.id } },
    },
    select: { id: true },
  });
  console.log(area, test, test[0].answers, "jops");

  for (let step = 0; step < test.length; step++) {
    const createdQuestion = await prisma.Question.create({
      data: {
        text: test[step].question,
        rightAnswer: test[step].rightAnswer,
        test: { connect: { id: createdTest.id } },
      },
    });
  }
};
