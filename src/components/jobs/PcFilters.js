"use client";

import { usePathname } from "next/navigation";

import CheckIcon from "../../shared/icons/CheckIcon";
import VacancyFilter from "./VacancyFilter";

import RefreshIcon from "../../shared/icons/RefreshIcon";

const PcFilters = ({
  updateVacancies = [],
  setUpdateVacancies = () => {},
  dropDataVacancies = {},
}) => {
  const pathname = usePathname();

  const handleRemoveFilters = async () => {
    setUpdateVacancies({
      startFiltering: false,
      distantWork: null,
      input: "",
      location: { label: "" },
      area: [],
      VacancySkills: [],
    });
  };

  const handleSetFilters = async () => {
    setUpdateVacancies({ ...updateVacancies, startFiltering: true });
  };

  return (
    <div className="flex flex-col border-[#E7E7E7] dark:border-[#2f2f2f] max-w-[260px] [@media(hover)]:h-fit fixed ml-[720px] [@media(hover)]:mt-[24px] w-full rounded-[20px] bg-white dark:bg-[#212122] [@media(pointer:coarse)]:hidden">
      {/* header */}
      <div className="border-b-[0.7px] border-b-[#E7E7E7] dark:border-b-[#2f2f2f] bg-white dark:bg-[#212122] rounded-t-[20px] p-[12px]">
        <div className="w-full items-center flex flex-row justify-end [@media(pointer:coarse)]:max-w-[476px] [@media(pointer:coarse)]:mx-auto">
          <div
            className={`
            ${true && "cursor-pointer"}
                px-[12px] py-[8px] rounded-[16px] mr-[8px]  transition duration-[250ms] select-none w-fit
                bg-[#74899B] bg-opacity-[8%] "
                group
            `}
            onClick={true ? () => handleRemoveFilters() : null}
          >
            <RefreshIcon active={true} />
          </div>

          <div
            className={`
                px-[12px] py-[8px] rounded-[16px] transition duration-[250ms] select-none w-fit
                ${
                  true
                    ? "bg-[#5875e8] hover:bg-[#3A56C5] active:bg-[#2C429C] cursor-pointer"
                    : "bg-[#74899B] bg-opacity-[8%] cursor-default"
                }
            `}
            onClick={() => handleSetFilters()}
          >
            <CheckIcon fill={true ? "#fff" : "#bfbfbf"} />
          </div>
        </div>
      </div>
      {/* header */}

      {/* body */}
      <div className="w-full max-h-full h-fit rounded-b-[20px]">
        <div className="h-fit bg-white dark:bg-[#212122] rounded-b-[20px] flex flex-col gap-[16px] [@media(pointer:coarse)]:p-[12px]">
          <VacancyFilter
            dropDataVacancies={dropDataVacancies}
            updateVacancies={updateVacancies}
            skills={dropDataVacancies.vacskills}
            setUpdateVacancies={setUpdateVacancies}
          />
        </div>
      </div>
      {/* body */}
    </div>
  );
};

export default PcFilters;
