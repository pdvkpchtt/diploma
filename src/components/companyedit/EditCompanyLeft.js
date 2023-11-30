import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { useMediaQuery } from "react-responsive";
import { signOut } from "next-auth/react";
import "react-toastify/dist/ReactToastify.css";

import Card from "../../shared/ui/Card";
import { Input } from "../../shared/ui/Input";
import EmptyAvatar from "../../shared/ui/EmptyAvatar";
import DropDownWithChoise from "../../shared/ui/DropDownWithChoise";
import TextSecondary from "../../shared/Text/TextSecondary";
import { updateEmail } from "../../server/actions/company/updateCompanyProfile";
import { invite } from "../../server/actions/hr/invite";

import AddCityIcon from "../../shared/icons/AddCityIcon";

const EditCompanyLeft = ({
  data,
  setDataToUpdate,
  dataToUpdate,
  itemsForDD3,
  status,
  setStatus,
}) => {
  const isMobile = useMediaQuery({ query: "(pointer:coarse)" });
  const router = useRouter();

  const [state, setState] = useState(false);
  const [myMail, setMyMail] = useState(dataToUpdate.email);
  const [hrMail, setHrMail] = useState("");
  const [linkName, setLinkName] = useState("");
  const [linkLink, setLinkLink] = useState("");
  const [error, setError] = useState(false);

  const inviteHandler = async (hrMail, compId) => {
    await invite(hrMail, compId);
  };

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const changeEmail = async () => {
    await updateEmail(myMail);
    signOut();
  };
  // console.log(dataToUpdate.Links);
  return (
    <div className="flex flex-col gap-[16px] [@media(hover)]:my-[24px] [@media(pointer:coarse)]:gap-[12px]">
      <Card
        style=" 
        [@media(hover)]:w-[260px] [@media(pointer:coarse)]:w-[100%] 
        flex flex-col gap-[16px] 
        hideScrollbarNavMobile [@media(hover)]:h-fit"
        padding={12}
      >
        <div className="relative cursor-pointer overflow-hidden rounded-full [@media(hover)]:min-w-[110px] [@media(hover)]:min-h-[110px]  [@media(hover)]:w-[110px] [@media(hover)]:h-[110px] mx-auto">
          {data.image ? (
            <Image
              src={data.image}
              alt="Profile photo"
              className="[@media(hover)]:min-w-[110px] object-cover [@media(hover)]:w-[110px] [@media(hover)]:h-[110px] [@media(hover)]:min-h-[110px] [@media(pointer:coarse)]:w-[110px] [@media(pointer:coarse)]:h-[110px] w-full"
              width={110}
              height={110}
              unoptimized
              quality={100}
              priority={true}
            />
          ) : (
            <EmptyAvatar />
          )}
        </div>
        <Input
          placeholder="Doofenshmirtz Corporation"
          label="Название компании"
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
              : null
          }
        />
        <Input
          placeholder="Например, designer_23yo"
          label="Имя компании"
          value={dataToUpdate.username}
          caption={
            !status
              ? null
              : status?.includes("inputUsername minlen")
              ? "Поле обязательно к заполнению"
              : status?.includes("inputUsername unique")
              ? "Этот username занят"
              : status?.includes("inputUsername change")
              ? "Измените username после регистрации"
              : null
          }
          onChange={(username) => {
            setDataToUpdate({
              ...dataToUpdate,
              username: username,
            });
            if (status)
              setStatus(status?.filter((i) => !i.includes("inputUsername")));
          }}
        />

        {/* добавление городов */}
        <div className="flex flex-col relative">
          <TextSecondary
            text={"Расположение"}
            style="font-medium text-[14px] select-none leading-[16.8px] tracking-[-0.013em] mb-[6px]"
          />
          {!dataToUpdate?.Cities ? (
            <AddCityIcon onClick={() => setState(true)} />
          ) : dataToUpdate?.Cities?.length === 0 ? (
            <AddCityIcon onClick={() => setState(true)} />
          ) : (
            <p
              className={
                "text-[14px] break-words text-[#5875e8] hover:text-[#3A56C5] active:text-[#2C429C] transition duration-[250ms] font-medium leading-[18px] tracking-[-0.182px] cursor-pointer [@media(hover)]:w-[236px]"
              }
              onClick={() => setState(true)}
            >
              {dataToUpdate.Cities.map(
                (item, key) =>
                  item.label +
                  `${key === dataToUpdate.Cities.length - 1 ? "" : ", "}`
              )}
            </p>
          )}
          <DropDownWithChoise
            state={state}
            setState={setState}
            city={!dataToUpdate.Cities ? [] : dataToUpdate.Cities}
            setCity={(val) => {
              setDataToUpdate({
                ...dataToUpdate,
                Cities: val,
              });
            }}
            items={itemsForDD3}
            placeholder="Город"
          />
        </div>
        {/* добавление городов */}
      </Card>

      {/* добавить рекрутера */}
      {dataToUpdate.role !== "hr_no_nickname" && (
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
            placeholder="hr@recruter.com"
            label="Почта рекрутера"
            value={hrMail}
            onChange={(val) => {
              setHrMail(val);
              setError(false);
            }}
          />
          <p
            onClick={() => {
              if (hrMail.length > 0) {
                if (!isValidEmail(hrMail)) {
                  setError(true);
                } else {
                  inviteHandler(hrMail, dataToUpdate.id);
                  toast(`📧 Приглашение отправлено`, {
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
                  setError(false);
                  setHrMail("");
                }
              }
            }}
            className={`text-[16px] w-fit select-none font-medium leading-[20px] tracking-[-0.24px] transition duration-[250ms] ${
              hrMail.length > 0
                ? "cursor-pointer text-[#5875e8] hover:text-[#3A56C5] active:text-[#2C429C]"
                : "text-[#bfbfbf] cursor-default"
            }`}
          >
            Пригласить
          </p>
        </Card>
      )}
      {/* добавить рекрутера */}
      <Card padding={6} style="invisible"></Card>
    </div>
  );
};

export default EditCompanyLeft;
