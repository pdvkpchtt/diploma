"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

import TextMain from "../Text/TextMain";
import TextSecondary from "../Text/TextSecondary";
import Card from "./Card";
import EmptyAvatar from "./EmptyAvatar";
import SkillCard from "./SkillCard";
import DotsIcon from "../icons/DotsIcon";
import BottomModal from "./BottomModal";
import { useState } from "react";
import { deleteTest } from "@/server/actions/company/deleteTest";
import { LayoutGroup, motion } from "framer-motion";
import AiIcon from "../icons/AiIcon";
import AiIcon2 from "../icons/AiIcon2";
import Helper from "./Helper";
import FullTestModal from "@/components/company/FullTestModal";

const TestCard = ({ item, selectedId, setSelectedId }) => {
  const router = useRouter();

  const [isOpen, toggle] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const getNoun = (dig) => {
    if (dig % 10 === 0 || dig % 10 >= 5) return " вопросов";
    if (dig % 10 > 1 && dig % 10 < 5) return " вопроса";
    else return " вопрос";
  };

  const getNoun2 = (dig) => {
    if (dig % 10 === 0 || dig % 10 >= 5) return " вакансий используют";
    if (dig % 10 > 1 && dig % 10 < 5) return " вакансии используют";
    else return " вакансия использует";
  };

  const deleteHanler = async () => {
    await deleteTest(item.id);
    setDeleted(true);
    toggle(false);
  };

  return (
    <>
      <LayoutGroup id={selectedId}>
        {!deleted && (
          <motion.div
            layoutId={item.id}
            className={selectedId === item.id ? `hidden` : ""}
          >
            <Card style="flex flex-col gap-[12px]" padding={12}>
              {/* image name time */}
              <div className="flex flex-row justify-between w-full">
                <div className="flex flex-row gap-[8px] w-full">
                  <div
                    className="h-[67px] w-[67px] max-h-[67px] cursor-pointer max-w-[67px] min-h-[67px] min-w-[67px] aspect-square overflow-hidden  rounded-full"
                    onClick={() =>
                      router.push(`/companyproflie/${item.Company.username}`)
                    }
                  >
                    {item.Company.image ? (
                      <Image
                        src={item.Company.image}
                        alt="Profile image"
                        // loading="lazy"
                        unoptimized
                        quality={100}
                        width={67}
                        height={67}
                        className="h-[67px] w-[67px] max-h-[67px] max-w-[67px] min-h-[67px] min-w-[67px] object-cover"
                      />
                    ) : (
                      <EmptyAvatar sixtySeven />
                    )}
                  </div>
                  <div className="flex flex-col gap-[4px] w-full">
                    <TextMain
                      text={`Тест ${item.id}`}
                      style="font-medium text-[16px] w-fit cursor-pointer leading-[19.2px] tracking-[-0.015em]"
                      onClick={() => setSelectedId(item.id)}
                    />
                    <TextSecondary
                      text={"@" + item.Company.username}
                      style="font-medium text-[14px] w-fit cursor-pointer leading-[18px] tracking-[-0.015em]"
                      onClick={() =>
                        router.push(`/companyproflie/${item.Company.username}`)
                      }
                    />
                    <TextSecondary
                      text={
                        item.questionsLen +
                        getNoun(item.questionsLen) +
                        " • " +
                        item.VacTestsLen +
                        getNoun2(item.VacTestsLen) +
                        " данный тест"
                      }
                      style="font-medium text-[14px] leading-[18px] tracking-[-0.015em]"
                    />
                  </div>
                  <div className="flex flex-row gap-[2px] items-center h-fit">
                    {item.type === "ai" && (
                      <Helper text="Тест сгенерирован с помощью AI">
                        <AiIcon2 />
                      </Helper>
                    )}
                    <DotsIcon onClick={() => toggle(true)} />
                  </div>
                </div>
              </div>
              {/* image name time */}

              {/* Area */}
              <SkillCard
                area
                hard={false}
                style="mr-[4px]"
                text={item.Area.label}
              />
              {/* Area */}
            </Card>
          </motion.div>
        )}
        {selectedId == item.id && (
          <FullTestModal
            item={item}
            setClose={() => setSelectedId(false)}
            selectedId={selectedId}
          />
        )}
      </LayoutGroup>

      {/* modal */}
      <BottomModal
        isOpen={isOpen}
        handleClose={() => toggle(false)}
        translate="translate(-50%, 0%)"
      >
        <div className="h-full w-full px-[12px] pt-[12px] pb-[24px]">
          <div
            className="bg-[#74899B] bg-opacity-[8%] rounded-[8px] hover:bg-[#647f98] hover:bg-opacity-[15%] cursor-pointer transition duration-[250ms] p-[16px]"
            onClick={() => deleteHanler()}
          >
            <TextMain
              text="Удалить тест"
              style="font-medium text-[16px] leading-[20px] tracking-[-0.015em]"
            />
          </div>
        </div>
      </BottomModal>
      {/* modal */}
    </>
  );
};

export default TestCard;
