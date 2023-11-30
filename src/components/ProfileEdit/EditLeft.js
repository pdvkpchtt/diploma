"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import InputMask from "react-input-mask";

import Card from "../../shared/ui/Card";
import { Input } from "../../shared/ui/Input";
import EmptyAvatar from "../../shared/ui/EmptyAvatar";
import TextSecondary from "../../shared/Text/TextSecondary";
import { updateEmail } from "../../server/actions/profile/updateEmail";

const EditLeft = ({
  data,
  setDataToUpdate,
  dataToUpdate,
  status,
  setStatus,
}) => {
  const router = useRouter();

  const [myMail, setMyMail] = useState(data.email);
  const [error, setError] = useState(false);
  const [bottomModal, setBottomModal] = useState(false);

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const changeEmail = async () => {
    console.log(myMail, error);
    if (!isValidEmail(myMail)) {
      setError(true);
    } else {
      if (myMail !== data.email) {
        await updateEmail(myMail);
        signOut();
      }
    }
  };

  return (
    <div className="flex flex-col gap-[16px]  [@media(hover)]:mt-[24px] [@media(pointer:coarse)]:gap-[12px]">
      <Card
        style="
        max-w-[260px] w-full [@media(pointer:coarse)]:max-w-[100%] 
        flex flex-col gap-[16px] h-fit"
        padding={12}
      >
        <div className="rounded-[8px] relative overflow-hidden aspect-square [@media(pointer:coarse)]:w-full [@media(pointer:coarse)]:h-full [@media(hover)]:min-w-[236px] [@media(hover)]:min-h-[236px]  [@media(hover)]:w-[236px] [@media(hover)]:h-[236px]">
          <p className="absolute bg-[#74899B] bg-opacity-[8%] text-[13px] select-none text-[#5875e8] font-medium px-[8px] py-[4px] bottom-0 left-0 rounded-tr-[8px]">
            {data.role === "student" ? "Соискатель" : "HR"}
          </p>
          {data.image ? (
            <Image
              src={data.image}
              alt="Profile photo"
              unoptimized
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

        <Input
          placeholder="Например, Данил"
          label="Имя"
          value={dataToUpdate.name}
          caption={
            !status
              ? null
              : status?.includes("inputName minlen")
              ? "Поле обязательно к заполнению"
              : null
          }
          onChange={(name) => {
            setDataToUpdate({
              ...dataToUpdate,
              name: name,
            });
            if (status)
              setStatus(status.filter((i) => !i.includes("inputName")));
          }}
        />
        <Input
          placeholder="Например, developer_23yo"
          label="Имя пользователя"
          value={dataToUpdate.username}
          caption={
            !status
              ? null
              : status?.includes("inputUsername minlen")
              ? "Поле обязательно к заполнению"
              : status?.includes("inputUsername unique")
              ? "Этот username занят"
              : null
          }
          onChange={(username) => {
            setDataToUpdate({
              ...dataToUpdate,
              username: username,
            });
            if (status)
              setStatus(status.filter((i) => !i.includes("inputUsername")));
          }}
        />
        <Input
          placeholder="Например, Уфа"
          label="Город"
          value={dataToUpdate.city}
          onChange={(city) =>
            setDataToUpdate({
              ...dataToUpdate,
              city: city,
            })
          }
        />
        <div className="flex flex-col w-full">
          <TextSecondary
            text={"День рождения"}
            style="font-medium text-[14px] select-none leading-[16.8px] tracking-[-0.013em] mb-[6px]"
          />
          <InputMask
            mask="99.99.9999"
            value={dataToUpdate.birthDate}
            onChange={(e) => {
              setDataToUpdate({ ...dataToUpdate, birthDate: e.target.value });
            }}
            maskChar=""
          >
            {(inputProps) => (
              <input
                placeholder={"24.01.1963"}
                value={inputProps.birthDate}
                className={`px-[12px] h-[42px] text-[#2c2c2c] dark:text-white text-[14px] pb-[12px] bg-[#f6f6f8] w-full dark:bg-[#2c2c2c] placeholder:text-[#bfbfbf] placeholder:select-none dark:placeholder:text-[#8f8f8f] pt-[11px] transition duration-[250ms] hover:inner-border-[1px] hover:inner-border-[#5875e8] outline-none placeholder:font-normal leading-[18px] tracking-[-0.015em] placeholder:leading-[18px] placeholder:tracking-[-0.015em] rounded-[8px]`}
                //   onChange={}
                //   maxLength={17}
              />
            )}
          </InputMask>
        </div>
      </Card>

      {/* изменить почту */}
      <Card
        style=" 
        [@media(hover)]:w-[260px] [@media(pointer:coarse)]:w-[100%] 
        flex flex-col gap-[16px] 
              hideScrollbarNavMobile [@media(hover)]:h-fit"
        padding={12}
      >
        <Input
          type="email"
          error={error}
          placeholder="jeff@bezos.com"
          label="Ваша почта"
          value={myMail}
          onChange={(val) => setMyMail(val)}
        />
        {myMail !== data.email && (
          <p
            onClick={() => {
              changeEmail();
            }}
            className={`${
              "cursor-pointer text-[#5875e8] hover:text-[#3A56C5] active:text-[#2C429C]"
              // : "text-[#bfbfbf] cursor-default"
            } text-[16px] w-fit select-none font-medium leading-[20px] tracking-[-0.24px] transition duration-[250ms]`}
          >
            Сохранить
          </p>
        )}
      </Card>
      {/* изменить почту */}

      <Card padding={6} style="invisible"></Card>
    </div>
  );
};

export default EditLeft;
