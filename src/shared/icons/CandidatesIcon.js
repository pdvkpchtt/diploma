"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const CandidatesIcon = () => {
  const pathname = usePathname();
  return (
    <Link href={"/candidates"} className="group">
      <div className="w-[30px] h-[30px] flex items-center justify-center cursor-pointer bg-transparent group-hover:bg-[#74899B] group-hover:bg-opacity-[8%] transition duration-[250ms] rounded-[8px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={25}
          height={25}
          viewBox="0 0 15 16"
        >
          <path
            className={
              pathname.includes("candidates")
                ? "fill-[#5875e8]"
                : "fill-[#2c2c2c] dark:fill-[#fff]"
            }
            d="M7.5 7a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5m0-4C6.67 3 6 3.67 6 4.5S6.67 6 7.5 6 9 5.33 9 4.5 8.33 3 7.5 3"
          />
          <path
            className={
              pathname.includes("candidates")
                ? "fill-[#5875e8]"
                : "fill-[#2c2c2c] dark:fill-[#fff]"
            }
            d="M13.5 11c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5-.22.5-.5A2.5 2.5 0 0 0 11.5 7h-1c-.28 0-.5-.22-.5-.5s.22-.5.5-.5c.83 0 1.5-.67 1.5-1.5S11.33 3 10.5 3c-.28 0-.5-.22-.5-.5s.22-.5.5-.5A2.5 2.5 0 0 1 13 4.5c0 .62-.22 1.18-.6 1.62 1.49.4 2.6 1.76 2.6 3.38 0 .83-.67 1.5-1.5 1.5m-12 0C.67 11 0 10.33 0 9.5c0-1.62 1.1-2.98 2.6-3.38-.37-.44-.6-1-.6-1.62A2.5 2.5 0 0 1 4.5 2c.28 0 .5.22.5.5s-.22.5-.5.5C3.67 3 3 3.67 3 4.5S3.67 6 4.5 6c.28 0 .5.22.5.5s-.22.5-.5.5h-1A2.5 2.5 0 0 0 1 9.5c0 .28.22.5.5.5s.5.22.5.5-.22.5-.5.5m9 3h-6c-.83 0-1.5-.67-1.5-1.5v-1C3 9.57 4.57 8 6.5 8h2c1.93 0 3.5 1.57 3.5 3.5v1c0 .83-.67 1.5-1.5 1.5m-4-5A2.5 2.5 0 0 0 4 11.5v1c0 .28.22.5.5.5h6c.28 0 .5-.22.5-.5v-1A2.5 2.5 0 0 0 8.5 9z"
          />
        </svg>
      </div>
    </Link>
  );
};
export default CandidatesIcon;
