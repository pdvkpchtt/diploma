"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const CallsIcon = () => {
  const pathname = usePathname();

  return (
    <Link href={"/calls"} className="group">
      <div className="w-[30px] h-[30px] flex items-center justify-center cursor-pointer bg-transparent group-hover:bg-[#74899B] group-hover:bg-opacity-[8%] transition duration-[250ms] rounded-[8px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={25}
          height={25}
          viewBox="0 0 16 16"
        >
          <path
            className={
              pathname.includes("calls")
                ? "fill-[#5875e8]"
                : "fill-[#2c2c2c] dark:fill-[#fff]"
            }
            d="M10 7a2 2 0 1 1-4 0 2 2 0 0 1 4 0M1 4.75C1 3.784 1.784 3 2.75 3h10.5c.966 0 1.75.784 1.75 1.75v.435a2.299 2.299 0 0 0-1-.183V4.75a.75.75 0 0 0-.75-.75H2.75a.75.75 0 0 0-.75.75v6.5c0 .414.336.75.75.75H5v-1a1 1 0 0 1 1-1h4a1 1 0 0 1 .958.714 2.067 2.067 0 0 0-1.841.66l-.545.608c-.27.301-.443.653-.522 1.018h-5.3A1.75 1.75 0 0 1 1 11.25zm11.584 2.831.283-.75c.258-.68 1.062-1.016 1.74-.727l.388.166c.473.202.865.568.947 1.06.457 2.725-1.908 6.601-4.63 7.59-.492.178-1.023.04-1.445-.246l-.346-.235a1.184 1.184 0 0 1-.204-1.79l.545-.607a1.066 1.066 0 0 1 1.034-.323l1.225.29c.971-.607 1.492-1.46 1.562-2.56l-.878-.86a.937.937 0 0 1-.221-1.008"
          />
        </svg>
      </div>
    </Link>
  );
};

export default CallsIcon;
