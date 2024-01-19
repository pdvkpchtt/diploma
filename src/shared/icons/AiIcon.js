const AiIcon = ({ blue = true, black = false, white = false }) => {
  const style =
    (blue &&
      "fill-[#5875e8] group-hover:fill-[#3A56C5] group-active:fill-[#2C429C] transition duration-[250ms]") ||
    (black && "fill-[#2c2c2c] dark:fill-[#fff]") ||
    (white && "fill-[#fff]");

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={26}
      height={26}
      viewBox="0 0 24 24"
    >
      <path
        className={style}
        d="M21 11V9h-2V7a2.006 2.006 0 0 0-2-2h-2V3h-2v2h-2V3H9v2H7a2.006 2.006 0 0 0-2 2v2H3v2h2v2H3v2h2v2a2.006 2.006 0 0 0 2 2h2v2h2v-2h2v2h2v-2h2a2.006 2.006 0 0 0 2-2v-2h2v-2h-2v-2Zm-4 6H7V7h10Z"
      />
      <path
        className={style}
        d="M11.361 8h-1.345l-2.01 8h1.027l.464-1.875h2.316L12.265 16h1.062Zm-1.729 5.324L10.65 8.95h.046l.983 4.374ZM14.244 8h1v8h-1z"
      />
    </svg>
  );
};

export default AiIcon;
