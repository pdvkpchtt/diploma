import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useMediaQuery } from "react-responsive";

import TextSecondary from "../../shared/Text/TextSecondary";
import SkillCard from "../../shared/ui/SkillCard";
import DropDownWithSearch from "../../shared/ui/DropDownWithSearch";
import DropDownWithChoise from "../../shared/ui/DropDownWithChoise";
import SkillsDropDown from "../../shared/ui/SkillsDropDown";

import AddCityIcon from "../../shared/icons/AddCityIcon";
import AddSkillIcon from "../../shared/icons/AddSkillIcon";

const VacancyFilter = ({
  updateVacancies = [],
  setUpdateVacancies = () => {},
  dropDataVacancies = {},
  skills,
}) => {
  let uniqueList = Array.from(new Set(skills.map((a) => a.name))).map(
    (name) => {
      return skills.find((a) => a.name === name);
    }
  );
  const [state, setState] = useState(false);
  const [isOpen, toggle] = useState(false);
  const [isOpen2, toggle2] = useState(false);
  const isMobile = useMediaQuery({ query: "(pointer:coarse)" });

  return (
    <div className="w-full  flex flex-col gap-[16px] h-fit bg-white dark:bg-[#212122] p-[12px] rounded-b-[20px]">
      <div className="flex flex-col relative">
        <TextSecondary
          text={"Сфера"}
          style="font-medium text-[14px] select-none leading-[16.8px] tracking-[-0.013em] mb-[6px]"
        />
        {updateVacancies.area.length > 0 ? (
          <div className="flex-wrap flex flex-row gap-[10px]">
            {updateVacancies.area.map((item, key) => (
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
          city={updateVacancies?.area}
          setCity={(val) => {
            setUpdateVacancies({
              ...updateVacancies,
              area: val,
            });
          }}
          items={dropDataVacancies?.vacArea}
          placeholder="Не выбрано"
        />
      </div>

      {/* skills */}
      {/* <div className="flex flex-col relative gap-[16px]">
        {updateVacancies.VacancySkills.length === 0 ? (
          <div className="flex flex-col">
            <TextSecondary
              text={"Скиллы"}
              style="font-medium text-[14px] select-none leading-[16.8px] tracking-[-0.013em] mb-[6px]"
            />
            <AddCityIcon
              onClick={() => {
                if (updateVacancies.area.length === 0)
                  toast(`🔍 выберите сферу`, {
                    position: isMobile ? "top-center" : "bottom-right",
                    autoClose: 4000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    // theme: "dark",
                    progressStyle: { background: "#5875e8" },
                    containerId: "forCopy",
                  });
                else setSkillsModal(true);
              }}
              disabled={updateVacancies.area.length === 0}
            />
          </div>
        ) : (
          <>
            {updateVacancies.VacancySkills.filter(
              (item) => item.type !== "soft"
            ).length > 0 && (
              <div className="flex flex-col gap-[8px]">
                <TextSecondary
                  text={"Хард-скиллы"}
                  style="font-medium text-[14px] leading-[18px] tracking-[-0.013em] whitespace-nowrap"
                />

                <div className="flex flex-row gap-[8px] flex-wrap">
                  {updateVacancies.VacancySkills.map(
                    (item) =>
                      item.type === "hard" && (
                        <SkillCard
                          noCopy
                          onClick={() => setSkillsModal(true)}
                          text={item.name}
                          key={item.id}
                        />
                      )
                  )}
                </div>
              </div>
            )}
            {updateVacancies.VacancySkills.filter(
              (item) => item.type !== "hard"
            ).length > 0 && (
              <div className="flex flex-col gap-[8px]">
                <TextSecondary
                  text={"Софт-скиллы"}
                  style="font-medium text-[14px] leading-[18px] tracking-[-0.013em] whitespace-nowrap"
                />

                <div className="flex flex-row gap-[8px] flex-wrap">
                  {updateVacancies.VacancySkills.map(
                    (item) =>
                      item.type === "soft" && (
                        <SkillCard
                          noCopy
                          onClick={() => setSkillsModal(true)}
                          soft
                          hard={false}
                          text={item.name}
                          key={item.id}
                        />
                      )
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div> */}

      <div className="flex flex-col relative">
        <TextSecondary
          text={"Хард-скиллы"}
          style="font-medium text-[14px] select-none leading-[16.8px] tracking-[-0.013em] mb-[6px]"
        />
        {updateVacancies?.VacancySkills?.filter((item) => item.type !== "soft")
          .length > 0 ? (
          <div className="flex flex-row gap-[8px] flex-wrap">
            {updateVacancies.VacancySkills.map(
              (item) =>
                item.type === "hard" && (
                  <SkillCard
                    noCopy
                    onClick={() => toggle(true)}
                    text={item.name}
                    key={item.id}
                  />
                )
            )}
          </div>
        ) : (
          <AddSkillIcon
            hard
            disabled={updateVacancies.area.length === 0}
            onClick={() => {
              if (updateVacancies.area.length === 0)
                toast(`🔍 выберите сферу`, {
                  position: isMobile ? "top-center" : "bottom-right",
                  autoClose: 4000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: true,
                  progress: undefined,
                  // theme: "dark",
                  progressStyle: { background: "#5875e8" },
                  containerId: "forCopy",
                });
              else toggle(true);
            }}
          />
        )}
        <SkillsDropDown
          withAreas
          inSearch
          areas={updateVacancies.area}
          state={isOpen}
          setState={() => toggle(false)}
          type={"hard"}
          city={updateVacancies.VacancySkills}
          dataToUpdate={updateVacancies}
          setCity={setUpdateVacancies}
          items={uniqueList?.filter((i) => i?.type === "hard")}
          placeholder="Хард-скиллы"
        />
      </div>
      <div className="flex flex-col relative">
        <TextSecondary
          text={"Софт-скиллы"}
          style="font-medium text-[14px] select-none leading-[16.8px] tracking-[-0.013em] mb-[6px]"
        />

        {updateVacancies?.VacancySkills?.filter((item) => item.type !== "hard")
          .length > 0 ? (
          <div className="flex flex-row gap-[8px] flex-wrap">
            {updateVacancies.VacancySkills.map(
              (item) =>
                item.type === "soft" && (
                  <SkillCard
                    noCopy
                    soft
                    hard={false}
                    onClick={() => toggle2(true)}
                    text={item.name}
                    key={item.id}
                  />
                )
            )}
          </div>
        ) : (
          <AddSkillIcon
            hard={false}
            soft
            onClick={() => {
              toggle2(true);
            }}
          />
        )}
        <SkillsDropDown
          inSearch
          state={isOpen2}
          setState={() => toggle2(false)}
          type={"soft"}
          city={updateVacancies.VacancySkills}
          dataToUpdate={updateVacancies}
          setCity={setUpdateVacancies}
          items={uniqueList?.filter((i) => i?.type === "soft")}
          placeholder="Софт-скиллы"
        />
      </div>
      {/* skills */}
    </div>
  );
};

export default VacancyFilter;
