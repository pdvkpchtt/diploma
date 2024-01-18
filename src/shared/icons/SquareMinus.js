const SquareMinus = ({ styled = "", onClick = () => {} }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 256 256"
    className={`${styled} cursor-pointer group`}
    onClick={onClick}
  >
    <path
      className={
        " fill-[#687094] group-hover:fill-[#51597A] group-active:fill-[#444B67] transition duration-[250ms]"
      }
      d="M208 32H48a16 16 0 0 0-16 16v160a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16m-24 104H72a8 8 0 0 1 0-16h112a8 8 0 0 1 0 16"
    />
  </svg>
);
export default SquareMinus;
