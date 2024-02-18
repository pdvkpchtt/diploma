"use client";

import Image from "next/image";

import TextMain from "../Text/TextMain";
import TextSecondary from "../Text/TextSecondary";
import Card from "./Card";
import SkillCard from "./SkillCard";
import EmptyAvatar from "./EmptyAvatar";
import { useRouter } from "next/navigation";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { ButtonPrimary } from "./Button";
dayjs.extend(relativeTime);
require("dayjs/locale/ru");
dayjs.locale("ru");
var updateLocale = require("dayjs/plugin/updateLocale");
dayjs.extend(updateLocale);

const EndedMeetingCard = ({ item, role, status }) => {
  const router = useRouter();

  var start = new Date(item.createdAt);
  var stop = new Date(item.endedAt);
  var session = stop - start;
  var session_string = msToTime(session);

  function msToTime(duration, show_days) {
    var seconds = parseInt((duration / 1000) % 60);
    var minutes = parseInt((duration / (1000 * 60)) % 60);
    var hours = parseInt((duration / (1000 * 60 * 60)) % 24);
    var days = parseInt(duration / (1000 * 60 * 60 * 24));
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    // Формат возвращаемого значения перепишите как Вам надо.
    return show_days
      ? GetNumberWithPostfix(days, "day") +
          ", " +
          hours +
          ":" +
          minutes +
          ":" +
          seconds
      : hours + ":" + minutes + ":" + seconds;
  }

  return (
    <Card style="flex flex-col gap-[12px]" padding={12}>
      {/* image name time */}
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-[12px]">
          <div className="min-w-[67px] h-[67px] aspect-square w-[67px] min-h-[67px]  max-w-[67px] max-h-[67px] overflow-hidden rounded-full">
            {item?.creator?.image ? (
              <Image
                src={item.creator.image}
                width={67}
                unoptimized
                height={67}
                alt="Profile image"
                className="min-w-[67px] max-w-[67px] object-cover max-h-[67px] h-[67px] w-[67px] min-h-[67px]"
              />
            ) : (
              <EmptyAvatar sixtySeven />
            )}
          </div>
          <div className="flex flex-col gap-[4px]">
            <TextMain
              text={'Собеседование на должность "' + item.name + '"'}
              style="font-medium text-[16px] cursor-pointer leading-[19.2px] tracking-[-0.24px]"
              // onClick={() => router.push()}
            />

            <TextSecondary
              text={
                "HR • " +
                item.creator.HR.find((i) => i.userId === item.hrCreator).user
                  .name +
                " • " +
                item.creator.username
              }
              style="font-medium text-[14px] break-all leading-[18px] tracking-[-0.182px]"
            />
            {role?.includes("hr") && (
              <TextSecondary
                text={"Соискатель • " + item.student.name}
                style="font-medium text-[14px] break-all leading-[18px] tracking-[-0.182px]"
              />
            )}
            <p className="text-[14px] leading-[17px] whitespace-pre-line font-medium tracking-[-0.252px] text-[#5875e8]">
              Завершено
            </p>
            <TextSecondary
              text={"Длительность - " + session_string}
              style={
                "text-[14px] leading-[17px] whitespace-pre-line font-medium tracking-[-0.252px]"
              }
            />
          </div>
        </div>
        <div className="flex flex-row gap-[8px] items-center h-fit">
          {/* <div className="flex flex-row gap-[4px] items-center">
                  {item?.partOfTeam?.userId && (
                    <DotsIcon onClick={() => toggle(true)} />
                  )}
                  {(role === "student" || role.includes("hr")) && (
                    <BookmarkIcon item={item} userId={userId} />
                  )}
                </div> */}
        </div>
      </div>
      {/* image name time */}
    </Card>
  );
};

export default EndedMeetingCard;
