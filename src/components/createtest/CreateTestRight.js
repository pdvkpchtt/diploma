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
import SquarePlus from "@/shared/icons/SquarePlus";
import SquareMinus from "@/shared/icons/SquareMinus";
import CheckBox from "@/shared/ui/CheckBox";
import TextSecondary from "@/shared/Text/TextSecondary";

const CreateVacancyRight = ({
  dataToUpdate,
  setDataToUpdate,
  deleteHandler,
}) => {
  const router = useRouter();

  const isMobile = useMediaQuery({ query: "(pointer:coarse)" });

  // validate
  const [status, setStatus] = useState(null);
  // validate

  const [littleLoader, setLittleLoader] = useState(false);

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
              // const res = await createVacancyHandler({
              //   ...dataToUpdate,
              //   VacancySkills: dataToUpdate.VacancySkills.map(
              //     (item) =>
              //       true && {
              //         name: item?.name,
              //         type: item.type,
              //         area: item?.area?.label,
              //       }
              //   ),
              // });
              // console.log(res, "asswe");
              // setStatus(res?.message);
              // if (!res) {
              //   toast(`💼 Вакансия создана`, {
              //     position: isMobile ? "top-center" : "bottom-right",
              //     autoClose: 4000,
              //     hideProgressBar: true,
              //     closeOnClick: true,
              //     pauseOnHover: false,
              //     draggable: true,
              //     progress: undefined,
              //     // theme: "dark",
              //     progressStyle: { background: "#5875e8" },
              //     containerId: "forCopy",
              //   });
              //   setDataToUpdate({
              //     name: "",
              //     shortDescription: "",
              //     description: "",
              //     conditions: "",
              //     waitings: "",
              //     vacArea: [],
              //     format: { label: "" },
              //     contract: { label: "" },
              //     experience: { label: "" },
              //     EducationLevel: { label: "" },
              //     salaryStart: "",
              //     salaryEnd: "",
              //     currency: { label: "" },
              //     VacancySkills: [],
              //     distantWork: false,

              //     priceByTalk: false,
              //   });
              //   router.refresh();
              //   setLittleLoader(false);
              // } else {
              //   setLittleLoader(false);
              //   toast(`🙇 Cорри, что-то пропущено`, {
              //     position: isMobile ? "top-center" : "bottom-right",
              //     autoClose: 4000,
              //     hideProgressBar: true,
              //     closeOnClick: true,
              //     pauseOnHover: false,
              //     draggable: true,
              //     progress: undefined,
              //     // theme: "dark",
              //     progressStyle: { background: "#5875e8" },
              //     containerId: "forCopy",
              //   });

              //   setLittleLoader(false);
              // }
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
        className={`${"[@media(hover)]:h-fit"} [@media(hover)]:max-h-[calc(100%)] hideScrollbarNavMobile  [@media(hover)]:overflow-y-auto flex flex-col gap-[16px] [@media(pointer:coarse)]:gap-[12px]`}
      >
        {/* первая сосиска */}
        <div className="flex bg-white dark:bg-[#212122] flex-col gap-[16px] p-[12px] [@media(hover)]:rounded-b-[20px] [@media(pointer:coarse)]:rounded-[20px]">
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
                      }}
                    />
                    <div className="flex flex-row items-center">
                      <CheckBox
                        active={i2.rightAnswer}
                        onClick={() =>
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
                          )
                        }
                      />
                      <TextSecondary
                        text="Правильный ответ"
                        style="font-medium text-[14px] select-none leading-[16.8px] tracking-[-0.013em] ml-[6px]"
                      />
                    </div>
                    <div className="flex flex-row items-center gap-[24px]">
                      <div className="flex flex-row items-center">
                        <SquarePlus
                          styled={"mt-[-6px]"}
                          onClick={() =>
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
                            )
                          }
                        />

                        <TextSecondary
                          text="Добавить вариант ответа"
                          style="font-medium text-[14px] select-none leading-[16.8px] tracking-[-0.013em] ml-[6px]"
                        />
                      </div>
                      {key2 !== 0 && (
                        <div className="flex flex-row items-center">
                          <SquareMinus
                            styled={"mt-[-6px]"}
                            onClick={() =>
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
                              )
                            }
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
                              rightAnswer: false,
                            },
                          ],
                        },
                      ]);
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

export default CreateVacancyRight;
