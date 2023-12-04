"use client";

import Image from "next/image";
import React, { useLayoutEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useClipboard } from "use-clipboard-copy";

import TextMain from "../../shared/Text/TextMain";
import TextSecondary from "../../shared/Text/TextSecondary";
import { ButtonGhost } from "../../shared/ui/Button";
import Card from "../../shared/ui/Card";
import EmptyAvatar from "../../shared/ui/EmptyAvatar";
import RecrutersModal from "./RecrutersModal";

import PenIcon from "../../shared/icons/PenIcon";
import AddVacancyIcon from "../../shared/icons/AddVacancyIcon";

const CompanyLeft = ({ navState, data, withoutActions = false, onClick }) => {
  const router = useRouter();
  const ref = useRef(null);
  const isMobile = useMediaQuery({ query: "(pointer:coarse)" });
  const clipboard = useClipboard();

  const getNoun = (dig) => {
    if (dig % 10 === 0 || dig % 10 >= 5) return " рекрутеров";
    if (dig % 10 > 1 && dig % 10 < 5) return " рекрутера";
    else return " рекрутер";
  };

  const [modalState, setModalState] = useState(false);

  return (
    <>
      <div
        className={`${
          navState == true
            ? "[@media(hover)]:flex [@media(pointer:coarse)]:flex flex-col gap-[16px] [@media(pointer:coarse)]:gap-[12px]"
            : "[@media(hover)]:flex [@media(pointer:coarse)]:hidden flex-col gap-[16px] [@media(pointer:coarse)]:gap-[12px]"
        }
   
  transition duration-[250ms] [@media(hover)]:top-[86px] [@media(hover)]:fixed [@media(hover)]:max-w-[260px]  w-full`}
      >
        <Card
          style="[@media(hover)]:w-[260px] [@media(pointer:coarse)]:w-full flex flex-col gap-[12px]"
          padding={12}
        >
          <div className="relative overflow-hidden rounded-full aspect-square [@media(hover)]:min-w-[110px] [@media(hover)]:min-h-[110px]  [@media(hover)]:w-[110px] [@media(hover)]:h-[110px] mx-auto">
            {data.image ? (
              <Image
                src={data.image}
                alt="Profile photo"
                className="[@media(hover)]:min-w-[110px] object-cover  [@media(hover)]:w-[110px] [@media(hover)]:h-[110px] [@media(hover)]:min-h-[110px] [@media(pointer:coarse)]:w-full [@media(pointer:coarse)]:h-full w-full"
                width={110}
                height={110}
                quality={100}
                priority={true}
              />
            ) : (
              <EmptyAvatar />
            )}
          </div>

          {/* name and username */}
          <div className="flex flex-col gap-[8px]">
            <TextMain
              text={data.name}
              onClick={onClick}
              style={`font-medium text-[18px] w-full text-center leading-[21.6px] tracking-[-0.45px] ${
                onClick && "cursor-pointer"
              }`}
            />
            <TextSecondary
              text={`@${data.username.length !== 0 ? data.username : data.id}`}
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
              style="font-medium text-[16px] select-none leading-[20px] cursor-pointer tracking-[-0.24px] w-full text-center"
            />
          </div>
          {/* name and username */}

          {/* about */}
          {data.about && (
            <TextSecondary
              text={data.about}
              style="font-normal text-[14px] leading-[18px] tracking-[-0.21px] w-full text-center"
            />
          )}

          {!data.Cities || data.Cities.length === 0 ? null : (
            <TextSecondary
              text={data.Cities.map(
                (item, key) =>
                  true &&
                  `${item.label}${key !== data.Cities.length - 1 ? ", " : ""}`
              )}
              style="font-normal text-[14px] leading-[18px] tracking-[-0.21px] font-medium w-full text-center"
            />
          )}
          {/* about */}
        </Card>

        {/* hrs */}
        <Card
          style="[@media(hover)]:max-w-[260px] w-full flex flex-col gap-[8px]"
          padding={12}
        >
          <div
            className="flex flex-row gap-[4px] cursor-pointer"
            onClick={() => setModalState(true)}
          >
            <TextMain
              text={data.hrcount}
              style="font-normal text-[14px] leading-[18px] tracking-[-0.015em]"
            />
            <TextSecondary
              text={getNoun(data.hrcount)}
              style="font-normal text-[14px] leading-[18px] tracking-[-0.015em]"
            />
          </div>
        </Card>
        {/* hrs */}

        {/* buttons */}
        <Card
          style="max-w-[260px] w-full [@media(pointer:coarse)]:max-w-[100%] flex flex-col gap-[8px]"
          padding={12}
        >
          <ButtonGhost
            text="Добавить вакансию"
            onClick={() =>
              router.push("/companyprofile/createvacancy", {
                query: { data: "update" },
              })
            }
          >
            <AddVacancyIcon fill={"#5875e8"} />
          </ButtonGhost>
          <ButtonGhost
            text="Редактировать"
            onClick={() =>
              router.push("/companyprofile/edit", {
                query: { data: "update" },
              })
            }
          >
            <PenIcon fill={"#5875e8"} />
          </ButtonGhost>
        </Card>
        {/* buttons */}
      </div>

      <RecrutersModal
        comapnyId={data.id}
        modalState={modalState}
        setModalState={setModalState}
      />
    </>
  );
};

export default CompanyLeft;
