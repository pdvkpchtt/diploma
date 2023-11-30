"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const TestIcon = () => {
  const pathname = usePathname();

  return (
    <Link href={"/testroute"} className="group">
      <div className="w-[30px] h-[30px] flex items-center justify-center cursor-pointer bg-transparent group-hover:bg-[#74899B] group-hover:bg-opacity-[8%] transition duration-[250ms] rounded-[8px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 24 24"
        >
          <path
            className={
              pathname.includes("testroute")
                ? "fill-[#5875e8]"
                : "fill-[#2c2c2c] dark:fill-[#fff]"
            }
            d="M7 2v2h1v14a4 4 0 0 0 4 4a4 4 0 0 0 4-4V4h1V2H7m4 14c-.6 0-1-.4-1-1s.4-1 1-1s1 .4 1 1s-.4 1-1 1m2-4c-.6 0-1-.4-1-1s.4-1 1-1s1 .4 1 1s-.4 1-1 1m1-5h-4V4h4v3Z"
          />
        </svg>
      </div>
    </Link>
  );
};

export default TestIcon;
