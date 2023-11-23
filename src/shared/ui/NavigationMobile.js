"use client";

import { LayoutGroup } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";

import TextNav from "../Text/TextNav";

const NavigationMobile = ({
  withNav = false,
  useState,
  navState,
  layoutId = "",
  withLogo = false,
  top = 0,
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
    <LayoutGroup id={layoutId}>
      <div
        className={`w-full [@media(hover)]:hidden ${
          withLogo ? "h-[85px]" : "h-[38px]"
        } whitespace-nowrap left-0 z-50 bg-white dark:bg-[#212122] fixed `}
        style={{
          top: top,
        }}
      >
        {withLogo && (
          <div className="mb-[6px] mt-[10px] max-w-[500px] mx-auto">
            <div
              onClick={() => router.push("/feed")}
              className="font-bold text-[26px] text-[#5875e8] leading-[31px] tracking-[-0.023em] ml-[12px]"
            >
              practica
            </div>
          </div>
        )}

        <div className={`overflow-y-hidden overflow-x-scroll hideScrollbarNav`}>
          <div className="flex pt-[8px] flex-row gap-[24px] max-w-[500px] mx-auto">
            {navState.map((item, key) => (
              <div
                key={key}
                // className={`${key == 0 ? "ml-auto" : null} ${
                //   key == navState.length - 1 ? "mr-auto" : null
                // }`}
                onClick={() => {
                  clickHandler(key, useState, navState, item);
                  console.log(key == navState.length - 1);
                }}
              >
                <TextNav
                  text={item.name}
                  styled={`${key == 0 ? "ml-[12px]" : null} ${
                    key == navState.length - 1 ? "mr-[12px]" : null
                  } cursor-pointer select-none`}
                  active={
                    !withNav
                      ? navState[key].active
                        ? true
                        : false
                      : pathname === navState[key].route
                      ? true
                      : false
                  }
                />
              </div>
            ))}
            <div
              className={`h-[0.7px] bg-[#e7e7e7] dark:bg-[#282828] left-0 ${
                withLogo ? "bottom-0" : "bottom-0"
              } absolute w-full z-[-1]`}
            />
          </div>
        </div>
      </div>
    </LayoutGroup>
  );
};

export default NavigationMobile;
