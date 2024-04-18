import React from "react";

export function SendIcon() {
  return (
    <button
      type="submit"
      className="transition duration-[250ms] h-fit w-fit cursor-pointer flex items-center justify-center bg-[#5875e8] hover:bg-[#3A56C5] active:bg-[#2C429C] rounded-full p-[10px]"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={16}
        height={16}
        viewBox="0 0 16 16"
      >
        <path
          fill="#fff"
          d="M3.47 7.78a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0l4.25 4.25a.751.751 0 0 1-.018 1.042a.751.751 0 0 1-1.042.018L9 4.81v7.44a.75.75 0 0 1-1.5 0V4.81L4.53 7.78a.75.75 0 0 1-1.06 0"
        ></path>
      </svg>
    </button>
  );
}
