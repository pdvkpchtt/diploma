"use client";

const VacancyLayout = ({ children }) => {
  return (
    <div
      className="flex gap-[16px] w-full h-full
        [@media(pointer:coarse)]:mb-[80px]  [@media(pointer:coarse)]:mt-[61px]  [@media(pointer:coarse)]:gap-[0px]
              flex-row [@media(pointer:coarse)]:flex-col 
            "
    >
      {children}
      <div className={`pb-[80px] [@media(hover)]:pb-[104px]`} />
    </div>
  );
};

export default VacancyLayout;
