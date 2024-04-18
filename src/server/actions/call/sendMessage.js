"use server";

const { prisma } = require("../../db");

const sendMessage = async ({ meetingId, text, testId = null }) => {
  if (testId !== null)
    await prisma.Message.create({
      data: {
        Meeting: { connect: { id: meetingId } },
        Test: { connect: { id: "clrxsd0bg0015vi7ob6ofc7tz" } },
        text: text,
        type: "test",
      },
    });
  else
    await prisma.Message.create({
      data: {
        Meeting: { connect: { id: meetingId } },
        text: text,
        type: "text",
      },
    });
};

module.exports = { sendMessage };
