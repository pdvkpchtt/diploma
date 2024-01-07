"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

import TextMain from "../Text/TextMain";
import TextSecondary from "../Text/TextSecondary";
import Card from "./Card";
import SkillCard from "./SkillCard";
import EmptyAvatar from "./EmptyAvatar";
import { useRouter } from "next/navigation";
import BottomModal from "./BottomModal";
import DeleteVacContent from "./DeleteVacContent";

import BookmarkIcon from "../icons/BookmarkIcon";
import DotsIcon from "../icons/DotsIcon";

const VacancyCard = ({ item, role = "student", userId }) => {
  const router = useRouter();

  const [isOpen, toggle] = useState(false);
  const [deleted, setDeleted] = useState(false);

  return (
    <>
      {!deleted && (
        <motion.div layoutId={item.id}>
          <Card style="flex flex-col gap-[12px]" padding={12}>
            {/* image name time */}
            <div className="flex flex-row justify-between">
              <div className="flex flex-row gap-[12px]">
                <div className="min-w-[67px] h-[67px] aspect-square w-[67px] min-h-[67px]  max-w-[67px] max-h-[67px] overflow-hidden rounded-full">
                  {item?.Company?.image ? (
                    <Image
                      src={item.Company.image}
                      width={67}
                      unoptimized
                      height={67}
                      alt="Profile image"
                      className="min-w-[67px] max-w-[67px] object-cover max-h-[67px] h-[67px] w-[67px] min-h-[67px]"
                    />
                  ) : (
                    <EmptyAvatar sixtySeven />
                  )}
                </div>
                <div className="flex flex-col gap-[4px]">
                  <div className="flex items-center flex-row text-[#8f8f8f] flex-wrap font-medium text-[14px] cursor-pointer leading-[18px] tracking-[-0.182px]">
                    <p
                      onClick={() =>
                        router.push(
                          `/companyprofile/${
                            item.Company.username.length === 0
                              ? item.Company.id
                              : item.Company.username
                          }`
                        )
                      }
                      className="text-[#8f8f8f] font-medium break-all text-[14px] cursor-pointer leading-[18px] tracking-[-0.182px]"
                    >
                      {item.Company.username.length === 0
                        ? `@${item.Company.id}`
                        : `@${item.Company.username}`}
                    </p>
                    {item.hrCreator && (
                      <>
                        &nbsp;•&nbsp;
                        {item?.myVac ? (
                          <p
                            className="font-medium text-[#5875e8] text-[14px] break-all cursor-pointer leading-[18px] tracking-[-0.182px] break-words"
                            onClick={() =>
                              router.push(`/profile/${item.hrCreator.username}`)
                            }
                          >
                            {"@" + item.hrCreator.username}
                          </p>
                        ) : (
                          <TextSecondary
                            onClick={() =>
                              router.push(`/profile/${item.hrCreator.username}`)
                            }
                            text={"@" + item.hrCreator.username}
                            style="font-medium text-[14px] break-all cursor-pointer leading-[18px] tracking-[-0.182px]"
                          />
                        )}
                      </>
                    )}
                  </div>

                  {item.currency ? (
                    <p className="font-medium text-[14px] leading-[18px] tracking-[-0.013em] break-words text-[#8f8f8f]">
                      {item.salaryStart && `от ${item.salaryStart}`}
                      {item.salaryEnd && ` до ${item.salaryEnd}`}{" "}
                      {item.currency?.label}
                    </p>
                  ) : (
                    <p className="font-medium text-[14px] leading-[18px] tracking-[-0.013em] break-words text-[#8f8f8f]">
                      По договоренности
                      {item.Location.length > 0 && <> • </>}
                    </p>
                  )}

                  {item?.contract?.label && (
                    <p className="font-medium text-[14px] leading-[18px] tracking-[-0.013em] break-words text-[#8f8f8f]">
                      {item.contract.label}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-row gap-[8px] items-center h-fit">
                <div className="flex flex-row gap-[4px] items-center">
                  {item?.partOfTeam?.userId && (
                    <DotsIcon onClick={() => toggle(true)} />
                  )}
                  {(role === "student" || role.includes("hr")) && (
                    <BookmarkIcon item={item} userId={userId} />
                  )}
                </div>
              </div>
            </div>
            {/* image name time */}

            {/* name and short desc */}

            <a href={`/vacancy/${item.id}`} target="_blank">
              <TextMain
                text={item.name}
                style="font-medium cursor-pointer text-[16px] leading-[19.2px] tracking-[-0.24px]"
                // onClick={() => router.push()}
              />
            </a>
            {item.shortDescription && (
              <TextSecondary
                text={item.shortDescription}
                style={
                  "text-[14px] leading-[17px] whitespace-pre-line tracking-[-0.252px]"
                }
              />
            )}
            {/* name and short desc */}

            {/* skills */}
            {(item.VacancySkills.length > 0 || item.vacArea.length > 0) && (
              <div className="flex flex-col gap-[8px]">
                <div className="flex flex-row flex-wrap overflow-hidden gap-[8px] h-[24px] [@media(pointer:coarse)]:h-fit [@media(pointer:coarse)]:max-h-[56px]">
                  {item.vacArea.length > 0 &&
                    item.vacArea.map((item) => (
                      <SkillCard
                        area
                        hard={false}
                        key={item.id}
                        style="mr-[4px]"
                        text={item.label}
                      />
                    ))}
                  {item.VacancySkills.length > 0 &&
                    item.VacancySkills.map(
                      (item) =>
                        item.type === "hard" && (
                          <SkillCard
                            hard={item.type == "hard"}
                            soft={item.type == "soft"}
                            key={item.id}
                            style="mr-[4px]"
                            text={item.name}
                          />
                        )
                    )}
                  {item.VacancySkills.length > 0 &&
                    item.VacancySkills.map(
                      (item) =>
                        item.type === "soft" && (
                          <SkillCard
                            hard={item.type == "hard"}
                            soft={item.type == "soft"}
                            key={item.id}
                            style="mr-[4px]"
                            text={item.name}
                          />
                        )
                    )}
                </div>
              </div>
            )}
            {/* skills */}
          </Card>
        </motion.div>
      )}

      {/* modal */}
      <BottomModal
        isOpen={isOpen}
        handleClose={() => toggle(false)}
        translate="translate(-50%, 0%)"
      >
        <DeleteVacContent
          id={item.id}
          setDeleted={() => setDeleted(true)}
          handleClose={() => toggle(false)}
        />
      </BottomModal>
      {/* modal */}
    </>
  );
};

export default VacancyCard;
