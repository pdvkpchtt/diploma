"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Oval } from "react-loader-spinner";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

import { OneIconButton } from "../../shared/ui/Button";
import { Input, TextArea } from "../../shared/ui/Input";
import SkillCard from "../../shared/ui/SkillCard";
import TextSecondary from "../../shared/Text/TextSecondary";
import SkillsModalVacs from "./SkillsModalVacs";
import DropDownWithSearch from "../../shared/ui/DropDownWithSearch";
import DropDownWithChoise from "../../shared/ui/DropDownWithChoise";

import CheckIcon from "../../shared/icons/CheckIcon";
import ArrowLeftIcon from "../../shared/icons/ArrowLeftIcon";
import AddCityIcon from "../../shared/icons/AddCityIcon";

const EditRight = ({
  data,
  updateProfileData,
  dataToCompare,
  setDataToUpdate,
  educationLevelData,
  dataToUpdate,
  areas,
  skills,
  status,
  setStatus,
}) => {
  const router = useRouter();
  const isMobile = useMediaQuery({ query: "(pointer:coarse)" });

  const [isOpen, toggle] = useState(false);
  const [state, setState] = useState(false);
  const [littleLoader, setLittleLoader] = useState(false);

  // это основополагающий базис
  let isDataChanged =
    JSON.stringify(dataToUpdate) !== JSON.stringify(dataToCompare);
  console.log(isDataChanged, "changed ornot");
  // это основополагающий базис

  return (
    <div className="w-full flex flex-col [@media(pointer:coarse)]:mt-[-24px] [@media(hover)]:mt-[24px]">
      {/* header */}
      <div
        className={`[@media(pointer:coarse)]:fixed ${
          isOpen
            ? "[@media(pointer:coarse)]:z-[-1]"
            : "[@media(pointer:coarse)]:z-[300]"
        } [@media(pointer:coarse)]:top-0 [@media(pointer:coarse)]:w-full [@media(pointer:coarse)]:left-0 [@media(pointer:coarse)]:rounded-t-[0px] border-b-[0.7px] border-b-[#E7E7E7] bg-white dark:bg-[#212122] dark:border-b-[#2f2f2f] rounded-t-[20px] p-[12px]`}
      >
        <div className="w-full flex flex-row justify-between [@media(pointer:coarse)]:max-w-[476px] [@media(pointer:coarse)]:mx-auto">
          <OneIconButton
            onClick={() =>
              router.push("/profile", { query: { data: "update" } })
            }
          >
            <ArrowLeftIcon />
          </OneIconButton>

          <div
            onClick={async () => {
              if (isDataChanged) {
                setLittleLoader(true);
                const res = await updateProfileData({
                  ...dataToUpdate,
                  UserSkills: dataToUpdate.UserSkills.map(
                    (item) => true && { skillId: item.id }
                  ),
                });
                console.log(res?.message, "ass");
                setStatus(res?.message);
                if (res?.submsg)
                  setStatus(
                    res?.message
                      ? [...res?.message, res?.submsg]
                      : [res?.submsg]
                  );
                if (!res) {
                  toast(`💾 Изменения сохранены`, {
                    position: isMobile ? "top-center" : "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    // theme: "dark",
                    progressStyle: { background: "#5875e8" },
                    containerId: "forCopy",
                  });
                  router.refresh();
                  setLittleLoader(false);
                } else {
                  setLittleLoader(false);
                  toast(`🙇 Cорри, что-то пропущено`, {
                    position: isMobile ? "top-center" : "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    // theme: "dark",
                    progressStyle: { background: "#5875e8" },
                    containerId: "forCopy",
                  });
                  router.refresh();
                  setLittleLoader(false);
                }
              }
            }}
            className={`
                px-[12px] py-[8px] rounded-[16px] transition duration-[250ms] select-none w-fit
                ${
                  isDataChanged
                    ? "bg-[#5875e8] hover:bg-[#3A56C5] active:bg-[#2C429C] cursor-pointer"
                    : "bg-[#74899B] bg-opacity-[8%] cursor-default"
                }
              `}
          >
            {littleLoader ? (
              <Oval
                height={19}
                width={19}
                color="#fff"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="rgba(255,255,255, 0.3)"
                strokeWidth={6}
                strokeWidthSecondary={6}
              />
            ) : (
              <CheckIcon fill={true ? "#fff" : "#bfbfbf"} />
            )}
          </div>
        </div>
      </div>
      {/* header */}

      {/* body */}
      <div className="p-[12px] flex flex-col gap-[16px] rounded-b-[20px] [@media(pointer:coarse)]:rounded-[20px] bg-white dark:bg-[#212122]">
        {/* about me */}
        <TextArea
          placeholder="Расскажите о ваших мечтах и карьерных планах"
          label="Обо мне"
          value={dataToUpdate.about}
          caption={
            !status
              ? null
              : status?.includes("inputAbout maxlen")
              ? "Максимальная длинна поля 120 сиволов"
              : null
          }
          onChange={(about) => {
            setDataToUpdate({
              ...dataToUpdate,
              about: about,
            });
            if (status)
              setStatus(status.filter((i) => !i.includes("inputAbout")));
          }}
        />
        {/* about me */}

        {/* EducationLevel */}
        <div className="flex flex-col w-full">
          <TextSecondary
            text={"Высшее образование"}
            style="font-medium text-[14px] select-none leading-[16.8px] tracking-[-0.013em] mb-[6px]"
          />
          <DropDownWithSearch
            city={
              dataToUpdate?.educationLevel === null
                ? ""
                : dataToUpdate?.educationLevel?.label
            }
            setCity={(val) => {
              setDataToUpdate({
                ...dataToUpdate,
                educationLevel: val,
              });
            }}
            items={educationLevelData}
            placeholder={"Да/Нет"}
          />
        </div>
        {/* EducationLevel */}

        {/* area */}
        <div className="flex flex-col relative">
          <TextSecondary
            text={"Сфера"}
            style="font-medium text-[14px] select-none leading-[16.8px] tracking-[-0.013em] mb-[6px]"
          />
          {dataToUpdate.UserArea.length > 0 ? (
            <div className="flex-wrap flex flex-row gap-[10px]">
              {dataToUpdate.UserArea.map((item, key) => (
                <SkillCard
                  key={key}
                  onClick={() => setState(true)}
                  noCopy
                  area
                  hard={false}
                  text={item.label}
                />
              ))}
            </div>
          ) : (
            <AddCityIcon area onClick={() => setState(true)} />
          )}
          <DropDownWithChoise
            state={state}
            setState={setState}
            city={dataToUpdate?.UserArea}
            setCity={(val) => {
              setDataToUpdate({
                ...dataToUpdate,
                UserArea: val,
              });
            }}
            items={areas}
            placeholder="Не выбрано"
          />
        </div>
        {/* area */}

        {/* skills */}
        <div className="flex flex-col relative gap-[16px]">
          {dataToUpdate.UserSkills.length === 0 ? (
            <div className="flex flex-col">
              <TextSecondary
                text={"Скиллы"}
                style="font-medium text-[14px] select-none leading-[16.8px] tracking-[-0.013em] mb-[6px]"
              />
              <AddCityIcon onClick={() => toggle(true)} />
            </div>
          ) : (
            <>
              {dataToUpdate.UserSkills.filter((item) => item.type !== "soft")
                .length > 0 && (
                <div className="flex flex-col gap-[8px]">
                  <TextSecondary
                    text={"Хард-скиллы"}
                    style="font-medium text-[14px] leading-[18px] tracking-[-0.013em] whitespace-nowrap"
                  />

                  <div className="flex flex-row gap-[8px] flex-wrap">
                    {dataToUpdate.UserSkills.map(
                      (item) =>
                        item.type === "hard" && (
                          <SkillCard
                            noCopy
                            onClick={() => toggle(true)}
                            text={item.name}
                            key={item.id}
                          />
                        )
                    )}
                  </div>
                </div>
              )}
              {dataToUpdate.UserSkills.filter((item) => item.type !== "hard")
                .length > 0 && (
                <div className="flex flex-col gap-[8px]">
                  <TextSecondary
                    text={"Софт-скиллы"}
                    style="font-medium text-[14px] leading-[18px] tracking-[-0.013em] whitespace-nowrap"
                  />

                  <div className="flex flex-row gap-[8px] flex-wrap">
                    {dataToUpdate.UserSkills.map(
                      (item) =>
                        item.type === "soft" && (
                          <SkillCard
                            noCopy
                            onClick={() => toggle(true)}
                            soft
                            hard={false}
                            text={item.name}
                            key={item.id}
                          />
                        )
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        {/* skills */}
      </div>
      {/* body */}

      {/* skills modal */}
      <SkillsModalVacs
        withAreas
        areas={dataToUpdate.UserArea}
        data={dataToUpdate.UserSkills}
        isOpen={isOpen}
        handleClose={() => toggle(false)}
        setDataToUpdate={setDataToUpdate}
        dataToUpdate={dataToUpdate}
        skills={skills}
      />
      {/* skills modal */}
    </div>
  );
};

export default EditRight;
