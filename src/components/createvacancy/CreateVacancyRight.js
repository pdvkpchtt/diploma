"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MaskedInput, getCurrencyMaskGenerator } from "react-hook-mask";
import { useMediaQuery } from "react-responsive";
import { Oval } from "react-loader-spinner";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

import { OneIconButton } from "../../shared/ui/Button";
import { Input, TextArea } from "../../shared/ui/Input";
import SkillCard from "../../shared/ui/SkillCard";
import TextSecondary from "../../shared/Text/TextSecondary";
import { createVacancyHandler } from "../../server/actions/company/createVacancyHandler";
import { fetchVacancyData } from "../../server/actions/vacancy/fetchVacancyData";
import CustomLoader from "../../shared/ui/CustomLoader";
import Card from "../../shared/ui/Card";
import DropDownWithSearch from "../../shared/ui/DropDownWithSearch";
import DropDownWithChoise from "../../shared/ui/DropDownWithChoise";
import SkillsDropDown from "../../shared/ui/SkillsDropDown";
import CheckBox from "../../shared/ui/CheckBox";

import CheckIcon from "../../shared/icons/CheckIcon";
import ArrowLeftIcon from "../../shared/icons/ArrowLeftIcon";
import AddCityIcon from "../../shared/icons/AddCityIcon";
import AddSkillIcon from "../../shared/icons/AddSkillIcon";
import { fetchTests } from "@/server/actions/company/fetchTests";
import { LayoutGroup } from "framer-motion";
import TestCard from "@/shared/ui/TestCard";
import { Waypoint } from "react-waypoint";
import TestCard2 from "@/shared/ui/TestCard2";

const maskGenerator = getCurrencyMaskGenerator({
  prefix: "",
  thousandSeparator: " ",
});

