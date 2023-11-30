"use client";

import { usePathname } from "next/navigation";

const CompanyLayout = ({ children }) => {
  const pathname = usePathname();

  return (
    <div
      className={`flex gap-[16px] [@media(pointer:coarse)]:gap-[12px] w-full
      flex-row [@media(pointer:coarse)]:flex-col [@media(hover)]:mt-[62px] 
      h-full
      ${
        pathname === "/companyprofile/createvacancy" ||
        pathname === "/companyprofile/edit"
          ? "[@media(pointer:coarse)]:mb-[0px] [@media(pointer:coarse)]:mt-[61px]"
          : "[@media(pointer:coarse)]:mb-[80px]  [@media(pointer:coarse)]:mt-[38px]"
      } [@media(pointer:coarse)]:p-[12px]
      
      `}
    >
      {children}

      <div
        className={`${
          pathname !== "/companyprofile/edit" &&
          pathname !== "/companyprofile/createvacancy"
            ? "[@media(pointer:coarse)]:pb-[80px]"
            : "[@media(pointer:coarse)]:pb-[3px]"
        } [@media(hover)]:hidden`}
      />
    </div>
  );
};

export default CompanyLayout;
