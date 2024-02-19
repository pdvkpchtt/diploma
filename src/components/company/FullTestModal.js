"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";

import TextMain from "../../shared/Text/TextMain";
import TextSecondary from "../../shared/Text/TextSecondary";
import EmptyAvatar from "../../shared/ui/EmptyAvatar";

import Cross2 from "../../shared/icons/Cross2";
import AiIcon2 from "@/shared/icons/AiIcon2";
import Helper from "@/shared/ui/Helper";
import SkillCard from "@/shared/ui/SkillCard";

const modalVariant = {
  initial: { opacity: 0 },
  isOpen: { opacity: 1 },
  exit: { opacity: 0 },
};

const FullTestModal = ({ item, setClose = () => {}, selectedId }) => {
  const router = useRouter();

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
      <motion.div className="fixed [@media(pointer:coarse)]:hidden top-0 left-0 w-full h-full dark:bg-opacity-[50%] bg-opacity-[20%] z-[100]">
        <motion.div
          initial={"initial"}
          animate={"isOpen"}
          exit={"exit"}
          onClick={setClose}
          variants={modalVariant}
          className="fixed [@media(pointer:coarse)]:hidden top-0 left-0 w-full h-full bg-[#4A5479] dark:bg-black dark:bg-opacity-[50%] bg-opacity-[20%] z-[-1]"
        ></motion.div>
        <motion.div
          layoutId={selectedId}
          className="w-[630px] h-fit max-h-[calc(100%-172px)] mx-auto mt-[86px] z-[500] shadow-2xl overflow-y-auto hideScrollbarNav dark:bg-[#141414] bg-[#F6F6F8] bottom-0 p-[12px] rounded-[20px]"
        >
          <div className="flex flex-col gap-[12px]">
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
                    style="font-medium text-[16px] w-fit leading-[19.2px] tracking-[-0.015em]"
                  />
                  <TextSecondary
                    text={"@" + item.Company.username}
                    style="font-medium text-[14px] cursor-pointer w-fit leading-[18px] tracking-[-0.015em]"
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
                <div className="flex flex-row gap-[6px] items-center h-fit">
                  {item.type === "ai" && <AiIcon2 />}
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

            <div className="flex flex-col gap-[12px] mt-[24px]">
              {item.questions.map((i, key) => (
                <div className="flex flex-col gap-[6px] w-full">
                  <TextMain
                    text={`${key + 1}. ${i.text}`}
                    style="font-medium text-[16px] w-fit leading-[19.2px] tracking-[-0.015em]"
                  />

                  <div className="flex flex-col gap-[3px] ml-[24px]">
                    {i.answers.map((i2, key) => (
                      <p
                        className={`${
                          i2.rightAnswer ? "text-[#42af44]" : "text-[#8f8f8f]"
                        } font-medium text-[14px] leading-[18px] tracking-[-0.015em]`}
                      >
                        {key + 1 + ". " + i2.text}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default FullTestModal;
