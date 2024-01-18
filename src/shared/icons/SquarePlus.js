const SquarePlus = ({ styled = "", onClick = () => {} }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 256 256"
    className={`${styled} cursor-pointer group `}
    onClick={onClick}
  >
    <path
      className={
        " fill-[#5875e8] group-hover:fill-[#3A56C5] group-active:fill-[#2C429C] transition duration-[250ms]"
      }
      d="M208 32H48a16 16 0 0 0-16 16v160a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16m-24 104h-48v48a8 8 0 0 1-16 0v-48H72a8 8 0 0 1 0-16h48V72a8 8 0 0 1 16 0v48h48a8 8 0 0 1 0 16"
    />
  </svg>
);
export default SquarePlus;
