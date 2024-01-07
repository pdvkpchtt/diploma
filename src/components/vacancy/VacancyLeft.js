"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import TextMain from "../../shared/Text/TextMain";
import TextSecondary from "../../shared/Text/TextSecondary";
import Card from "../../shared/ui/Card";
import EmptyAvatar from "../../shared/ui/EmptyAvatar";

const VacancyLeft = ({ data, children }) => {
  const router = useRouter();
  console.log(data);
  return (
    <div
      className={`flex flex-col gap-[16px] [@media(pointer:coarse)]:gap-[12px]
  transition duration-[250ms] [@media(hover)]:w-[260px] [@media(pointer:coarse)]:pt-[12px] [@media(pointer:coarse)]:px-[12px] [@media(pointer:coarse)]:w-full`}
    >
      <Card
        style="[@media(hover)]:w-[260px] [@media(pointer:coarse)]:w-full flex flex-col gap-[12px]"
        padding={12}
      >
        <div className="relative overflow-hidden rounded-full aspect-square [@media(hover)]:min-w-[110px] [@media(hover)]:min-h-[110px]  [@media(hover)]:w-[110px] [@media(hover)]:h-[110px] mx-auto">
          {data.Company.image ? (
            <Image
              src={data.Company.image}
              alt="Profile photo"
              className="[@media(hover)]:min-w-[110px] object-cover  [@media(hover)]:w-[110px] [@media(hover)]:h-[110px] [@media(hover)]:min-h-[110px] [@media(pointer:coarse)]:w-full [@media(pointer:coarse)]:h-full w-full"
              width={110}
              height={110}
              quality={100}
              priority={true}
            />
          ) : (
            <EmptyAvatar hungredAndTen />
          )}
        </div>

        {/* name and username */}
        <div className="flex flex-col gap-[8px]">
          <TextMain
            text={data.Company.name}
            onClick={() =>
              router.push(`/companyprofile/${data.Company.username}`)
            }
            style={`font-medium text-[18px] w-full text-center leading-[21.6px] tracking-[-0.45px] cursor-pointer`}
          />
          <TextSecondary
            text={`@${
              data.Company.username ? data.Company.username : data.Company.id
            }`}
            style="font-medium text-[16px] leading-[20px] tracking-[-0.24px] w-full text-center"
          />
        </div>
        {/* name and username */}

        {/* about */}
        {data.Company.about && (
          <TextSecondary
            text={data.Company.about}
            style="font-normal text-[14px] leading-[18px] tracking-[-0.21px] w-full text-center"
          />
        )}

        {!data.Company.Cities || data.Company.Cities.length === 0 ? null : (
          <TextSecondary
            text={data.Company.Cities.map(
              (item, key) =>
                true &&
                `${item.label}${
                  key !== data.Company.Cities.length - 1 ? ", " : ""
                }`
            )}
            style="font-normal text-[14px] leading-[18px] tracking-[-0.21px] font-medium w-full text-center"
          />
        )}
        {/* about */}
      </Card>

      <Card
        style="[@media(hover)]:max-w-[260px] w-full flex flex-col gap-[8px]"
        padding={12}
      >
        {/* views and connections */}
        <div className="flex flex-row gap-[4px]">
          <TextMain
            text={data?.hrcount}
            style="font-normal text-[14px] leading-[18px] tracking-[-0.015em]"
          />
          <TextSecondary
            text="рекрутеров"
            style="font-normal text-[14px] leading-[18px] tracking-[-0.015em]"
          />
        </div>
        {/* views and connections */}
      </Card>

      {children}
    </div>
  );
};

export default VacancyLeft;
