"use client";

import NavigationPc from "../../shared/ui/NavigationPc";

const CompanyRight = ({ handleClick, navState }) => {
  return (
    <div className="flex flex-col [@media(hover)]:ml-[276px] [@media(hover)]:mt-[24px] gap-[16px] w-full">
      <NavigationPc
        useState={(value) => handleClick(value)}
        navState={navState}
        layoutId="pc"
      />

      <div className="flex flex-col gap-[16px] [@media(pointer:coarse)]:gap-[12px] w-full">
        {navState.map((item, key) => item.active && <>{item.component}</>)}
      </div>
    </div>
  );
};

export default CompanyRight;
