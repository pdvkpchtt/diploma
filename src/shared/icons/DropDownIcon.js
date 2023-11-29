const DropDownIcon = ({ style, onClick = () => {} }) => {
  return (
    <svg
      className={`${style} transition duration-[250ms]`}
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="stroke-[#2c2c2c] dark:stroke-[#8f8f8f]"
        d="M14.25 6.75L9 12L3.75 6.75"
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default DropDownIcon;
