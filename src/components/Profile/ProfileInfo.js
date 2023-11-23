import Link from "next/link";

import TextMain from "../../shared/Text/TextMain";
import TextSecondary from "../../shared/Text/TextSecondary";
import Card from "../../shared/ui/Card";

import { ButtonSecondary } from "../../shared/ui/Button";
import PenIcon from "../../shared/icons/PenIcon";

const ProfileInfo = ({ data, others = false }) => {
  if (data.about == null || data.about == "")
    if (others)
      return (
        <Card style={"flex justify-center"}>
          <div className="items-center flex flex-col gap-[24px] justify-center w-full text-center ">
            <TextMain
              text={`Пользователь не заполнил информацию о себе`}
              style="text-[14px] font-medium leading-[18px] tracking-[-0.013em]"
            />
          </div>
        </Card>
      );
    else
      return (
        <Card>
          <div
            className="items-center flex flex-col gap-[24px] mx-auto justify-center w-full max-w-[288px] text-center 
        my-[38px] [@media(pointer:coarse)]:my-[33px]"
          >
            <TextMain
              text={`Заполните профиль, чтобы здесь появилась информация о вас`}
              style="text-[18px] leading-[21.6px] tracking-[-0.025em]"
            />
            <Link href="/profile/edit">
              <ButtonSecondary
                rounded={16}
                style="w-fit px-[12px] "
                text="Редактировать"
              >
                <PenIcon fill={"#5875e8"} />
              </ButtonSecondary>
            </Link>
          </div>
        </Card>
      );

  return (
    <>
      <Card style="flex flex-col h-full gap-[20px]">
        {/* about me */}
        {data.about && (
          <div className="flex flex-col gap-[8px]">
            <TextSecondary
              text={others ? "О пользователе" : "Обо мне"}
              style="font-medium select-none leading-[18px] traking-[-0.013em] text-[14px]"
            />

            <TextMain
              text={data.about}
              style="font-medium leading-[18px] traking-[-0.013em] text-[14px]"
            />
          </div>
        )}
        {/* about me */}
      </Card>
    </>
  );
};

export default ProfileInfo;
