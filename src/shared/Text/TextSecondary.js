import React from "react";

const TextSecondary = ({ style, text = "", onClick }) => {
  return (
    <div
      className={`${style} break-words text-[#8f8f8f]`}
      onClick={onClick ? onClick : null}
    >
      {text}
    </div>
  );
};

export default TextSecondary;
