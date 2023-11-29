"use client";

import { usePathname } from "next/navigation";

const RootLayout = ({ children }) => {
  const pathname = usePathname();

  return (
    <div
      className={`flex gap-[16px] [@media(pointer:coarse)]:gap-[12px]  w-full
      flex-row [@media(pointer:coarse)]:flex-col [@media(hover)]:mt-[62px] ${
        pathname === "/profile/edit"
          ? "[@media(pointer:coarse)]:mt-[61px]"
          : "[@media(pointer:coarse)]:mt-[38px]"
      } 
      h-full 
       [@media(pointer:coarse)]:p-[12px]`}
    >
      {children}
      <div
        className={`${
          pathname !== "/profile/edit"
            ? "[@media(pointer:coarse)]:pb-[80px]"
            : "[@media(pointer:coarse)]:pb-[3px]"
        }`}
      />
    </div>
  );
};

export default RootLayout;
