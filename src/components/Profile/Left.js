"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useClipboard } from "use-clipboard-copy";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import TextMain from "../../shared/Text/TextMain";
import TextSecondary from "../../shared/Text/TextSecondary";
import { ButtonAlert, ButtonGhost } from "../../shared/ui/Button";
import Card from "../../shared/ui/Card";
import EmptyAvatar from "../../shared/ui/EmptyAvatar";
import CustomLoader from "../../shared/ui/CustomLoader";

import LocationIcon from "../../shared/icons/LocationIcon";
import CalendarIcon from "../../shared/icons/CalendarIcon";
import PenIcon from "../../shared/icons/PenIcon";
import ExitIcon from "../../shared/icons/ExitIcon";

const Left = ({ navState, data }) => {
  const router = useRouter();
  const isMobile = useMediaQuery({ query: "(pointer:coarse)" });
  const clipboard = useClipboard();

  return (
    <div
      className={`${
        navState == true
          ? "[@media(hover)]:flex [@media(pointer:coarse)]:flex flex-col gap-[16px] [@media(pointer:coarse)]:gap-[12px]"
          : "[@media(hover)]:flex [@media(pointer:coarse)]:hidden flex-col gap-[16px] [@media(pointer:coarse)]:gap-[12px]"
      }
   
  transition duration-[250ms] [@media(hover)]:top-[86px] [@media(hover)]:fixed [@media(hover)]:max-w-[260px]  w-full`}
    >
      <Card
        style="[@media(hover)]:max-w-[260px] w-full h-fit flex flex-col gap-[12px]"
        padding={12}
      >
        <div className="rounded-[8px] relative overflow-hidden aspect-square [@media(pointer:coarse)]:w-full [@media(pointer:coarse)]:h-full [@media(hover)]:min-w-[236px] [@media(hover)]:min-h-[236px]  [@media(hover)]:w-[236px] [@media(hover)]:h-[236px]">
          <p
            className={`absolute ${
              data.image
                ? "bg-[#141414] bg-opacity-[90%]"
                : "bg-[#74899B] bg-opacity-[8%]"
            } text-[13px] select-none text-[#5875e8] font-medium px-[8px] py-[4px] bottom-0 left-0 rounded-tr-[8px]`}
          >
            {data.role === "student" ? "Соискатель" : "HR"}
          </p>
          {data.image ? (
            <Image
              src={data.image}
              alt="Profile photo"
              className="[@media(hover)]:min-w-[236px] object-cover [@media(hover)]:w-[236px] [@media(hover)]:h-[236px] [@media(hover)]:min-h-[236px] [@media(pointer:coarse)]:w-full [@media(pointer:coarse)]:h-full"
              width={236}
              height={236}
              quality={100}
              priority={true}
            />
          ) : (
            <EmptyAvatar />
          )}
        </div>

        <div className="flex flex-col">
          {/* name and username */}
          <div className="flex flex-col gap-[8px]">
            <TextMain
              text={data.name}
              style="font-medium text-[18px] leading-[21.6px] tracking-[-0.025em]"
            />
            <TextSecondary
              text={`@${data.username}`}
              style="font-medium text-[14px] cursor-pointer select-none leading-[16px] tracking-[-0.015em]"
              onClick={() => {
                toast(`🗂 Текст скопирован`, {
                  position: isMobile ? "top-center" : "bottom-right",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: true,
                  progress: undefined,
                  // theme: "dark",
                  progressStyle: { background: "#5875e8" },
                  containerId: "forCopy",
                });
                clipboard.copy(data.username);
              }}
            />
          </div>
          {/* name and username */}

          {/* location and birth date */}
          <div className="flex flex-col">
            {data.city === null || data.city?.length === 0 ? null : (
              <div className="flex flex-row gap-[8px] mt-[12px]">
                <LocationIcon />
                <TextSecondary
                  text={data.city}
                  style="font-normal text-[14px] leading-[18px] tracking-[-0.015em]"
                />
              </div>
            )}

            {data.birthDate && (
              <div className="flex flex-row gap-[8px] mt-[12px]">
                <CalendarIcon />
                <TextSecondary
                  text={data.birthDate}
                  style="font-normal text-[14px] leading-[18px] tracking-[-0.015em]"
                />
              </div>
            )}
          </div>
          {/* location and birth date */}
        </div>
      </Card>

      <Card
        style="max-w-[260px] w-full [@media(pointer:coarse)]:max-w-[100%] gap-[8px] flex flex-col"
        padding={12}
      >
        <ButtonGhost
          text="Редактировать"
          onClick={() =>
            router.push("/profile/edit", { query: { data: "update" } })
          }
        >
          <PenIcon fill={"#5875e8"} />
        </ButtonGhost>
      </Card>

      {/* hr */}
      {data.role.includes("hr") && (
        <div className="p-[12px] rounded-[20px] items-center flex flex-row justify-between max-w-[260px] w-full [@media(pointer:coarse)]:max-w-[100%] bg-[#74899B] bg-opacity-[8%]">
          <ButtonGhost
            text={data.hrCompany.company.name}
            onClick={() => router.push(`/companyprofile`)}
          >
            <div className="rounded-full overflow-hidden aspect-square w-[20px] h-[20px] min-w-[20px] min-h-[20px] max-w-[20px] max-h-[20px]">
              {data.hrCompany.company.image ? (
                <Image
                  src={data.hrCompany.company.image}
                  alt="hr company photo"
                  className="w-[20px] h-[20px] min-w-[20px] object-cover min-h-[20px] max-w-[20px] max-h-[20px]"
                  width={20}
                  height={20}
                  quality={100}
                  priority={true}
                />
              ) : (
                <div className="rounded-full h-[20px] w-[20px] bg-[#f6f6f8] dark:bg-[#141414]" />
              )}
            </div>
          </ButtonGhost>
        </div>
      )}
      {/* hr */}

      <div
        className={`p-[12px] rounded-[20px] items-center flex flex-row max-w-[260px] w-full [@media(pointer:coarse)]:max-w-[100%] bg-[#74899B] bg-opacity-[8%]`}
      >
        <div
          className="font-medium text-center h-[20px] flex flex-row gap-[8px] group transition duration-[250ms] w-fit cursor-pointer select-none leading-[20px] text-[16px] tracking-[-0.015em] text-[#F04646] hover:text-[#C92121] active:text-[#8a3838]"
          onClick={signOut}
        >
          <ExitIcon />
          Выход
        </div>
      </div>
    </div>
  );
};

export default Left;
