import { useMediaQuery } from "react-responsive";
import { useClipboard } from "use-clipboard-copy";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SkillCard = ({
  style,
  text,
  noCopy = false,
  hard = true,
  soft = false,
  area = false,
  onClick = () => {},
}) => {
  const isMobile = useMediaQuery({ query: "(pointer:coarse)" });
  const clipboard = useClipboard();

  return (
    <div
      className={`${style} ${
        hard &&
        "bg-[#5875E8] hover:bg-[#3A56C5] active:bg-[#2C429C] hover:bg-opacity-[70%] active:bg-opacity-[70%] bg-opacity-[70%] text-[#fff]"
      } ${
        soft &&
        "bg-[#74899B] bg-opacity-[8%] text-[#5875e8] hover:text-[#3A56C5] active:text-[#2C429C]"
      } ${
        area &&
        "bg-[#74899B] bg-opacity-[8%] text-[#687094] hover:text-[#51597A] active:text-[#444B67]"
      } px-[8px] w-fit whitespace-nowrap transition duration-[250ms] select-none cursor-pointer py-[4px] rounded-[20px] font-medium text-[13px] leading-[16px] tracking-[-0.027em]`}
      onClick={() => {
        if (!noCopy) {
          toast(`🗂 Текст скопирован`, {
            position: isMobile ? "top-center" : "bottom-right",
            autoClose: 4000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            // theme: "dark",
            progressStyle: { background: "#5875e8" },
            containerId: "forCopy",
          });
          clipboard.copy(text);
        } else onClick();
      }}
    >
      {text}
    </div>
  );
};

export default SkillCard;
