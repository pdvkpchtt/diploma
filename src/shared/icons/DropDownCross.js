const DropDownCross = () => {
  return (
    <svg
      width="18"
      height="18"
      className="w-[18px] h-[18px]"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 8L4 4"
        className="dark:stroke-[#8F8F8F] stroke-[#bfbfbf]"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 4L4 8"
        className="dark:stroke-[#8F8F8F] stroke-[#bfbfbf]"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default DropDownCross;
