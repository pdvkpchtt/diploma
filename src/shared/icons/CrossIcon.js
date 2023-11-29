const CrossIcon = ({ size = 16, hard = true }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={`${
          hard
            ? "stroke-[#F56C89] group-hover:stroke-[#E45775] group-active:stroke-[#C9506A]"
            : "stroke-[#5875e8] group-hover:stroke-[#3A56C5] group-active:stroke-[#2C429C]"
        } transition duration-[250ms]`}
        d="M11.5 4.5L4.5 11.5"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        className={`${
          hard
            ? "stroke-[#F56C89] group-hover:stroke-[#E45775] group-active:stroke-[#C9506A]"
            : "stroke-[#5875e8] group-hover:stroke-[#3A56C5] group-active:stroke-[#2C429C]"
        } transition duration-[250ms]`}
        d="M4.5 4.5L11.5 11.5"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default CrossIcon;
