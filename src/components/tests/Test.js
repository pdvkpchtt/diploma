"use client";

import { useContext, useEffect, useState } from "react";
import { Waypoint } from "react-waypoint";

import CustomLoader from "../../shared/ui/CustomLoader";
import { fetchVacancies } from "../../server/actions/company/fetchVacancies";
import VacancyCard from "../../shared/ui/VacancyCard";
import Card from "../../shared/ui/Card";
import TextMain from "../../shared/Text/TextMain";
import { LayoutGroup } from "framer-motion";
import { SearchNavContext } from "./SearchNavContextWrap";

const Test = () => {
  const { updateVacancies } = useContext(SearchNavContext);

  const [cursor, setCursor] = useState("");
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(false);
  const [vacs, setVacs] = useState(null);

  const getVacs = async (cursor) => {
    console.log("fetching");
    // if (loading) return;
    setLoading(true);
    const data = await fetchVacancies(cursor, updateVacancies);
    console.log("client vacancies", data);
    if (cursor.length) {
      setVacs([...vacs, ...data.data]);
    } else {
      setVacs(data.data);
    }
    setCursor(data.cursor);
    setHasNextPage(data.hasNextPage);
    setLoading(false);
  };

  useEffect(() => {
    setCursor("");
    getVacs("");
  }, [updateVacancies?.startFiltering, updateVacancies?.input]);

  useEffect(() => {
    if (updateVacancies?.startFiltering) {
      setCursor("");
      getVacs("");
    }
  }, [fetchVacancies, updateVacancies]);

  return (
    <>
      {!vacs ? (
        <div className="w-full flex justify-center items-center h-full">
          <CustomLoader diameter={36} />
        </div>
      ) : vacs.length === 0 ? (
        <Card padding={12}>
          <TextMain text="Ничего не найдено" />
        </Card>
      ) : (
        <>
          <LayoutGroup id="search">
            {vacs.map((item, key) => (
              <VacancyCard key={key} item={item} />
            ))}
          </LayoutGroup>
          {hasNextPage ? (
            <Waypoint
              onEnter={async () => {
                console.log("Enter waypoint");
                await getVacs(cursor);
              }}
              topOffset="50px"
            >
              <div className="w-full flex justify-center items-center h-full">
                <CustomLoader diameter={36} />
              </div>
            </Waypoint>
          ) : null}
        </>
      )}
    </>
  );
};

export default Test;
