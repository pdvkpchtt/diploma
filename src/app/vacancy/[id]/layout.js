"use client";

const VacancyLayout = ({ children }) => {
  return (
    <div
      className="flex gap-[16px] w-full h-full [@media(hover)]:overflow-hidden
        [@media(pointer:coarse)]:mb-[80px]  [@media(pointer:coarse)]:mt-[61px]  [@media(pointer:coarse)]:gap-[0px]
              flex-row [@media(pointer:coarse)]:flex-col 
            "
    >
      {children}
      <div
        className={`[@media(pointer:coarse)]:pb-[80px] [@media(hover)]:hidden`}
      />
    </div>
  );
};

export default VacancyLayout;
