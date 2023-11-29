const PlusIcon = ({ fill = "#5875e8", noHover = false, hard = true }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={`${
          !noHover &&
          "group-hover:stroke-[#3A56C5] group-active:stroke-[#2C429C] transition duration-[250ms]"
        }`}
        d="M13.8334 8H7.83341H6.33341H2.16675"
        stroke={fill}
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <path
        className={`${
          !noHover &&
          "group-hover:stroke-[#3A56C5] group-active:stroke-[#2C429C] transition duration-[250ms]"
        }`}
        d="M8 13.8337V7.83366V6.33366V2.16699"
        stroke={fill}
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </svg>
  );
};

export default PlusIcon;
