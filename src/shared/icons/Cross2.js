const Cross2 = ({ onClick = () => {} }) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="cursor-pointer group"
      onClick={onClick}
    >
      <path
        d="M15.1844 2.80971L8.82047 9.17367L7.22948 10.7647L2.81006 15.1841"
        className="stroke-[#5875e8] group-hover:stroke-[#3A56C5] group-active:stroke-[#2C429C] transition duration-[250ms]"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M15.1893 15.1864L8.82535 8.82242L7.23436 7.23143L2.81494 2.81201"
        className="stroke-[#5875e8] group-hover:stroke-[#3A56C5] group-active:stroke-[#2C429C] transition duration-[250ms]"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default Cross2;
