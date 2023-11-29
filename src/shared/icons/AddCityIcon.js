const AddCityIcon = ({
  onClick = () => {},
  area = false,
  disabled = false,
}) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${!disabled && "cursor-pointer"}`}
      onClick={onClick}
    >
      <path
        d="M12 21C13.1819 21 14.3522 20.7672 15.4442 20.3149C16.5361 19.8626 17.5282 19.1997 18.364 18.364C19.1997 17.5282 19.8626 16.5361 20.3149 15.4442C20.7672 14.3522 21 13.1819 21 12C21 10.8181 20.7672 9.64778 20.3149 8.55585C19.8626 7.46392 19.1997 6.47177 18.364 5.63604C17.5282 4.80031 16.5361 4.13738 15.4442 3.68508C14.3522 3.23279 13.1819 3 12 3C9.61305 3 7.32387 3.94821 5.63604 5.63604C3.94821 7.32387 3 9.61305 3 12C3 14.3869 3.94821 16.6761 5.63604 18.364C7.32387 20.0518 9.61305 21 12 21Z"
        className={
          disabled
            ? "stroke-[#8f8f8f] fill-[#8f8f8f]"
            : area
            ? "stroke-[#687094] hover:stroke-[#51597A] active:stroke-[#444B67] fill-[#687094] hover:fill-[#51597A] active:fill-[#444B67] transition duration-[250ms]"
            : "stroke-[#5875e8] hover:stroke-[#3A56C5] active:stroke-[#2C429C] fill-[#5875e8] hover:fill-[#3A56C5] active:fill-[#2C429C] transition duration-[250ms]"
        }
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 12H16"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 16V8"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default AddCityIcon;
