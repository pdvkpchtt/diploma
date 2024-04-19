"use server";

const { prisma } = require("../../db");

const sendMessage = async ({ meetingId, text, userId, testId = null }) => {
  if (testId !== null)
    await prisma.Message.create({
      data: {
        Meeting: { connect: { id: meetingId } },
        Test: { connect: { id: "clrxsd0bg0015vi7ob6ofc7tz" } },
        text: text + "^^" + userId + "^^" + new Date(),
        type: "test",
      },
    });
  else
    await prisma.Message.create({
      data: {
        Meeting: { connect: { id: meetingId } },
        text: text + "^^" + userId + "^^" + new Date(),
        type: "text",
      },
    });
};

module.exports = { sendMessage };
