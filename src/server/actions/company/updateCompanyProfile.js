"use server";

import { getServSession } from "../../../app/api/auth/[...nextauth]/route";
import { prisma } from "../../db";
import { string, z } from "zod";

export const updateEmail = async (data) => {
  const session = await getServSession();

  const editedMail = await prisma.user.update({
    where: {
      id: session?.user?.id,
    },
    data: {
      email: data,
      emailVerified: null,
    },
  });

  return editedMail;
};

export const updateCompanyProfile = async ({ userId, data }) => {
  console.log(data, "server upd dat");
  // валидация
  const validate = z.object({
    name: z.string().min(1, { message: "inputName minlen" }),
    username: z.string().min(1, { message: "inputUsername minlen" }),
    industry: z.string().min(1, { message: "inputIndustry minlen" }),
    about: z.string().max(240, { message: "inputAbout maxlen" }),
  });

  const validateRes = validate.safeParse({
    name: data.name,
    username: data.username,
    industry: data.industry?.label,
    about: data.about !== null ? data.about : "",
  });
  const me = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      HR: { select: { company: { select: { id: true } } } },
    },
  });

  const checkusername = await prisma.company.findFirst({
    where: { username: data.username, id: { not: me.HR[0].company.id } },
    select: { id: true },
  });
  const session = await getServSession();

  if (
    !validateRes.success ||
    checkusername?.id ||
    data.username === session.user.id
  )
    return {
      status: "error",
      message: validateRes.error?.errors?.map((i) => i?.message),
      submsg: checkusername?.id
        ? "inputUsername unique"
        : data.username === session.user.id
        ? "inputUsername change"
        : null,
    };
  // валидация

  if (data.username !== session.user.id) {
    const editedMail = await prisma.user.update({
      where: {
        id: session?.user?.id,
      },
      data: {
        role: "hr",
      },
    });
  }

  const companyEdited = await prisma.company.update({
    where: { id: me.HR[0].company.id },
    data: {
      name: data.name,
      username: data.username.split(" ").join(""),
      slogan: data.slogan,
      about: data.about,
      isStartap: data.isStartap,
      Cities: {
        deleteMany: {},
        createMany: { data: [...data.Cities] },
      },
      industry:
        data.industry?.length === 0
          ? {}
          : { connect: { id: data.industry.id } },
    },
  });
};
