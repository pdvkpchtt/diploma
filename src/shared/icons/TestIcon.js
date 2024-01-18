"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const TestIcon = () => {
  const pathname = usePathname();

  return (
    <Link href={"/tests"} className="group">
      <div className="w-[30px] h-[30px] flex items-center justify-center cursor-pointer bg-transparent group-hover:bg-[#74899B] group-hover:bg-opacity-[8%] transition duration-[250ms] rounded-[8px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={22}
          height={22}
          viewBox="0 0 24 24"
        >
          <path
            className={
              pathname.includes("tests")
                ? "fill-[#5875e8]"
                : "fill-[#2c2c2c] dark:fill-[#fff]"
            }
            d="M5 22h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2h-2a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1H5c-1.103 0-2 .897-2 2v15c0 1.103.897 2 2 2M5 5h2v2h10V5h2v15H5z"
          />
          <path
            className={
              pathname.includes("tests")
                ? "fill-[#5875e8]"
                : "fill-[#2c2c2c] dark:fill-[#fff]"
            }
            d="m11 13.586-1.793-1.793-1.414 1.414L11 16.414l5.207-5.207-1.414-1.414z"
          />
        </svg>
      </div>
    </Link>
  );
};

export default TestIcon;
