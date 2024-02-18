"use client";

import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import CallsIcon from "../icons/CallsIcon";
import CandidatesIcon from "../icons/CandidatesIcon";

// import HomeIcon from "../icons/HomeIcon";
// import SearchIcon from "../icons/SearchIcon";
// import MessengerIcon from "../icons/MessengerIcon";
import DemoIcon from "../icons/DemoIcon";
import HRsIcon from "../icons/HRsIcon";
import JobIcon from "../icons/JobIcon";
import ProfileIcon from "../icons/ProfileIcon";
import TestIcon from "../icons/TestIcon";

const Header = ({ role }) => {
  const router = useRouter();
  const pathname = usePathname();

  const isHideHeader =
    pathname.includes("/auth") ||
    pathname === "/landing" ||
    pathname.includes("/call/");

  if (!isHideHeader)
    return (
      <header className="w-full h-[62px] top-0 fixed [@media(pointer:coarse)]:hidden z-30 bg-white dark:bg-[#212122] border-b-[0.7px] border-b-[#e7e7e7] dark:border-b-[#282828]">
        <div className="flex flex-row h-[62px] justify-between min-w-[1012px] max-w-[1012px] px-[16px] items-start mx-auto">
          {/*  active:text-[#2C429C] hover:text-[#3A56C5] */}
          <p
            className="font-bold text-[32px] transition text-[#5875e8] duration-[250ms] leading-[38.4px] tracking-[-0.023em] mt-[8px] mb-[16px] select-none cursor-pointer"
            // onClick={() => router.push("/feed")}
          >
            TalentWave
          </p>

          <div className="flex flex-row gap-[64px] mt-[17px] mb-[20px]">
            {/* <HomeIcon />
            <SearchIcon />
            <MessengerIcon /> */}
            <JobIcon />
            {role === "student" ? <HRsIcon /> : <CandidatesIcon />}
            {role === "student" ? null : <TestIcon />}
            <ProfileIcon role={role} />
          </div>

          <p className="font-bold text-[32px] leading-[38.4px] text-white dark:text-[#212122] tracking-[-0.023em] mt-[8px] mb-[16px] select-none">
            TalentWave
          </p>
        </div>
      </header>
    );
};

export default Header;
