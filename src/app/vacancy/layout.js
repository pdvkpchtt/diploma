"use client";

import { usePathname } from "next/navigation";

const VacancyLayLayout = ({ children }) => {
  const pathname = usePathname();

  return (
    <div
      className={`flex gap-[16px] [@media(pointer:coarse)]:gap-[12px] w-full h-full flex-row 
        [@media(pointer:coarse)]:flex-col
        [@media(hover)]:mb-[24px] ${
          !pathname.includes("/companyprofile/createvacancy")
            ? "[@media(hover)]:mt-[86px]"
            : "[@media(hover)]:mt-[62px]"
        }`}
    >
      {children}
    </div>
  );
};

export default VacancyLayLayout;
