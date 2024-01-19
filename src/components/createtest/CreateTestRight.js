"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MaskedInput, getCurrencyMaskGenerator } from "react-hook-mask";
import { useMediaQuery } from "react-responsive";
import { Oval } from "react-loader-spinner";
import "react-toastify/dist/ReactToastify.css";
import { uuid } from "uuidv4";
import { toast } from "react-toastify";

import { ButtonSecondary, OneIconButton } from "../../shared/ui/Button";
import { Input, TextArea } from "../../shared/ui/Input";

import ArrowLeftIcon from "../../shared/icons/ArrowLeftIcon";
import PlusIcon from "../../shared/icons/PlusIcon";
import TrashIcon from "../../shared/icons/TrashIcon";
import CheckIcon from "../../shared/icons/CheckIcon";
import SquarePlus from "../../shared/icons/SquarePlus";
import SquareMinus from "../../shared/icons/SquareMinus";
import CheckBox from "../../shared/ui/CheckBox";
import TextSecondary from "../../shared/Text/TextSecondary";
import SkillCard from "../../shared/ui/SkillCard";
import DropDownWithChoise from "../../shared/ui/DropDownWithChoise";
import AddCityIcon from "../../shared/icons/AddCityIcon";
import { createTest } from "@/server/actions/createtest/createTest";
import DropDownWithSearch from "@/shared/ui/DropDownWithSearch";

