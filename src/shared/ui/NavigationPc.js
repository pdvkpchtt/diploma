"use client";

import { usePathname, useRouter } from "next/navigation";

const NavigationPc = ({
  invertedColors = false,
  useState,
  navState,
  style = "",
  withNav = false,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const clickHandler = (id, setFunc, state, item) => {
    setFunc(
      state.map((item) =>
        item.id == id ? { ...item, active: true } : { ...item, active: false }
      )
    );
    if (withNav) router.push(`${item.route}`);
  };

  return (
    <div
      className={`${style} [@media(pointer:coarse)]:hidden hideScrollbarNav flex w-fit flex-row gap-[12px] whitespace-nowrap`}
    >
      {navState.map((item, key) => (
        <div
          key={key}
          className="[@media(pointer:coarse)]:ml-auto"
          onClick={() => {
            clickHandler(key, useState, navState, item);
          }}
        >
          <p
            className={`transition duration-[250ms] ${
              !invertedColors
                ? !withNav
                  ? navState[key].active
                    ? "bg-[#5875e8] active:bg-[#2C429C] hover:bg-[#3A56C5] text-white"
                    : "bg-transparent"
                  : pathname === navState[key].route
                  ? "bg-[#5875e8] active:bg-[#2C429C] hover:bg-[#3A56C5] text-white"
                  : "bg-transparent"
                : "bg-transparent"
            } ${
              invertedColors
                ? !withNav
                  ? navState[key].active
                    ? "text-[#5875e8] active:text-[#2C429C] hover:text-[#3A56C5]"
                    : "text-[#2c2c2c] dark:text-white"
                  : pathname === navState[key].route
                  ? "text-[#5875e8] active:text-[#2C429C] hover:text-[#3A56C5]"
                  : "text-[#2c2c2c] dark:text-white"
                : "text-[#2c2c2c] dark:text-white"
            } cursor-pointer rounded-[20px] px-[10px] py-[4px] trnasition duration-[300ms] select-none text-[16px] font-medium leading-[20px] tracking-[-0.015em]`}
          >
            {item.name}
          </p>
        </div>
      ))}
    </div>
  );
};

export default NavigationPc;
