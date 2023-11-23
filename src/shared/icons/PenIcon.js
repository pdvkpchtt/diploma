const PenIcon = ({ fill = "#000", size = 20 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="group-hover:stroke-[#3A56C5] group-active:stroke-[#2C429C] transition duration-[250ms]"
        d="M3.9585 16.0415L7.50016 15.2082L15.2443 7.46404C15.4006 7.30777 15.4883 7.09584 15.4883 6.87487C15.4883 6.6539 15.4006 6.44198 15.2443 6.28571L13.7143 4.75571C13.5581 4.59948 13.3461 4.51172 13.1252 4.51172C12.9042 4.51172 12.6923 4.59948 12.536 4.75571L4.79183 12.4999L3.9585 16.0415Z"
        stroke={fill}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="group-hover:stroke-[#3A56C5] group-active:stroke-[#2C429C] transition duration-[250ms]"
        d="M16.0418 16.042H11.4585"
        stroke={fill}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default PenIcon;
