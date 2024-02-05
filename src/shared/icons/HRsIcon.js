"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const HRsIcon = () => {
  const pathname = usePathname();
  return (
    <Link href={"/hrs"} className="group">
      <div className="w-[30px] h-[30px] flex items-center justify-center cursor-pointer bg-transparent group-hover:bg-[#74899B] group-hover:bg-opacity-[8%] transition duration-[250ms] rounded-[8px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 16 16"
        >
          <path
            className={
              pathname.includes("hrs")
                ? "fill-[#5875e8]"
                : "fill-[#2c2c2c] dark:fill-[#fff]"
            }
            d="M8 4.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0M10.5 6c-.234 0-.46.032-.676.092a2 2 0 1 1 3.351 0A2.502 2.502 0 0 0 12.5 6zM8 8h.05a2.523 2.523 0 0 0-.008.042A2.5 2.5 0 0 0 6 10.5v1.984c-.16.01-.326.016-.5.016-4 0-4-2.925-4-2.925V9.5A1.5 1.5 0 0 1 3 8zm1 1v-.5A1.5 1.5 0 0 1 10.5 7h2A1.5 1.5 0 0 1 14 8.5V9h.5a1.5 1.5 0 0 1 1.5 1.5V12h-2v-.5a.5.5 0 0 0-1 0v.5h-3v-.5a.5.5 0 0 0-1 0v.5H7v-1.5A1.5 1.5 0 0 1 8.5 9zm1-.5V9h3v-.5a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 0-.5.5m4 4.5h2v1.5a1.5 1.5 0 0 1-1.5 1.5h-6A1.5 1.5 0 0 1 7 14.5V13h2v.5a.5.5 0 0 0 1 0V13h3v.5a.5.5 0 0 0 1 0z"
          />
        </svg>
      </div>
    </Link>
  );
};
export default HRsIcon;
