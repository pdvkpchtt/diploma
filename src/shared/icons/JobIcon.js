"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const JobIcon = () => {
  const pathname = usePathname();

  return (
    <Link href={"/jobs"} className="group">
      <div className="w-[30px] h-[30px] flex items-center justify-center cursor-pointer bg-transparent group-hover:bg-[#74899B] group-hover:bg-opacity-[8%] transition duration-[250ms] rounded-[8px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 16 16"
        >
          <path
            className={
              pathname.includes("jobs")
                ? "fill-[#5875e8]"
                : "fill-[#2c2c2c] dark:fill-[#fff]"
            }
            fillRule="evenodd"
            d="M6 1a1.75 1.75 0 0 0-1.75 1.75V4H3a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.25V2.75A1.75 1.75 0 0 0 10 1zm4.25 3V2.75A.25.25 0 0 0 10 2.5H6a.25.25 0 0 0-.25.25V4zM3 5.5h10a.5.5 0 0 1 .5.5v1h-11V6a.5.5 0 0 1 .5-.5m-.5 3V13a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8.5H9V10H7V8.5z"
            clipRrule="evenodd"
          />
        </svg>
      </div>
    </Link>
  );
};
export default JobIcon;
