"use client";

const TextMain = ({ style, text = "", onClick }) => {
  return (
    <div
      className={`${style} break-words text-[#2c2c2c] dark:text-white`}
      onClick={onClick ? () => onClick() : null}
    >
      {text}
    </div>
  );
};

export default TextMain;
