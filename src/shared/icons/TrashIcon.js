const TrashIcon = ({ gray = false, onClick = () => {} }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="cursor-pointer"
      onClick={onClick}
    >
      <path
        className={
          gray
            ? ""
            : "group-hover:stroke-[#3A56C5] group-active:stroke-[#2C429C] transition duration-[250ms]"
        }
        d="M9.33325 6.66699V11.3337"
        stroke={gray ? "#8F8F8F" : "#5875E8"}
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className={
          gray
            ? ""
            : "group-hover:stroke-[#3A56C5] group-active:stroke-[#2C429C] transition duration-[250ms]"
        }
        d="M6.66675 6.66699V11.3337"
        stroke={gray ? "#8F8F8F" : "#5875E8"}
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className={
          gray
            ? ""
            : "group-hover:stroke-[#3A56C5] group-active:stroke-[#2C429C] transition duration-[250ms]"
        }
        d="M12 4H4V13.3333C4 13.5101 4.07024 13.6797 4.19526 13.8047C4.32029 13.9298 4.48986 14 4.66667 14H11.3333C11.5101 14 11.6797 13.9298 11.8047 13.8047C11.9298 13.6797 12 13.5101 12 13.3333V4Z"
        stroke={gray ? "#8F8F8F" : "#5875E8"}
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className={
          gray
            ? ""
            : "group-hover:stroke-[#3A56C5] group-active:stroke-[#2C429C] transition duration-[250ms]"
        }
        d="M2.66675 4H13.3334"
        stroke={gray ? "#8F8F8F" : "#5875E8"}
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className={
          gray
            ? ""
            : "group-hover:stroke-[#3A56C5] group-active:stroke-[#2C429C] transition duration-[250ms]"
        }
        d="M9.99992 2H5.99992C5.82311 2 5.65354 2.07024 5.52851 2.19526C5.40349 2.32029 5.33325 2.48986 5.33325 2.66667V4H10.6666V2.66667C10.6666 2.48986 10.5963 2.32029 10.4713 2.19526C10.3463 2.07024 10.1767 2 9.99992 2Z"
        stroke={gray ? "#8F8F8F" : "#5875E8"}
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default TrashIcon;
