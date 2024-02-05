"use server";

import { getServSession } from "../../../app/api/auth/[...nextauth]/route";
import { prisma } from "../../db";

export const getPeoples = async (cursor, filters) => {
  const users = await prisma.user.findMany({
    take: 11,
    ...(cursor && cursor.length > 0 && { cursor: { id: cursor }, skip: 1 }),
    select: {
      id: true,
      name: true,
      username: true,
      image: true,
      country: true,
      about: true,
      role: true,
      city: true,
      Company: {
        select: {
          name: true,
        },
      },
      educationLevel: { select: { label: true } },
      UserSkills: {
        select: {
          id: true,
          skillId: true,
          skill: {
            select: {
              name: true,
              type: true,
            },
          },
        },
      },
    },
    where: filters?.startFiltering
      ? filters?.input.length > 0
        ? filters?.input[0] === "@"
          ? {
              role: { contains: "hr" },
              username: {
                contains: filters?.input.slice(1),
                mode: "insensitive",
              },
              city: {
                contains: filters?.peoplecity?.label,
                mode: "insensitive",
              },
            }
          : {
              role: { contains: "hr" },
              name: { contains: filters?.input, mode: "insensitive" },
              city: {
                contains: filters?.peoplecity?.label,
                mode: "insensitive",
              },
            }
        : {
            role: { contains: "hr" },
            city: {
              contains: filters?.peoplecity?.label,
              mode: "insensitive",
            },
          }
      : filters?.input.length > 0
      ? filters?.input[0] === "@"
        ? {
            role: { contains: "hr" },
            username: {
              contains: filters?.input.slice(1),
              mode: "insensitive",
            },
          }
        : {
            name: { contains: filters?.input, mode: "insensitive" },
          }
      : { role: { contains: "hr" } },
  });

  const hasNextPage = users.length > 10;
  let slicedPosts = users;
  if (users.length > 10) {
    slicedPosts = users.slice(0, -1);
  }
  const result = slicedPosts.map((u) => {
    if (u.role !== "company")
      return {
        id: u.id,
        name: u.name,
        username: u.username,
        image: u.image,
        country: u.country,
        city: u.city,
        UserSkills: u.UserSkills,
        Company: u.Company,
        educationLevel: u.educationLevel,
        about: u.about,
      };
  });

  const lastPostInResults = result[result.length - 1];
  const newCursor = lastPostInResults?.id || "";

  return {
    data: result,
    hasNextPage: hasNextPage,
    cursor: newCursor,
  };
};
