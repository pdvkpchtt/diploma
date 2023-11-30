"use client";

import { useRouter } from "next/navigation";

import ArrowLeftIcon from "../icons/ArrowLeftIcon";
import CheckIcon from "../icons/CheckIcon";

const MobileHeader = ({
  submitStyles = "",
  onClick = () => {},
  hasSubmitButton = false,
  onSubmit = () => {},
  children,
}) => {
  const router = useRouter();

  return (
    <div className="[@media(hover)]:hidden [@media(pointer:coarse)]:fixed z-20 [@media(pointer:coarse)]:top-0 [@media(pointer:coarse)]:w-full [@media(pointer:coarse)]:left-0 [@media(pointer:coarse)]:rounded-t-[0px] border-b-[0.7px] border-b-[#E7E7E7] dark:border-b-[#2f2f2f] bg-white dark:bg-[#212122] rounded-t-[20px] p-[12px]">
      <div className="[@media(pointer:coarse)]:max-w-[476px] [@media(pointer:coarse)]:mx-auto">
        <div className="flex flex-col gap-[12px]">
          <div className="items-center w-full flex flex-row justify-between">
            <div
              className={`group rounded-[16px] px-[12px] py-[8px] text-center text-[#5875e8] items-center flex justify-center
           cursor-pointer w-fit select-none transition duration-[250ms] bg-[#74899B] bg-opacity-[8%]`}
              onClick={onClick}
            >
              <ArrowLeftIcon />
            </div>

            {hasSubmitButton ? (
              <div
                className={`
                px-[12px] py-[8px] rounded-[16px] cursor-pointer transition duration-[250ms] select-none w-fit
                ${submitStyles}
            `}
                onClick={onSubmit}
              >
                <CheckIcon fill={"#fff"} />
              </div>
            ) : null}
          </div>
          {children ? children : null}
        </div>
      </div>
    </div>
  );
};

export default MobileHeader;
