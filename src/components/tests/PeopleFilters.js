import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useMediaQuery } from "react-responsive";

import TextSecondary from "../../shared/Text/TextSecondary";
import SkillCard from "../../shared/ui/SkillCard";
import DropDownWithChoise from "../../shared/ui/DropDownWithChoise";
import SkillsDropDown from "../../shared/ui/SkillsDropDown";

import AddCityIcon from "../../shared/icons/AddCityIcon";
import AddSkillIcon from "../../shared/icons/AddSkillIcon";
import DropDownWithSearch from "@/shared/ui/DropDownWithSearch";

const PeopleFilters = ({
  updatePeople = [],
  setUpdatePeople = () => {},
  dropDataVacancies = {},
}) => {
  const [state, setState] = useState(false);
  console.log(updatePeople, "loopa");

  return (
    <div className="w-full  flex flex-col gap-[16px] h-fit bg-white dark:bg-[#212122] p-[12px] rounded-b-[20px]">
      <div className="flex flex-col relative">
        <TextSecondary
          text={"Сфера"}
          style="font-medium text-[14px] select-none leading-[16.8px] tracking-[-0.013em] mb-[6px]"
        />
        {updatePeople.area.length > 0 ? (
          <div className="flex-wrap flex flex-row gap-[10px]">
            {updatePeople.area.map((item, key) => (
              <SkillCard
                key={key}
                onClick={() => setState(true)}
                noCopy
                area
                hard={false}
                text={item.label}
              />
            ))}
          </div>
        ) : (
          <AddCityIcon area onClick={() => setState(true)} />
        )}
        <DropDownWithChoise
          state={state}
          setState={setState}
          city={updatePeople?.area}
          setCity={(val) => {
            setUpdatePeople({
              ...updatePeople,
              area: val,
            });
          }}
          items={dropDataVacancies?.vacArea}
          placeholder="Не выбрано"
        />
      </div>
      <div className="flex flex-col w-full">
        <TextSecondary
          text={"Тип теста"}
          style="font-medium text-[14px] select-none leading-[16.8px] tracking-[-0.013em] mb-[6px]"
        />
        <DropDownWithSearch
          city={updatePeople?.isAi?.label}
          setCity={(val) => {
            setUpdatePeople({
              ...updatePeople,
              isAi: val,
            });
          }}
          items={[{ label: "Сгенерирован AI" }, { label: "Создан вручную" }]}
          placeholder={"Не выбрано"}
        />
      </div>
    </div>
  );
};

export default PeopleFilters;
