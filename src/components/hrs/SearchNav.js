"use client";

import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { usePathname } from "next/navigation";
import { SearchNavContext } from "./SearchNavContext";

import { SearchInput } from "../../shared/ui/Input";
import FilterIcon from "../../shared/icons/FilterIcon";

const SearchNav = () => {
  const { setShowFilters, scroll, setScroll, updatePeople, setUpdatePeople } =
    useContext(SearchNavContext);

  const [trigger, settrigger] = useState(false);

  const [newScroll, setNewScroll] = useState(scroll);
  useEffect(() => {
    if (scroll > newScroll) settrigger(true);
    else if (scroll < newScroll) settrigger(false);

    setTimeout(() => {
      setNewScroll(scroll);
    }, [50]);
  }, [scroll]);

  const isMobile = useMediaQuery({ query: "(pointer:coarse)" });

  const changeScroll = () => {
    setScroll(window.scrollY);
  };

  if (typeof window !== "undefined")
    window.addEventListener("scroll", changeScroll);

  return (
    <>
      {/* search and nav pc */}
      <motion.div
        animate={
          newScroll > 76 && !isMobile && trigger
            ? {
                y: -100,
              }
            : { y: 0 }
        }
        transition={{ duration: 0.2 }}
        className={`p-[12px] rounded-[20px] border-[1px] border-[#E7E7E7] dark:border-[#2f2f2f] flex flex-row gap-[12px] items-center [@media(hover)]:fixed [@media(hover)]:mt-[24px] [@media(hover)]:w-[704px] [@media(pointer:coarse)]:hidden bg-white dark:bg-[#212122]`}
      >
        <SearchInput
          placeholder="Поиск"
          value={updatePeople?.input}
          onChange={(val) => setUpdatePeople({ ...updatePeople, input: val })}
        />
      </motion.div>
      {/* search and nav pc */}

      {/* search and nav mobile */}
      <div className="bg-white dark:bg-[#212122] w-full pt-[8px] mb-[22px] px-[12px] fixed top-0 left-0 py-[8px] [@media(hover)]:hidden">
        <div className="max-w-[476px] mx-auto">
          <div className="flex flex-row gap-[12px] items-center">
            <SearchInput
              placeholder="Поиск"
              value={updatePeople?.input}
              onChange={(val) =>
                setUpdatePeople({ ...updatePeople, input: val })
              }
            />
            {/* filter button */}
            <div
              className="items-center p-[12px] rounded-[16px] bg-[#f6f6f8] dark:bg-[#272727]"
              onClick={() => setShowFilters(true)}
            >
              <FilterIcon />
            </div>
            {/* filter button */}
          </div>
        </div>
      </div>
      {/* search and nav mobile */}
    </>
  );
};

export default SearchNav;
