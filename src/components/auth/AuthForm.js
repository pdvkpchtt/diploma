"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { ButtonPrimary } from "../../shared/ui/Button";
import Card from "../../shared/ui/Card";
import TextSecondary from "../../shared/Text/TextSecondary";

const AuthForm = () => {
  const router = useRouter();

  return (
    <Card
      style="[@media(hover)]:max-w-[390px] w-full flex flex-col [@media(pointer:coarse)]:mt-[13vh]"
      rounded={20}
      padding={10}
    >
      <TextSecondary
        text={"Почта"}
        style="font-medium ml-[4px] text-[14px] select-none leading-[16.8px] tracking-[-0.013em] mb-[6px]"
      />

      <form
        action={(e) => {
          signIn("email", {
            redirect: false,
            callbackUrl: "/",
            email: e.get("email")?.toString(),
          });
          console.log(e.get("email").toString());
          router.push("/auth/verify?email=" + e.get("email")?.toString());
        }}
      >
        <input
          name={"email"}
          placeholder={"practica@practica.com"}
          autoComplete
          className="px-[12px] w-full h-[42px] bg-[#74899B] bg-opacity-[8%] text-[#2c2c2c] dark:text-white dark:placeholder:text-[#8f8f8f] text-[14px] pb-[12px] pt-[11px] transition duration-[250ms] hover:inner-border-[1px] outline-none placeholder:font-normal placeholder:text-[#bfbfbf] leading-[18px] tracking-[-0.015em] placeholder:leading-[18px] placeholder:tracking-[-0.015em]"
          style={{
            borderRadius: 16,
          }}
          type={"email"}
        />
        <ButtonPrimary
          type="submit"
          text="Отправить ссылку"
          style="mt-[10px] w-full"
        />
      </form>
    </Card>
  );
};

export default AuthForm;
