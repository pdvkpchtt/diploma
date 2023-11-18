"use client";

import { useRouter } from "next/navigation";

import { RoleButton } from "../../../shared/ui/Button";
// import authbg from "../../../assets/authbg.png";

import { finishRegistration } from "../../../server/actions/finishRegistration";

const RolePage = async () => {
  const router = useRouter();

  return (
    <>
      <div className="[@media(hover)]:hidden fixed top-[5px] left-0 font-bold text-[32px] leading-[38.4px] tracking-[-0.025em] text-[#5875e8] w-full flex justify-center">
        practica
      </div>

      <div className="flex flex-col gap-[16px] z-10 mt-[15vh] [@media(pointer:coarse)]:mt-[30vh] w-full [@media(hover)]:max-w-[503px]">
        <RoleButton
          text="Я соискатель"
          subtext="Хочу работать в супер компании"
          onClick={async () => {
            await finishRegistration("student");
            router.push("/feed");
          }}
        />
        <RoleButton
          text="Мы компания"
          subtext="Хотим найти супер сотрудников"
          onClick={async () => {
            await finishRegistration("company");
            router.push("/companyprofile/edit");
          }}
        />
      </div>

      <div
        // style={{ backgroundImage: `url(${authbg.src})` }}
        className="bg-cover fixed top-0 right-0 h-full z-0 [@media(pointer:coarse)]:hidden w-[356px] rounded-l-[30px]"
      />
    </>
  );
};

export default RolePage;
