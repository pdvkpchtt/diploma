"use client";

import { useContext, useEffect, useState } from "react";
import { Waypoint } from "react-waypoint";

import CustomLoader from "../../shared/ui/CustomLoader";
import { fetchVacancies } from "../../server/actions/company/fetchVacancies";
import Card from "../../shared/ui/Card";
import TextMain from "../../shared/Text/TextMain";
import { LayoutGroup } from "framer-motion";
import { SearchNavContext } from "./SearchNavContextWrap";
import TestCard from "@/shared/ui/TestCard";
import { fetchTestsGlobal } from "@/server/actions/tests/fetchTestsGlobal";

const Test = () => {
  const { updatePeople } = useContext(SearchNavContext);

  const [cursor, setCursor] = useState("");
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(false);
  const [vacs, setVacs] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const getVacs = async (cursor) => {
    console.log("fetching");
    // if (loading) return;
    setLoading(true);
    const data = await fetchTestsGlobal(cursor, updatePeople);
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
  }, [updatePeople?.startFiltering]);

  useEffect(() => {
    if (updatePeople?.startFiltering) {
      setCursor("");
      getVacs("");
    }
  }, [fetchVacancies, updatePeople]);

  return (
    <LayoutGroup>
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
          <LayoutGroup id="wdadwa">
            {vacs.map((item, key) => (
              <TestCard
                item={item}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
              />
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
    </LayoutGroup>
  );
};

export default Test;
