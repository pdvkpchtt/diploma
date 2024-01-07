const RefreshIcon = ({ active = false }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.33341 13.3334H4.16675V17.5"
        className={
          !active
            ? "stroke-[#bfbfbf]"
            : `stroke-[#5875e8] group-hover:stroke-[#3A56C5] group-active:stroke-[#2C429C] transition duration-[250ms]`
        }
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.1816 12.4967C15.7144 13.6532 14.9321 14.6554 13.9236 15.3895C12.9151 16.1235 11.721 16.5599 10.4768 16.6491C9.2327 16.7382 7.98851 16.4766 6.88568 15.8938C5.78286 15.3111 4.86564 14.4306 4.23828 13.3525"
        className={
          !active
            ? "stroke-[#bfbfbf]"
            : `stroke-[#5875e8] group-hover:stroke-[#3A56C5] group-active:stroke-[#2C429C] transition duration-[250ms]`
        }
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.6667 6.66667H15.8334V2.5"
        className={
          !active
            ? "stroke-[#bfbfbf]"
            : `stroke-[#5875e8] group-hover:stroke-[#3A56C5] group-active:stroke-[#2C429C] transition duration-[250ms]`
        }
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.81836 7.50255C4.28559 6.34604 5.0679 5.34381 6.07637 4.60977C7.08484 3.87573 8.27901 3.43934 9.52314 3.35018C10.7673 3.26103 12.0115 3.5227 13.1143 4.10545C14.2171 4.6882 15.1343 5.56864 15.7617 6.64672"
        className={
          !active
            ? "stroke-[#bfbfbf]"
            : `stroke-[#5875e8] group-hover:stroke-[#3A56C5] group-active:stroke-[#2C429C] transition duration-[250ms]`
        }
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default RefreshIcon;