const CreateTestRight = ({
  dataToUpdate,
  setDataToUpdate,
  deleteHandler,
  areas,
  area,
  setArea,
  compId,
}) => {
  const router = useRouter();

  const isMobile = useMediaQuery({ query: "(pointer:coarse)" });

  // validate
  const [status, setStatus] = useState(null);
  // validate

  const [littleLoader, setLittleLoader] = useState(false);
  const [state6, setState6] = useState(false);

  return (
    <div className="w-full flex flex-col [@media(hover)]:ml-[276px] [@media(hover)]:mt-[24px] hideScrollbarNavMobile">
      {/* header */}
      <div className="[@media(pointer:coarse)]:fixed [@media(pointer:coarse)]:top-0 [@media(pointer:coarse)]:w-full [@media(pointer:coarse)]:left-0 [@media(pointer:coarse)]:rounded-t-[0px] border-b-[0.7px] border-b-[#E7E7E7] bg-white dark:bg-[#212122] dark:border-b-[#2f2f2f] rounded-t-[20px] p-[12px]">
        <div className="w-full flex flex-row  justify-between [@media(pointer:coarse)]:max-w-[476px] [@media(pointer:coarse)]:mx-auto">
          <OneIconButton onClick={() => router.back()}>
            <ArrowLeftIcon />
          </OneIconButton>

          <div
            onClick={async () => {
              setLittleLoader(true);

              const res = await createTest({
                area,
                test: dataToUpdate,
                compId,
              });

              if (!res) {
                setDataToUpdate([
                  {
                    id: uuid(),
                    question: "",
                    answers: [
                      {
                        id: uuid(),
                        answer: "",
                        rightAnswer: true,
                      },
                    ],
                  },
                ]);
                setArea({ label: "" });

                toast(`✅ Тест успешно создан`, {
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
              } else {
                setStatus(res.message);
              }

              setLittleLoader(false);
            }}
            className={`
              px-[12px] py-[8px] rounded-[16px] cursor-pointer transition duration-[250ms] select-none h-[36px] w-[44px]
              ${
                true
                  ? "bg-[#8295DE] hover:bg-[#5875E8] active:bg-[#3A56C5]"
                  : "bg-[#74899B] bg-opacity-[8%]"
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
      <div
        className={`${"[@media(hover)]:pb-[24px]"} hideScrollbarNavMobile flex flex-col gap-[16px] [@media(pointer:coarse)]:gap-[12px]`}
      >
        {/* первая сосиска */}
        <div className="flex bg-white dark:bg-[#212122] flex-col gap-[16px] p-[12px] [@media(hover)]:rounded-b-[20px] [@media(pointer:coarse)]:rounded-[20px]">
          {status !== null && (
            <div className="w-full text-center">
              <p className="text-[13px] leading-[16px] tracking-[-0.351px] mt-[3px] text-[#F0BB31]">
                {status}
              </p>
            </div>
          )}

          {/* area */}
          <div className="flex flex-col">
            <TextSecondary
              text={"Сфера"}
              style="font-medium text-[14px] select-none leading-[16.8px] tracking-[-0.013em] mb-[6px]"
            />
            <DropDownWithSearch
              state={state6}
              setState={setState6}
              city={area?.label?.length === 0 ? "" : area?.label}
              setCity={(val) => {
                setArea(val);

                if (status !== null) setStatus(null);
              }}
              items={areas}
              placeholder="Выберите сферу"
            />
          </div>
          {/* area */}

          {dataToUpdate?.map((i, key) => (
            <div className="flex flex-col gap-[12px]" key={key}>
              <Input
                placeholder="Введите вопрос"
                label={`Вопрос ${key + 1}`}
                value={i?.question}
                onChange={(val) => {
                  setDataToUpdate(
                    dataToUpdate.map((item, index) =>
                      index === key ? { ...item, question: val } : item
                    )
                  );
                  if (status !== null) setStatus(null);
                }}
              />

              {i?.answers?.map((i2, key2) => (
                <>
                  <div
                    className="flex flex-col w-[calc(100%-24px)] gap-[6px] ml-[24px]"
                    key={key2}
                  >
                    <Input
                      placeholder="Введите вариант ответа"
                      label={`Ответ ${key2 + 1}`}
                      value={i2?.answer}
                      onChange={(val) => {
                        setDataToUpdate(
                          dataToUpdate.map((item, index) =>
                            index === key
                              ? {
                                  ...item,
                                  answers: item.answers.map((item2, index2) =>
                                    index2 === key2
                                      ? { ...item2, answer: val }
                                      : item2
                                  ),
                                }
                              : item
                          )
                        );
                        if (status !== null) setStatus(null);
                      }}
                    />
                    <div className="flex flex-row items-center">
                      <CheckBox
                        active={i2.rightAnswer}
                        onClick={() => {
                          setDataToUpdate(
                            dataToUpdate.map((item, index) =>
                              index === key
                                ? {
                                    ...item,
                                    answers: item.answers.map((item2, index2) =>
                                      index2 === key2
                                        ? { ...item2, rightAnswer: true }
                                        : { ...item2, rightAnswer: false }
                                    ),
                                  }
                                : item
                            )
                          );
                          if (res !== null) setStatus(null);
                        }}
                      />
                      <TextSecondary
                        text="Правильный ответ"
                        style="font-medium text-[14px] select-none leading-[16.8px] tracking-[-0.013em] ml-[6px]"
                      />
                    </div>
                    <div className="flex flex-row items-center gap-[24px]">
                      {i.answers.length === key2 + 1 && (
                        <div className="flex flex-row items-center">
                          <SquarePlus
                            styled={"mt-[-6px]"}
                            onClick={() => {
                              setDataToUpdate(
                                dataToUpdate.map((item, index) =>
                                  index === key
                                    ? {
                                        ...item,
                                        answers: [
                                          ...item.answers,
                                          {
                                            id: uuid(),
                                            answer: "",
                                            rightAnswer: false,
                                          },
                                        ],
                                      }
                                    : item
                                )
                              );
                              if (status !== null) setStatus(null);
                            }}
                          />

                          <TextSecondary
                            text="Добавить вариант ответа"
                            style="font-medium text-[14px] select-none leading-[16.8px] tracking-[-0.013em] ml-[6px]"
                          />
                        </div>
                      )}
                      {i.answers.length > 1 && (
                        <div className="flex flex-row items-center">
                          <SquareMinus
                            styled={"mt-[-6px]"}
                            onClick={() => {
                              setDataToUpdate(
                                dataToUpdate.map((item, index) =>
                                  index === key
                                    ? {
                                        ...item,
                                        answers: item?.answers?.filter(
                                          (item2) => item2.id !== i2.id
                                        ),
                                      }
                                    : item
                                )
                              );
                              if (status !== null) setStatus(null);
                            }}
                          />

                          <TextSecondary
                            text="Удалить"
                            style="font-medium text-[14px] select-none leading-[16.8px] tracking-[-0.013em] ml-[6px]"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </>
              ))}

              {dataToUpdate?.length === key + 1 ? (
                <div className="flex flex-row gap-[8px]">
                  <ButtonSecondary
                    small
                    text="Добавить вопрос"
                    style="w-fit px-[12px]"
                    onClick={() => {
                      setDataToUpdate([
                        ...dataToUpdate,
                        {
                          id: uuid(),
                          question: "",
                          answers: [
                            {
                              id: uuid(),
                              answer: "",
                              rightAnswer: true,
                            },
                          ],
                        },
                      ]);
                      if (status !== null) setStatus(null);
                    }}
                  >
                    <PlusIcon />
                  </ButtonSecondary>

                  {dataToUpdate.length > 1 && (
                    <ButtonSecondary
                      style="w-fit px-[12px]"
                      small
                      text=""
                      onClick={() => {
                        deleteHandler(i.id, setDataToUpdate, dataToUpdate);
                        if (status !== null) setStatus(null);
                      }}
                    >
                      <TrashIcon />
                    </ButtonSecondary>
                  )}
                </div>
              ) : (
                <div className="flex flex-row gap-[8px]">
                  <ButtonSecondary
                    style="w-fit px-[12px]"
                    small
                    text=""
                    onClick={() => {
                      deleteHandler(i.id, setDataToUpdate, dataToUpdate);
                      if (status !== null) setStatus(null);
                    }}
                  >
                    <TrashIcon />
                  </ButtonSecondary>
                </div>
              )}
            </div>
          ))}
        </div>
        {/* первая сосиска */}
      </div>
      {/* body */}
    </div>
  );
};

export default CreateTestRight;
