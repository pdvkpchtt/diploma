"use server";
import { prisma } from "../../db";

export const getProfile = async ({ userId }) => {
  const user = await prisma.User.findFirst({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      username: true,
      role: true,
      image: true,
      about: true,
      email: true,
      country: true,
      city: true,
      birthDate: true,
      phone: true,
      phoneVerified: true,
      Company: true,
    },
  });

  BigInt.prototype["toJSON"] = function () {
    return parseInt(this.toString());
  };

  if (user.role === "hr") {
    const comapny = await prisma.Hr.findFirst({
      where: { userId: user.id },
      select: {
        company: {
          select: {
            id: true,
            username: true,
            name: true,
            image: true,
          },
        },
      },
    });

    return {
      id: user.id,
      name: user.name,
      username: user.username,
      role: user.role,
      image: user.image,
      about: user.about,
      country: user.country,
      email: user.email,
      phone: user.phone,
      phoneVerified: user.phoneVerified,
      city: user.city,
      birthDate: user.birthDate,

      Company: user.Company,
      hrCompany: comapny,
    };
  } else {
    return {
      id: user.id,
      name: user.name,
      username: user.username,
      role: user.role,
      image: user.image,
      about: user.about,
      country: user.country,
      city: user.city,
      phone: user.phone,
      phoneVerified: user.phoneVerified,
      email: user.email,
      birthDate: user.birthDate,

      Company: user.Company,
    };
  }
};
