"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const ProfileIcon = ({ fill = "#000", size = 25, role }) => {
  const pathname = usePathname();
  // "/companyprofile"

  if (role === "student")
    return (
      <Link href={"/profile"} className="group">
        <div className="w-[30px] h-[30px] flex items-center justify-center cursor-pointer bg-transparent group-hover:bg-[#74899B] group-hover:bg-opacity-[8%] transition duration-[250ms] rounded-[8px]">
          <svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 21C5 18.239 8.35812 16 12.5 16C16.6419 16 20 18.239 20 21"
              className={
                pathname.includes("profile")
                  ? "stroke-[#5875e8]"
                  : "stroke-[#2c2c2c] dark:stroke-[#fff]"
              }
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12.5 13C13.6935 13 14.8381 12.5259 15.682 11.682C16.5259 10.8381 17 9.69347 17 8.5C17 7.30653 16.5259 6.16193 15.682 5.31802C14.8381 4.47411 13.6935 4 12.5 4C11.3065 4 10.1619 4.47411 9.31802 5.31802C8.47411 6.16193 8 7.30653 8 8.5C8 9.69347 8.47411 10.8381 9.31802 11.682C10.1619 12.5259 11.3065 13 12.5 13Z"
              className={
                pathname.includes("profile")
                  ? "stroke-[#5875e8]"
                  : "stroke-[#2c2c2c] dark:stroke-[#fff]"
              }
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </Link>
    );
  else if (role === "hr" && !pathname.includes("/companyprofile"))
    return (
      <Link
        href={pathname === "/profile" ? "/companyprofile" : "/profile"}
        className="group"
      >
        <div className="w-[30px] h-[30px] flex items-center justify-center cursor-pointer bg-transparent group-hover:bg-[#74899B] group-hover:bg-opacity-[8%] transition duration-[250ms] rounded-[8px]">
          <svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.62 20V7.4H3.78V12.584H9.9V7.4H12.06V20H9.9V14.456H3.78V20H1.62ZM13.8558 20V7.4H18.6258C19.6818 7.4 20.5578 7.568 21.2538 7.904C21.9618 8.24 22.4958 8.702 22.8558 9.29C23.2158 9.878 23.3958 10.556 23.3958 11.324C23.3958 12.188 23.1618 12.938 22.6938 13.574C22.2258 14.198 21.5238 14.648 20.5878 14.924L23.7558 20H21.3798L18.5898 15.176H16.0158V20H13.8558ZM16.0158 13.376H18.2658C19.3698 13.376 20.1378 13.196 20.5698 12.836C21.0138 12.476 21.2358 11.972 21.2358 11.324C21.2358 10.676 21.0138 10.172 20.5698 9.812C20.1378 9.452 19.3698 9.272 18.2658 9.272H16.0158V13.376Z"
              className={
                pathname.includes("profile")
                  ? "fill-[#5875e8]"
                  : "fill-[#2c2c2c] dark:fill-[#fff]"
              }
            />
          </svg>
        </div>
      </Link>
    );
  else if (role === "hr" && pathname.includes("/companyprofile"))
    return (
      <Link href={"/profile"} className="group">
        <div className="w-[30px] h-[30px] flex items-center justify-center cursor-pointer bg-transparent group-hover:bg-[#74899B] group-hover:bg-opacity-[8%] transition duration-[250ms] rounded-[8px]">
          <svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 21H22"
              className={
                pathname.includes("profile")
                  ? "stroke-[#5875e8]"
                  : "stroke-[#2c2c2c] dark:stroke-[#fff]"
              }
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7 11H11"
              className={
                pathname.includes("profile")
                  ? "stroke-[#5875e8]"
                  : "stroke-[#2c2c2c] dark:stroke-[#fff]"
              }
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19 10H15C14.7348 10 14.4804 10.1054 14.2929 10.2929C14.1054 10.4804 14 10.7348 14 11V21H20V11C20 10.7348 19.8946 10.4804 19.7071 10.2929C19.5196 10.1054 19.2652 10 19 10Z"
              className={
                pathname.includes("profile")
                  ? "stroke-[#5875e8]"
                  : "stroke-[#2c2c2c] dark:stroke-[#fff]"
              }
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7 8H11"
              className={
                pathname.includes("profile")
                  ? "stroke-[#5875e8]"
                  : "stroke-[#2c2c2c] dark:stroke-[#fff]"
              }
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M13 4H5C4.73478 4 4.48043 4.10536 4.29289 4.29289C4.10536 4.48043 4 4.73478 4 5V21H14V5C14 4.73478 13.8946 4.48043 13.7071 4.29289C13.5196 4.10536 13.2652 4 13 4Z"
              className={
                pathname.includes("profile")
                  ? "stroke-[#5875e8]"
                  : "stroke-[#2c2c2c] dark:stroke-[#fff]"
              }
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </Link>
    );
  else
    return (
      <Link href={"/profile"} className="group">
        <div className="w-[30px] h-[30px] flex items-center justify-center cursor-pointer bg-transparent group-hover:bg-[#74899B] group-hover:bg-opacity-[8%] transition duration-[250ms] rounded-[8px]">
          <svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 21C5 18.239 8.35812 16 12.5 16C16.6419 16 20 18.239 20 21"
              className={
                pathname.includes("profile")
                  ? "stroke-[#5875e8]"
                  : "stroke-[#2c2c2c] dark:stroke-[#fff]"
              }
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12.5 13C13.6935 13 14.8381 12.5259 15.682 11.682C16.5259 10.8381 17 9.69347 17 8.5C17 7.30653 16.5259 6.16193 15.682 5.31802C14.8381 4.47411 13.6935 4 12.5 4C11.3065 4 10.1619 4.47411 9.31802 5.31802C8.47411 6.16193 8 7.30653 8 8.5C8 9.69347 8.47411 10.8381 9.31802 11.682C10.1619 12.5259 11.3065 13 12.5 13Z"
              className={
                pathname.includes("profile")
                  ? "stroke-[#5875e8]"
                  : "stroke-[#2c2c2c] dark:stroke-[#fff]"
              }
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </Link>
    );
};

export default ProfileIcon;
