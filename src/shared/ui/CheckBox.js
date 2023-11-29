const CheckBox = ({ active = false, onClick = () => {}, disabled = false }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`min-w-[24px] min-h-[24px] h-[24px] w-[24px] ${
        !disabled && "cursor-pointer group"
      }`}
      onClick={onClick}
    >
      <path
        d="M19 4H5C4.73478 4 4.48043 4.10536 4.29289 4.29289C4.10536 4.48043 4 4.73478 4 5V19C4 19.2652 4.10536 19.5196 4.29289 19.7071C4.48043 19.8946 4.73478 20 5 20H19C19.2652 20 19.5196 19.8946 19.7071 19.7071C19.8946 19.5196 20 19.2652 20 19V5C20 4.73478 19.8946 4.48043 19.7071 4.29289C19.5196 4.10536 19.2652 4 19 4Z"
        className={
          !disabled
            ? `${
                active &&
                "fill-[#5875e8] group-hover:fill-[#3A56C5] group-active:fill-[#2C429C] "
              } stroke-[#5875e8] group-hover:stroke-[#3A56C5] group-active:stroke-[#2C429C] transition duration-[250ms]`
            : "stroke-[#8f8f8f]"
        }
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8 12L11 15L16 9"
        stroke={active ? "white" : "none"}
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default CheckBox;
