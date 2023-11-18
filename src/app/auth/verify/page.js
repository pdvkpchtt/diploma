"use client";

import { useSearchParams } from "next/navigation";

const VerifyPage = () => {
  const searchParams = useSearchParams();

  const email = searchParams.get("email");
  return (
    <>
      <div className="[@media(hover)]:hidden fixed top-[5px] left-0 font-bold text-[32px] leading-[38.4px] tracking-[-0.025em] text-[#5875e8] w-full flex justify-center">
        TalentWave
      </div>

      <div className="flex flex-col gap-[10px] mt-[15vh] [@media(pointer:coarse)]:mt-[30vh] w-full">
        <div className="font-medium text-[26px] leading-[32.48px] tracking-[-0.025em] text-[#2c2c2c] dark:text-white [@media(hover)]:max-w-[604px] w-full">
          Мы отправили ссылку на
          <div className="font-medium text-[26px] leading-[32.48px] tracking-[-0.025em] text-[#5875e8]">
            {email}
          </div>
        </div>

        <div className="font-normal text-[22px] leading-[24.42px] tracking-[-0.05em] text-[#8f8f8f] [@media(hover)]:max-w-[290px] w-full">
          Проверьте спам, ссылка может быть там
        </div>
      </div>
    </>
  );
};

export default VerifyPage;
