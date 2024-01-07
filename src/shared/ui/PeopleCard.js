"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

import TextMain from "../Text/TextMain";
import TextSecondary from "../Text/TextSecondary";
import Card from "./Card";
import EmptyAvatar from "./EmptyAvatar";
import SkillCard from "./SkillCard";

const PeopleCard = ({ item }) => {
  const router = useRouter();

  return (
    <Card style="flex flex-col gap-[12px]" padding={12}>
      {/* image name time */}
      <div className="flex flex-row gap-[8px]">
        <div
          className="h-[67px] w-[67px] max-h-[67px] cursor-pointer max-w-[67px] min-h-[67px] min-w-[67px] aspect-square overflow-hidden  rounded-[8px]"
          onClick={() => router.push(`/profile/${item.username || item.id}`)}
        >
          {item.image ? (
            <Image
              src={item.image}
              alt="Profile image"
              // loading="lazy"
              unoptimized
              quality={100}
              width={67}
              height={67}
              className="h-[67px] w-[67px] max-h-[67px] max-w-[67px] min-h-[67px] min-w-[67px] object-cover"
            />
          ) : (
            <EmptyAvatar sixtySeven />
          )}
        </div>
        <div className="flex flex-col gap-[4px]">
          <TextMain
            text={`${item.name}`}
            style="font-medium text-[16px] cursor-pointer leading-[19.2px] tracking-[-0.015em]"
            onClick={() => router.push(`/profile/${item.username || item.id}`)}
          />
          <TextSecondary
            text={"@" + item.username}
            style="font-medium text-[14px] leading-[18px] tracking-[-0.015em]"
          />
          {item.city === null || item.city?.length === 0 ? null : (
            <TextSecondary
              text={item.city}
              style="font-normal text-[14px] leading-[18px] tracking-[-0.015em]"
            />
          )}
        </div>
      </div>
      {/* image name time */}

      {/* about */}
      {item.about && (
        <TextSecondary
          text={item.about}
          style={"text-[14px] leading-[17px] tracking-[-0.252px]"}
        />
      )}
      {/* about */}

      {/* skills */}
      {item.UserSkills.length > 0 && (
        <div className="flex flex-row flex-wrap overflow-hidden gap-[8px] h-[24px] [@media(pointer:coarse)]:h-fit [@media(pointer:coarse)]:max-h-[56px]">
          {item.UserSkills.map(
            (item) =>
              item.skill.type === "hard" && (
                <SkillCard
                  hard={item.skill.type == "hard"}
                  soft={item.skill.type == "soft"}
                  key={item.id}
                  style="mr-[4px]"
                  text={item.skill.name}
                />
              )
          )}
          {item.UserSkills.map(
            (item) =>
              item.skill.type === "soft" && (
                <SkillCard
                  hard={item.skill.type == "hard"}
                  soft={item.skill.type == "soft"}
                  key={item.id}
                  style="mr-[4px]"
                  text={item.skill.name}
                />
              )
          )}
        </div>
      )}
      {/* skills */}
    </Card>
  );
};

export default PeopleCard;
