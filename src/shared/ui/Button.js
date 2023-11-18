"use client";

import { useState } from "react";
import { Oval } from "react-loader-spinner";

export const ButtonPrimary = ({
  text = "empty",
  type,
  loader = false,
  style = "",
  onClick = () => {},
  children,
}) => {
  const [loaderState, setLoaderState] = useState(false);

  const clickHandler = () => {
    onClick();

    if (loader) setLoaderState(true);
  };

  return (
    <button
      type={type ? type : null}
      className={`${style} font-medium outline-none [@media(pointer:coarse)]:rounded-[20px] rounded-[16px] h-[43px] leading-[20px] text-[16px] tracking-[-0.015em] text-center select-none text-white items-center flex justify-center cursor-pointer transition duration-[250ms] bg-[#5875e8] hover:bg-[#3A56C5] active:bg-[#2C429C]`}
      onClick={() => clickHandler()}
    >
      {children ? <div className="mr-[8px]">{children}</div> : null}
      {!loaderState ? (
        <>{text}</>
      ) : (
        <Oval
          height={19}
          width={19}
          color="rgba(255, 255, 255, 1)"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="rgba(255, 255, 255, 0.3)"
          strokeWidth={6}
          strokeWidthSecondary={6}
        />
      )}
    </button>
  );
};

export const RoleButton = ({ text = "", subtext = "", onClick }) => {
  return (
    <div
      className="flex flex-row gap-[16px] justify-between w-full bg-[#74899B] bg-opacity-[16%] dark:bg-opacity-[100%] dark:bg-[#212122] rounded-[10px] p-[10px] items-center cursor-pointer"
      onClick={onClick}
    >
      <div className="flex flex-col gap-[5px]">
        <p className="text-[#5875e8] select-none font-medium text-[26px] leading-[30.16px] tracking-[-0.025em]">
          {text}
        </p>

        <p className="text-[#5875e8] select-none font-normal text-[18px] leading-[19.98px] tracking-[-0.05em]">
          {subtext}
        </p>
      </div>

      <svg
        width="41"
        height="33"
        viewBox="0 0 41 33"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M40.5 16.4883C40.5 16.8965 40.3281 17.2617 40.0059 17.5625L25.5469 32.0644C25.2246 32.3652 24.8809 32.4941 24.4941 32.4941C23.6777 32.4941 23.0762 31.8926 23.0762 31.0977C23.0762 30.7109 23.2051 30.3242 23.4629 30.0664L29.8867 23.5781L36.2461 17.6914L31.2402 17.9277H2.02149C1.20508 17.9277 0.603517 17.3262 0.603517 16.4883C0.603517 15.6504 1.20508 15.0488 2.02149 15.0488L31.2402 15.0488L36.2246 15.2852L29.8867 9.39844L23.4629 2.91016C23.2051 2.63086 23.0762 2.26562 23.0762 1.85742C23.0762 1.0625 23.6777 0.460937 24.4941 0.460937C24.8809 0.460937 25.2461 0.611328 25.6543 1.01953L40.0059 15.4141C40.3281 15.7148 40.5 16.0801 40.5 16.4883Z"
          fill="#5875E8"
        />
      </svg>
    </div>
  );
};
