"use server";

const { prisma } = require("../../db");

const sendMessage = async ({ meetingId, text, userId, testId = null }) => {
  let res = null;
  if (testId !== null)
    res = await prisma.Message.create({
      data: {
        Meeting: { connect: { id: meetingId } },
        Test: { connect: { id: "clrxsd0bg0015vi7ob6ofc7tz" } },
        text: "test" + "^^" + userId + "^^" + new Date(),
        type: "test",
      },
    });
  else
    res = await prisma.Message.create({
      data: {
        Meeting: { connect: { id: meetingId } },
        text: text + "^^" + userId + "^^" + new Date(),
        type: "text",
      },
      select: {
        text: true,
        type: true,
        Test: true,
      },
    });

  return res;
};

module.exports = { sendMessage };
