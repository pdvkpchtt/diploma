import { prisma } from "../../db";
import { z } from "zod";

export const updateProfile = async ({ userId, data }) => {
  // валидация
  const validate = z.object({
    name: z.string().min(1, { message: "inputName minlen" }),
    username: z.string().min(1, { message: "inputUsername minlen" }),
    about: z.string().max(240, { message: "inputAbout maxlen" }),
  });

  const validateRes = validate.safeParse({
    name: data.name,
    username: data.username,
    about: data.about !== null ? data.about : "",
  });

  const checkusername = await prisma.user.findFirst({
    where: { username: data.username, id: { not: userId } },
    select: { id: true },
  });

  if (!validateRes.success || checkusername?.id)
    return {
      status: "error",
      message: validateRes.error?.errors?.map((i) => i?.message),
      submsg: checkusername?.id ? "inputUsername unique" : null,
    };
  // валидация

  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      name: data.name,
      city: data.city,
      about: data.about,
      username: data.username,
      birthDate: data.birthDate || null,
      educationLevel: data.educationLevel?.id
        ? {
            connect: {
              id: data.educationLevel?.id,
            },
          }
        : {},
      UserSkills: {
        deleteMany: {},
        createMany: {
          data: [...data.UserSkills],
        },
      },
      UserArea: {
        deleteMany: {},
        createMany: {
          data: [...data.UserArea],
        },
      },
    },
  });
  // return user;
};
