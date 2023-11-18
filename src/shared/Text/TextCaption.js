import React from "react";

const TextCaption = ({ style, text = "" }) => {
  return <div className={`${style} break-words text-[#bfbfbf]`}>{text}</div>;
};

export default TextCaption;
