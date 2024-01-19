"use server";
import { prisma } from "../../db";

export const getCompanyProfile = async ({ userId }) => {
  const userEmail = await prisma.user.findFirst({
    where: { OR: [{ id: userId }, { id: userId }] },
    select: {
      email: true,
    },
  });

  const companyInfo = await prisma.Hr.findFirst({
    where: { userId: userId },
    select: {
      company: {
        select: {
          id: true,
          userId: true,
          name: true,
          username: true,
          Cities: { select: { label: true } },
          image: true,
          about: true,
          industry: { select: { label: true, id: true } },
          createdAt: true,
          HR: true,
          updatedAt: true,
          user: {
            select: {
              id: true,
              email: true,
              role: true,
              plan: true,
            },
          },
        },
      },
    },
  });
  return {
    id: companyInfo?.company?.id,
    email: userEmail?.email,
    userId: companyInfo?.company?.userId,
    role: companyInfo?.company?.user?.role,
    name: companyInfo?.company?.name,
    image: companyInfo?.company?.image,
    username: companyInfo?.company?.username,
    about: companyInfo?.company?.about,
    Cities: !companyInfo?.company?.Cities ? [] : companyInfo?.company?.Cities,
    industry: !companyInfo?.company?.industry
      ? []
      : companyInfo?.company?.industry,
    createdAt: companyInfo?.company?.createdAt,
    updatedAt: companyInfo?.company?.updatedAt,
    hrcount: companyInfo?.company?.HR?.filter((i) => i.dataVerified !== null)
      ?.length,
    generationsCount: companyInfo?.company?.user?.plan?.generations,
  };
};
