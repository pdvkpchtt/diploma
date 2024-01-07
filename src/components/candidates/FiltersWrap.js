"use client";

import { useContext, useEffect, useState } from "react";

import PcFilters from "./PcFilters";
import MobileFilters from "./MobileFilters";
import MobileModal from "../../shared/ui/MobileModal";
import { SearchNavContext } from "./SearchNavContext";
import CustomLoader from "../../shared/ui/CustomLoader";
import { fetchFiltersInfo2 } from "../../server/actions/vacancy/fetchFiltersInfo2";

const FiltersWrap = () => {
  const { showFilters, setShowFilters, updatePeople, setUpdatePeople } =
    useContext(SearchNavContext);

  const [loading, setLoading] = useState(true);
  const [dropDataVacancies, setDropDataVacancies] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    const data = await fetchFiltersInfo2();
    setDropDataVacancies(data);
    console.log(data, "filters data");
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <div className="[@media(hover)]:w-[260px] [@media(pointer:coarse)]:hidden flex justify-center items-center h-full">
          <CustomLoader diameter={36} />
        </div>
      ) : (
        <>
          {/* filters */}
          <PcFilters
            dropDataVacancies={dropDataVacancies}
            updatePeople={updatePeople}
            setUpdatePeople={setUpdatePeople}
          />
          {/* filters */}

          {/* filters mobile */}
          <MobileModal
            isOpen={showFilters}
            handleClose={setShowFilters}
            withOutScroll
          >
            <MobileFilters
              showFilters={showFilters}
              dropDataVacancies={dropDataVacancies}
              updatePeople={updatePeople}
              setUpdatePeople={setUpdatePeople}
              setShowFilters={(value) => setShowFilters(value)}
            />
          </MobileModal>
          {/* filters mobile */}
        </>
      )}
    </>
  );
};

export default FiltersWrap;
