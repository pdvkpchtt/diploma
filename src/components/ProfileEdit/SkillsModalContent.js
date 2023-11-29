"use client";

import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

import Modal from "../../shared/ui/Modal";
import MobileModal from "../../shared/ui/MobileModal";
import { OneIconButton } from "../../shared/ui/Button";
import PickSkillCard from "../../shared/ui/PicSkillCard";
import TextSecondary from "../../shared/Text/TextSecondary";
import { Input } from "../../shared/ui/Input";
import Card from "../../shared/ui/Card";

import Cross2 from "../../shared/icons/Cross2";
import ArrowLeftIcon from "../../shared/icons/ArrowLeftIcon";

const SkillsModalContent = ({
  isOpen = false,
  handleClose = () => {},
  data,
  skills,
  forVacancy = false,
  setDataToUpdate = () => {},
  dataToUpdate,
}) => {
  const [filteredSkills, setFilteredSkills] = useState(
    skills?.skills?.filter((i) => !data.find((i2) => i.name === i2.name))
  );
  const [filteredSkills2, setFilteredSkills2] = useState(
    skills?.skills?.filter((i) => !data.find((i2) => i.name === i2.name))
  );

  const [hardInput, setHardInput] = useState("");
  const [softInput, setSoftInput] = useState("");

  const removeHandler = (item) => {
    !forVacancy
      ? setDataToUpdate({
          ...dataToUpdate,
          UserSkills: data.filter((i) => i.id !== item.id),
        })
      : setDataToUpdate({
          ...dataToUpdate,
          VacancySkills: data.filter((i) => i.id !== item.id),
        });
  };

  const addHandler = (item) => {
    const foundSkills = data.filter((i) => i.name === item.name);
    if (foundSkills.length == 0) {
      if (!forVacancy)
        setDataToUpdate({
          ...dataToUpdate,
          UserSkills: [...dataToUpdate.UserSkills, item],
        });
      else
        setDataToUpdate({
          ...dataToUpdate,
          VacancySkills: [...dataToUpdate.VacancySkills, item],
        });
    }
  };

  return (
    <>
      <Modal isOpen={isOpen}>
        {/* header */}
        <div className="flex flex-row justify-end w-full mb-[16px]">
          <Cross2 onClick={handleClose} />
        </div>
        {/* header */}

        {/* body */}
        <div className="flex flex-col gap-[16px]">
          {data.filter((item) => item.type !== "soft").length > 0 && (
            <div className="flex flex-col gap-[8px]">
              <TextSecondary
                text={"Хард-скиллы"}
                style="font-medium text-[14px] leading-[18px] tracking-[-0.013em] whitespace-nowrap"
              />

              <div className="flex flex-row gap-[8px] flex-wrap">
                {data.map(
                  (item) =>
                    item.type === "hard" && (
                      <PickSkillCard
                        hard
                        text={item.name}
                        key={item.id}
                        del
                        onClick={() => removeHandler(item)}
                      />
                    )
                )}
              </div>
            </div>
          )}

          {data.filter((item) => item.type !== "hard").length > 0 && (
            <div className="flex flex-col gap-[8px]">
              <TextSecondary
                text={"Софт-скиллы"}
                style="font-medium text-[14px] leading-[18px] tracking-[-0.013em] whitespace-nowrap"
              />

              <div className="flex flex-row gap-[8px] flex-wrap">
                {data.map(
                  (item) =>
                    item.type === "soft" && (
                      <PickSkillCard
                        hard={false}
                        text={item.name}
                        key={item.id}
                        del
                        onClick={() => removeHandler(item)}
                      />
                    )
                )}
              </div>
            </div>
          )}
        </div>

        <div
          className={`flex flex-col gap-[16px] ${
            data.length > 0 && "mt-[24px]"
          }`}
        >
          <Input
            placeholder="Python"
            label="Поиск хард-скиллов"
            value={hardInput}
            onChange={(e) => {
              console.log("s");
              setHardInput(e);
              setFilteredSkills(
                skills?.skills?.filter(
                  (item) =>
                    item.type === "hard" &&
                    item.name.toLowerCase().includes(e.toLowerCase())
                )
              );
            }}
          />

          <div className="flex flex-row gap-[8px] flex-wrap max-h-[56px] overflow-hidden">
            {filteredSkills
              ?.filter((i) => !data.find((i2) => i.name === i2.name))
              .map(
                (item, key) =>
                  item.type === "hard" && (
                    <PickSkillCard
                      key={key}
                      text={item.name}
                      onClick={() => addHandler(item)}
                    />
                  )
              )}
          </div>
        </div>

        <div className="flex flex-col gap-[16px] mt-[24px]">
          <Input
            placeholder="Лидерские качества"
            label="Поиск софт-скиллов"
            value={softInput}
            onChange={(e) => {
              setSoftInput(e);
              setFilteredSkills2(
                skills?.skills?.filter(
                  (item) =>
                    item.type == "soft" &&
                    item.name.toLowerCase().includes(e.toLowerCase())
                )
              );
            }}
          />

          <div className="flex flex-row gap-[8px] flex-wrap  max-h-[56px] overflow-hidden">
            {filteredSkills2
              ?.filter((i) => !data.find((i2) => i.name === i2.name))
              .map(
                (item, key) =>
                  item.type === "soft" && (
                    <PickSkillCard
                      key={key}
                      text={item.name}
                      onClick={() => addHandler(item)}
                    />
                  )
              )}
          </div>
        </div>
        {/* body */}
      </Modal>

      <MobileModal isOpen={isOpen} slideToLeft>
        {/* header */}
        <div className="[@media(pointer:coarse)]:fixed z-[400] [@media(pointer:coarse)]:top-0 [@media(pointer:coarse)]:w-full [@media(pointer:coarse)]:left-0 [@media(pointer:coarse)]:rounded-t-[0px] border-b-[0.7px] border-b-[#E7E7E7] dark:border-b-[#2f2f2f] bg-white dark:bg-[#212122] rounded-t-[20px] p-[12px]">
          <div className="items-center w-full flex flex-row justify-between [@media(pointer:coarse)]:max-w-[476px] [@media(pointer:coarse)]:mx-auto">
            <OneIconButton onClick={handleClose}>
              <ArrowLeftIcon />
            </OneIconButton>
          </div>
        </div>
        {/* header */}

        {/* body */}
        <div className="mt-[61px] p-[12px] overflow-y-scroll h-[100vh]">
          {data.length > 0 && (
            <Card style="flex flex-col gap-[16px]">
              {data.filter((item) => item.type !== "soft").length > 0 && (
                <div className="flex flex-col gap-[8px]">
                  <TextSecondary
                    text={"Хард-скиллы"}
                    style="font-medium text-[14px] leading-[18px] tracking-[-0.013em] whitespace-nowrap"
                  />

                  <div className="flex flex-row gap-[8px] flex-wrap">
                    {data.map(
                      (item) =>
                        item.type === "hard" && (
                          <PickSkillCard
                            hard
                            text={item.name}
                            key={item.id}
                            del
                            onClick={() => removeHandler(item)}
                          />
                        )
                    )}
                  </div>
                </div>
              )}

              {data.filter((item) => item.type !== "hard").length > 0 && (
                <div className="flex flex-col gap-[8px]">
                  <TextSecondary
                    text={"Софт-скиллы"}
                    style="font-medium text-[14px] leading-[18px] tracking-[-0.013em] whitespace-nowrap"
                  />

                  <div className="flex flex-row gap-[8px] flex-wrap">
                    {data.map(
                      (item) =>
                        item.type === "soft" && (
                          <PickSkillCard
                            text={item.name}
                            hard={false}
                            key={item.id}
                            del
                            onClick={() => removeHandler(item)}
                          />
                        )
                    )}
                  </div>
                </div>
              )}
            </Card>
          )}

          <Card
            style={`flex flex-col gap-[16px] ${data.length > 0 && "mt-[24px]"}`}
          >
            <Input
              placeholder="Python"
              label="Поиск хард-скиллов"
              value={hardInput}
              onChange={(e) => {
                setHardInput(e);
                setFilteredSkills(
                  skills?.skills?.filter(
                    (item) =>
                      item.type === "hard" &&
                      item.name.toLowerCase().includes(e.toLowerCase())
                  )
                );
              }}
            />
            <div className="flex flex-row gap-[8px] flex-wrap max-h-[120px] overflow-hidden">
              {filteredSkills
                ?.filter((i) => !data.find((i2) => i.name === i2.name))
                .map(
                  (item, key) =>
                    item.type === "hard" && (
                      <PickSkillCard
                        key={key}
                        text={item.name}
                        onClick={() => addHandler(item)}
                      />
                    )
                )}
            </div>
          </Card>

          <Card style="flex flex-col gap-[16px] mt-[24px] mb-[61px]">
            <Input
              placeholder="Лидерские качества"
              label="Поиск софт-скиллов"
              value={softInput}
              onChange={(e) => {
                setSoftInput(e);
                setFilteredSkills2(
                  skills?.skills?.filter(
                    (item) =>
                      item.type == "soft" &&
                      item.name.toLowerCase().includes(e.toLowerCase())
                  )
                );
              }}
            />

            <div className="flex flex-row gap-[8px] flex-wrap max-h-[120px] overflow-hidden">
              {filteredSkills2
                ?.filter((i) => !data.find((i2) => i.name === i2.name))
                .map(
                  (item, key) =>
                    item.type === "soft" && (
                      <PickSkillCard
                        key={key}
                        text={item.name}
                        onClick={() => addHandler(item)}
                      />
                    )
                )}
            </div>
          </Card>
        </div>

        {/* body */}
      </MobileModal>
    </>
  );
};

export default SkillsModalContent;
