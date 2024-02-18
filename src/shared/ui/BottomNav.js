"use client";

import { usePathname } from "next/navigation";

// import HomeIcon from "../icons/HomeIcon";
// import MessengerIcon from "../icons/MessengerIcon";
// import SearchIcon from "../icons/SearchIcon";
import ProfileIcon from "../icons/ProfileIcon";

const BottomNav = ({ role }) => {
  const pathname = usePathname();

  const isHideBottomNav =
    pathname.includes("/auth") ||
    pathname.includes("/edit") ||
    pathname.includes("/companyprofile/createvacancy") ||
    pathname.includes("/messenger/") ||
    pathname === "/landing" ||
    pathname.includes("/call/");

  return (
    <>
      {isHideBottomNav ? null : (
        <div className="bg-white dark:bg-[#212122] border-t-[0.7px] border-t-[#e7e7e7] dark:border-t-[#282828] [@media(pointer:coarse)]:fixed [@media(hover)]:hidden h-[80px] z-10 bottom-0 w-full pt-[10px] pb-[20px]">
          <div className="mx-auto w-full max-w-[500px] grid grid-cols-4">
            <div className="flex cursor-pointer flex-col items-center gap-[1px] text-center">
              {/* <HomeIcon /> */}
              <div className="w-[25px] h-[25px] bg-[#f6f6f8] dark:bg-[#141414]" />
            </div>
            <div className="flex cursor-pointer flex-col items-center gap-[1px] text-center">
              {/* <SearchIcon /> */}
              <div className="w-[25px] h-[25px] bg-[#f6f6f8] dark:bg-[#141414]" />
            </div>

            <div className="flex cursor-pointer flex-col items-center gap-[1px] text-center">
              {/* <MessengerIcon /> */}
              <div className="w-[25px] h-[25px] bg-[#f6f6f8] dark:bg-[#141414]" />
            </div>

            <div className="flex cursor-pointer flex-col items-center gap-[1px] text-center">
              <ProfileIcon role={role} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BottomNav;