const CreateVacancyRight = ({
  cdata,
  dataToUpdate,
  setDataToUpdate,
  skills,
}) => {
  const router = useRouter();

  const isMobile = useMediaQuery({ query: "(pointer:coarse)" });
  console.log(dataToUpdate.VacancySkills);

  // validate
  const [status, setStatus] = useState(null);
  // validate

  const [littleLoader, setLittleLoader] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [isOpen, toggle] = useState(false);
  const [isOpen2, toggle2] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dropData, setDropData] = useState([]);
  const [state6, setState6] = useState(false);
  const [users, setUsers] = useState(null);
  const [cursor, setCursor] = useState("");
  const [hasNextPage, setHasNextPage] = useState(true);
  const [selectedId, setSelectedId] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    const data = await fetchVacancyData();
    console.log("vacancy dd data: ", data);
    setDropData(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getUsers = async (cursor) => {
    console.log("fetching");
    if (loading2) return;
    setLoading2(true);
    const data = await fetchTests(cdata.id, cursor);
    console.log("client tests", data);
    if (cursor.length) {
      setUsers([...users, ...data.data]);
    } else {
      setUsers(data.data);
    }
    setCursor(data.cursor);
    setHasNextPage(data.hasNextPage);
    setLoading2(false);
  };

  useEffect(() => {
    setCursor("");
    getUsers("");
  }, [fetchTests]);

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
              const res = await createVacancyHandler({
                ...dataToUpdate,
                VacancySkills: dataToUpdate.VacancySkills.map(
                  (item) =>
                    true && {
                      name: item?.name,
                      type: item.type,
                      area: item?.area?.label,
                    }
                ),
              });
              console.log(res, "asswe");
              setStatus(res?.message);
              if (!res) {
                toast(`💼 Вакансия создана`, {
                  position: isMobile ? "top-center" : "bottom-right",
                  autoClose: 4000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: true,
                  progress: undefined,
                  // theme: "dark",
                  progressStyle: { background: "#5875e8" },
                  containerId: "forCopy",
                });
                setDataToUpdate({
                  name: "",
                  shortDescription: "",
                  description: "",
                  conditions: "",
                  waitings: "",
                  vacArea: [],
                  format: { label: "" },
                  contract: { label: "" },
                  experience: { label: "" },
                  EducationLevel: { label: "" },
                  salaryStart: "",
                  salaryEnd: "",
                  currency: { label: "" },
                  VacancySkills: [],
                  distantWork: false,
                  priceByTalk: false,
                  TestsIds: [],
                });
                router.refresh();
                setLittleLoader(false);
              } else {
                setLittleLoader(false);
                toast(`🙇 Cорри, что-то пропущено`, {
                  position: isMobile ? "top-center" : "bottom-right",
                  autoClose: 4000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: true,
                  progress: undefined,
                  // theme: "dark",
                  progressStyle: { background: "#5875e8" },
                  containerId: "forCopy",
                });

                setLittleLoader(false);
              }
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
        className={` h-fit hideScrollbarNavMobile  flex flex-col gap-[16px] [@media(pointer:coarse)]:gap-[12px]`}
      >
        {!loading ? (
          <>
            {/* первая сосиска */}
            <div className="flex bg-white dark:bg-[#212122] flex-col gap-[16px] p-[12px] [@media(hover)]:rounded-b-[20px] [@media(pointer:coarse)]:rounded-[20px]">
              {/* name */}
              <Input
                placeholder="Менеджер по продажам бананов"
                label="Название вакансии"
                maxLength={80}
                defaultValue={dataToUpdate?.name}
                value={dataToUpdate.name}
                onChange={(name) => {
                  setDataToUpdate({
                    ...dataToUpdate,
                    name: name,
                  });
                  if (status)
                    setStatus(status?.filter((i) => !i.includes("inputName")));
                }}
                caption={
                  !status
                    ? null
                    : status?.includes("inputName minlen")
                    ? "Поле обязательно к заполнению"
                    : status?.includes("inputName maxlen")
                    ? "Максимальная длина поля 80 сиволов"
                    : null
                }
              />
              {/* name */}

              {/* short description */}
              <TextArea
                placeholder="Кратко опишите суть вакансии и требования к специалисту. Это увеличит открываемость вакансии из ленты."
                label="Краткое описание"
                minRows={2}
                maxRows={5}
                caption={
                  !status
                    ? null
                    : status?.includes("inputShortDesc maxlen")
                    ? "Максимальная длина поля 240 сиволов"
                    : null
                }
                maxLength={240}
                value={dataToUpdate?.shortDescription}
                onChange={(shortDescription) => {
                  setDataToUpdate({
                    ...dataToUpdate,
                    shortDescription: shortDescription,
                  });
                  if (status)
                    setStatus(
                      status?.filter((i) => !i.includes("inputShortDesc"))
                    );
                }}
              />
              {/* short description */}
            </div>
            {/* первая сосиска */}

            {/* вторая сосиска */}
            <Card padding={12} style={"flex flex-col gap-[16px]"}>
              {/* description */}
              <TextArea
                placeholder="Полностью опишите вакансию."
                label="Описание работы и обязанности"
                maxLength={640}
                minRows={2}
                maxRows={5}
                value={dataToUpdate?.description}
                onChange={(description) => {
                  setDataToUpdate({
                    ...dataToUpdate,
                    description: description,
                  });
                  if (status)
                    setStatus(
                      status?.filter((i) => !i.includes("inputDescription"))
                    );
                }}
                caption={
                  !status
                    ? null
                    : status?.includes("inputDescription minlen")
                    ? "Поле обязательно к заполнению"
                    : status?.includes("inputDescription maxlen")
                    ? "Максимальная длина поля 640 сиволов"
                    : null
                }
              />
              {/* description */}

              {/* conditions */}
              <Input
                placeholder="Опишите условия работы"
                label="Условия"
                maxLength={480}
                caption={
                  !status
                    ? null
                    : status?.includes("inputConditions maxlen")
                    ? "Максимальная длина поля 480 сиволов"
                    : null
                }
                value={dataToUpdate?.conditions}
                onChange={(conditions) => {
                  setDataToUpdate({
                    ...dataToUpdate,
                    conditions: conditions,
                  });
                  if (status)
                    setStatus(
                      status?.filter((i) => !i.includes("inputConditions"))
                    );
                }}
              />
              {/* conditions */}

              {/* waitings */}
              <Input
                placeholder="Опишите идеального кандидата."
                label="Ожидания от соискателя"
                maxLength={480}
                caption={
                  !status
                    ? null
                    : status?.includes("inputWaitings maxlen")
                    ? "Максимальная длина поля 480 сиволов"
                    : null
                }
                value={dataToUpdate?.waitings}
                onChange={(waitings) => {
                  setDataToUpdate({
                    ...dataToUpdate,
                    waitings: waitings,
                  });
                  if (status)
                    setStatus(
                      status?.filter((i) => !i.includes("inputWaitings"))
                    );
                }}
              />
              {/* waitings */}
            </Card>
            {/* вторая сосиска */}

            {/* третья сосиска */}
            <Card padding={12} style={"flex flex-col gap-[16px] h-fit"}>
              {/* area */}
              <div className="flex flex-col relative">
                <TextSecondary
                  text={"Сфера"}
                  style="font-medium text-[14px] select-none leading-[16.8px] tracking-[-0.013em] mb-[6px]"
                />
                {dataToUpdate.vacArea.length > 0 ? (
                  <div className="[@media(hover)]:w-[680px] flex-wrap flex flex-row gap-[10px]">
                    {dataToUpdate.vacArea.map((item, key) => (
                      <SkillCard
                        onClick={() => setState6(true)}
                        noCopy
                        area
                        hard={false}
                        text={item.label}
                      />
                    ))}
                  </div>
                ) : (
                  <AddCityIcon area onClick={() => setState6(true)} />
                )}
                <DropDownWithChoise
                  state={state6}
                  setState={setState6}
                  city={dataToUpdate.vacArea}
                  setCity={(val) => {
                    setDataToUpdate({
                      ...dataToUpdate,
                      vacArea: val,
                    });
                  }}
                  items={dropData?.area}
                  placeholder="Сфера"
                />
              </div>
              {/* area */}

              <div className="flex [@media(hover)]:flex-row [@media(pointer:coarse)]:flex-col [@media(hover)]:gap-[12px] [@media(pointer:coarse)]:gap-[16px]">
                {/* format */}
                <div className="flex flex-col w-full">
                  <TextSecondary
                    text={"Занятость"}
                    style="font-medium text-[14px] select-none leading-[16.8px] tracking-[-0.013em] mb-[6px]"
                  />
                  <DropDownWithSearch
                    city={
                      dataToUpdate?.format?.label.length === 0
                        ? ""
                        : dataToUpdate?.format?.label
                    }
                    setCity={(val) => {
                      setDataToUpdate({
                        ...dataToUpdate,
                        format: val,
                      });
                    }}
                    items={dropData.format}
                    placeholder={"Полный день"}
                  />
                </div>
                {/* format */}
                {/* contract */}
                <div className="flex flex-col w-full">
                  <TextSecondary
                    text={"Тип договора"}
                    style="font-medium text-[14px] select-none leading-[16.8px] tracking-[-0.013em] mb-[6px]"
                  />
                  <DropDownWithSearch
                    city={
                      dataToUpdate?.contract?.label.length === 0
                        ? ""
                        : dataToUpdate?.contract?.label
                    }
                    setCity={(val) => {
                      setDataToUpdate({
                        ...dataToUpdate,
                        contract: val,
                      });
                    }}
                    items={dropData.contract}
                    placeholder={"Работа"}
                  />
                </div>
                {/* contract */}
              </div>
              {/* expirience */}
              <div className="flex flex-col w-full">
                <TextSecondary
                  text={"Опыт"}
                  style="font-medium text-[14px] select-none leading-[16.8px] tracking-[-0.013em] mb-[6px]"
                />
                <DropDownWithSearch
                  city={
                    dataToUpdate?.experience?.label.length === 0
                      ? ""
                      : dataToUpdate?.experience?.label
                  }
                  setCity={(val) => {
                    setDataToUpdate({
                      ...dataToUpdate,
                      experience: val,
                    });
                  }}
                  items={dropData.experience}
                  placeholder={"От 1 года до 3 лет"}
                />
              </div>
              {/* expirience */}
              {/* EducationLevel */}
              <div className="flex flex-col w-full">
                <TextSecondary
                  text={"Высшее образование"}
                  style="font-medium text-[14px] select-none leading-[16.8px] tracking-[-0.013em] mb-[6px]"
                />
                <DropDownWithSearch
                  city={
                    dataToUpdate?.EducationLevel?.label.length === 0
                      ? ""
                      : dataToUpdate?.EducationLevel?.label
                  }
                  setCity={(val) => {
                    setDataToUpdate({
                      ...dataToUpdate,
                      EducationLevel: val,
                    });
                  }}
                  items={dropData.EducationLevel}
                  placeholder={"Выберите статус"}
                />
              </div>
              {/* EducationLevel */}

              {/* skills */}
              <div className="flex flex-col relative">
                <TextSecondary
                  text={"Хард-скиллы"}
                  style="font-medium text-[14px] select-none leading-[16.8px] tracking-[-0.013em] mb-[6px]"
                />
                {dataToUpdate.VacancySkills.filter(
                  (item) => item.type !== "soft"
                ).length > 0 ? (
                  <div className="flex flex-row gap-[8px] flex-wrap">
                    {dataToUpdate.VacancySkills.map(
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
                ) : (
                  <AddSkillIcon
                    hard
                    disabled={dataToUpdate?.vacArea?.length === 0}
                    onClick={() => {
                      if (dataToUpdate?.vacArea?.length === 0)
                        toast(`🔍 выберите сферу`, {
                          position: isMobile ? "top-center" : "bottom-right",
                          autoClose: 4000,
                          hideProgressBar: true,
                          closeOnClick: true,
                          pauseOnHover: false,
                          draggable: true,
                          progress: undefined,
                          // theme: "dark",
                          progressStyle: { background: "#5875e8" },
                          containerId: "forCopy",
                        });
                      else toggle(true);
                    }}
                  />
                )}
                <SkillsDropDown
                  withAreas
                  areas={dataToUpdate?.vacArea}
                  state={isOpen}
                  setState={() => toggle(false)}
                  type={"hard"}
                  city={dataToUpdate.VacancySkills}
                  dataToUpdate={dataToUpdate}
                  setCity={setDataToUpdate}
                  items={skills?.skills?.filter((i) => i?.type === "hard")}
                  placeholder="Хард-скиллы"
                />
              </div>
              <div className="flex flex-col relative">
                <TextSecondary
                  text={"Софт-скиллы"}
                  style="font-medium text-[14px] select-none leading-[16.8px] tracking-[-0.013em] mb-[6px]"
                />
                {dataToUpdate.VacancySkills.filter(
                  (item) => item.type !== "hard"
                ).length > 0 ? (
                  <div className="flex flex-row gap-[8px] flex-wrap">
                    {dataToUpdate.VacancySkills.map(
                      (item) =>
                        item.type === "soft" && (
                          <SkillCard
                            noCopy
                            hard={false}
                            soft
                            onClick={() => toggle2(true)}
                            text={item.name}
                            key={item.id}
                          />
                        )
                    )}
                  </div>
                ) : (
                  <AddSkillIcon
                    onClick={() => {
                      toggle2(true);
                    }}
                  />
                )}
                <SkillsDropDown
                  state={isOpen2}
                  setState={() => toggle2(false)}
                  type={"soft"}
                  city={dataToUpdate.VacancySkills}
                  dataToUpdate={dataToUpdate}
                  setCity={setDataToUpdate}
                  items={skills?.skills?.filter((i) => i?.type === "soft")}
                  placeholder="Софт-скиллы"
                />
              </div>
              {/* skills */}

              {/* salary */}
              {!dataToUpdate.prisceByTalk && (
                <div className="flex flex-col">
                  <TextSecondary
                    text={"Зарплата в месяц"}
                    style="font-medium text-[14px] leading-[16.8px] tracking-[-0.013em] mb-[6px]"
                  />
                  <div className="flex flex-row [@media(pointer:coarse)]:flex-col gap-[8px]">
                    <div className="flex flex-col w-full">
                      <MaskedInput
                        placeholder="От"
                        className="px-[12px] h-[42px] rounded-[8px] text-[14px] pb-[12px] bg-[#f6f6f8] dark:bg-[#2c2c2c] placeholder:text-[#bfbfbf] placeholder:select-none dark:placeholder:text-[#8f8f8f] pt-[11px] transition duration-[250ms] hover:inner-border-[1px] hover:inner-border-[#5875e8] outline-none placeholder:font-normal leading-[18px] tracking-[-0.015em] placeholder:leading-[18px] placeholder:tracking-[-0.015em]"
                        type="tel"
                        maskGenerator={maskGenerator}
                        value={dataToUpdate?.salaryStart}
                        onChange={(salaryStart) => {
                          if (!dataToUpdate.prisceByTalk) {
                            setDataToUpdate({
                              ...dataToUpdate,
                              salaryStart: salaryStart,
                            });
                            if (status)
                              setStatus(
                                status?.filter((i) => !i.includes("zxcghoul"))
                              );
                          }
                        }}
                      />
                      {status && status?.includes("zxcghoul") && (
                        <p className="text-[13px] leading-[16px] tracking-[-0.351px] mt-[3px] text-[#F0BB31]">
                          Минимум одно поле требует заполнения
                        </p>
                      )}
                    </div>
                    <MaskedInput
                      type="tel"
                      className="px-[12px] w-full h-[42px] rounded-[8px] text-[14px] pb-[12px] bg-[#f6f6f8] dark:bg-[#2c2c2c] placeholder:text-[#bfbfbf] placeholder:select-none dark:placeholder:text-[#8f8f8f] pt-[11px] transition duration-[250ms] hover:inner-border-[1px] hover:inner-border-[#5875e8] outline-none placeholder:font-normal leading-[18px] tracking-[-0.015em] placeholder:leading-[18px] placeholder:tracking-[-0.015em]"
                      maskGenerator={maskGenerator}
                      placeholder="До"
                      value={dataToUpdate?.salaryEnd}
                      onChange={(salaryEnd) => {
                        if (!dataToUpdate.prisceByTalk) {
                          setDataToUpdate({
                            ...dataToUpdate,
                            salaryEnd: salaryEnd,
                          });
                          if (status)
                            setStatus(
                              status?.filter((i) => !i.includes("zxcghoul"))
                            );
                        }
                      }}
                    />
                    <div className="flex flex-col">
                      <DropDownWithSearch
                        city={
                          dataToUpdate?.currency?.label.length === 0
                            ? ""
                            : dataToUpdate?.currency?.label
                        }
                        setCity={(val) => {
                          setDataToUpdate({
                            ...dataToUpdate,
                            currency: val,
                          });
                          if (status)
                            setStatus(
                              status?.filter((i) => !i.includes("currency"))
                            );
                        }}
                        items={dropData.currency}
                        placeholder={"RUB"}
                      />
                      {status && status?.includes("currency minlen") && (
                        <p className="text-[13px] leading-[16px] tracking-[-0.351px] mt-[3px] text-[#F0BB31]">
                          Выберите валюту
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
              {/* salary */}

              {/* prisceByTalk */}
              <div className="flex flex-col w-full">
                <TextSecondary
                  text={"По договоренности"}
                  style="font-medium text-[14px] select-none leading-[16.8px] tracking-[-0.013em] mb-[6px]"
                />

                <CheckBox
                  active={dataToUpdate.prisceByTalk}
                  onClick={() => {
                    if (dataToUpdate.prisceByTalk === true)
                      setDataToUpdate({
                        ...dataToUpdate,
                        salaryEnd: "",
                        salaryStart: "",
                        currency: { label: "" },
                        prisceByTalk: false,
                      });
                    else
                      setDataToUpdate({
                        ...dataToUpdate,
                        salaryEnd: "1",
                        salaryStart: "1",
                        currency: { label: "d" },
                        prisceByTalk: true,
                      });
                  }}
                />
              </div>
              {/* prisceByTalk */}
            </Card>

            <Card
              padding={12}
              style={"flex flex-col gap-[16px] h-fit [@media(hover)]:mb-[24px]"}
            >
              <LayoutGroup>
                {!users ? (
                  <div className="w-full flex justify-center items-center h-full">
                    <CustomLoader diameter={36} />
                  </div>
                ) : users?.length === 0 ? (
                  <div className="items-center flex flex-col gap-[24px] justify-center w-full text-center ">
                    <TextMain
                      text={`У компании пока нет вакансий`}
                      style="text-[14px] font-medium leading-[18px] tracking-[-0.013em]"
                    />
                  </div>
                ) : (
                  <>
                    {users.map((item, key) => (
                      <TestCard2
                        dataToUpdate={dataToUpdate}
                        item={item}
                        selectedId={selectedId}
                        setSelectedId={setSelectedId}
                        setDataToUpdate={setDataToUpdate}
                      />
                    ))}
                    {hasNextPage ? (
                      <Waypoint
                        onEnter={async () => {
                          console.log("Enter waypoint");
                          await getUsers(cursor);
                        }}
                        topOffset="50px"
                      >
                        <div className="w-full flex justify-center items-center h-full">
                          <CustomLoader diameter={36} />
                        </div>
                      </Waypoint>
                    ) : null}
                  </>
                )}
              </LayoutGroup>
            </Card>
          </>
        ) : (
          <div className="h-full w-full mt-[24px] flex items-center justify-center">
            <CustomLoader />
          </div>
        )}
      </div>
      {/* body */}
    </div>
  );
};

export default CreateVacancyRight;
