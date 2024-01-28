const CardOpacity = ({
  children,
  styled = "",
  rounded = 20,
  onClick = () => {},
}) => {
  return (
    <div
      style={{ borderRadius: rounded }}
      className={`${styled} p-[12px] group items-center flex flex-row max-w-[260px] [@media(pointer:coarse)]:max-w-[100%] bg-[#74899B] bg-opacity-[8%]`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default CardOpacity;
