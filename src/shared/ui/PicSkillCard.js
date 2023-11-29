import { useTheme } from "next-themes";

import CrossIcon from "../icons/CrossIcon";
import PlusIcon from "../icons/PlusIcon";

const PickSkillCard = ({
  del = false,
  onClick,
  text = "",
  style = "",
  hard = true,
}) => {
  const { resolvedTheme } = useTheme();

  return (
    <div
      className={`${style} items-center select-none cursor-pointer group bg-[#F6F6F8] ${
        del ? "dark:bg-[#74899B] dark:bg-opacity-[8%]" : "dark:bg-[#212324]"
      } ${
        del
          ? hard
            ? "text-[#F56C89] hover:text-[#E45775] active:text-[#C9506A]"
            : "text-[#5875e8] hover:text-[#3A56C5] active:text-[#2C429C]"
          : "text-[#2c2c2c] dark:text-white"
      } transition duration-[250ms] w-fit flex flex-row gap-[8px] px-[8px] py-[4px] rounded-[20px] font-medium text-[13px] leading-[16px] tracking-[-0.027em]`}
      onClick={() => onClick()}
    >
      {del ? (
        <CrossIcon hard={hard} />
      ) : (
        <PlusIcon
          hard={hard}
          noHover
          fill={resolvedTheme == "light" ? "#2c2c2c" : "#fff"}
        />
      )}
      {text}
    </div>
  );
};

export default PickSkillCard;
