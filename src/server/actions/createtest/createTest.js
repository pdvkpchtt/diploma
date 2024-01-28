"use server";

import { prisma } from "../../db";
import { getAllAreas } from "../data/getAllAreas";

export const createTest = async ({ area, test, compId, used = false }) => {
  try {
    const createdTest = await prisma.Test.create({
      data: {
        Company: { connect: { id: compId } },
        Area: { connect: { id: area.id } },
        type: used === false ? "hand" : "ai",
      },
      select: { id: true },
    });
    // console.log(area, test, test[0].answers, "jops");

    for (let i = 0; i < test.length; i++) {
      // создаем вопросы
      const createdQuestion = await prisma.Question.create({
        data: {
          text: test[i].question,
          test: { connect: { id: createdTest.id } },
        },
        select: {
          id: true,
        },
      });
      // создаем вопросы

      // создаем ответы на каждый вопрос
      for (let j = 0; j < test[i].answers.length; j++) {
        const createdAnswer = await prisma.Answer.create({
          data: {
            text: test[i].answers[j].answer,
            rightAnswer: test[i].answers[j].rightAnswer,
            question: { connect: { id: createdQuestion.id } },
          },
        });
      }
      // создаем ответы на каждый вопрос
    }
  } catch (err) {
    return { status: "error", message: "Ошибка! Проверьте данные" };
  }
};
