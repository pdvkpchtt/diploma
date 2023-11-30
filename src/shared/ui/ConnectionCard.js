"use client";

import Image from "next/image";
import { useMediaQuery } from "react-responsive";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
require("dayjs/locale/ru");
dayjs.locale("ru");
var updateLocale = require("dayjs/plugin/updateLocale");
dayjs.extend(updateLocale);

import TextMain from "../../shared/Text/TextMain";
import EmptyAvatar from "./EmptyAvatar";

const ConnectionCard = ({
  item,
  updateModal,
  update = false,
  friend = false,
  company = false,
  role = "",
}) => {
  const isMobile = useMediaQuery({ query: "(pointer:coarse)" });
  const router = useRouter();

  return (
    <div className="flex flex-row p-[8px] justify-between items-center rounded-[20px] bg-white dark:bg-[#212122]">
      <div className="flex flex-row overflow-hidden [@media(pointer:coarse)]:gap-[8px] gap-[10px]">
        {/* image */}
        <div
          className={`min-w-[50px] cursor-pointer overflow-hidden h-[50px] aspect-square [@media(pointer:coarse)]:min-w-[40px] [@media(pointer:coarse)]:h-[40px] ${
            company
              ? "rounded-full"
              : "rounded-[10px]  [@media(pointer:coarse)]:rounded-[12px]"
          }`}
          onClick={() => {
            if (company) router.push(`/companyprofile/${item?.username}`);
            else
              router.push(
                `/profile/${
                  friend
                    ? item?.username || item?.id
                    : item?.userFrom?.username || item?.userFrom?.id
                }`
              );
          }}
        >
          {item?.image ? (
            <Image
              src={item?.image}
              alt="Profile image"
              width={50}
              height={50}
              priority
              unoptimized
              className="h-[50px] w-[50px] [@media(pointer:coarse)]:w-[40px] object-cover [@media(pointer:coarse)]:h-[40px]"
            />
          ) : (
            <EmptyAvatar
              fifty={isMobile ? false : true}
              little={isMobile ? true : false}
            />
          )}
        </div>
        {/* image */}

        {/* text */}
        <div className="flex flex-col [@media(pointer:coarse)]:gap-[4px] gap-[5px] w-full overflow-hidden">
          <TextMain
            text={item?.name}
            style="font-medium text-[16px] cursor-pointer leading-[19.2px] tracking-[-0.015em] whitespace-nowrap truncate"
            onClick={() => {
              if (company) router.push(`/companyprofile/${item?.username}`);
              else router.push(`/profile/${item?.username || item?.id}`);
            }}
          />
        </div>
        {/* text */}
      </div>
    </div>
  );
};

export default ConnectionCard;
