"use client";

import { useEffect, useState } from "react";
import { Waypoint } from "react-waypoint";
import { LayoutGroup } from "framer-motion";

import VacancyCard from "../../shared/ui/VacancyCard";
import TextMain from "../../shared/Text/TextMain";
import Card from "../../shared/ui/Card";
import CustomLoader from "../../shared/ui/CustomLoader";
import { fetchTests } from "../../server/actions/company/fetchTests";
import TestCard from "@/shared/ui/TestCard";

const CompanyTests = ({ id, others = false, role, userId }) => {
  const [cursor, setCursor] = useState("");
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState(null);

  const getUsers = async (cursor) => {
    console.log("fetching");
    if (loading) return;
    setLoading(true);
    const data = await fetchTests(id, cursor);
    console.log("client tests", data);
    if (cursor.length) {
      setUsers([...users, ...data.data]);
    } else {
      setUsers(data.data);
    }
    setCursor(data.cursor);
    setHasNextPage(data.hasNextPage);
    setLoading(false);
  };

  useEffect(() => {
    setCursor("");
    getUsers("");
  }, [fetchTests]);

  return (
    <>
      {!users ? (
        <div className="w-full flex justify-center items-center h-full">
          <CustomLoader diameter={36} />
        </div>
      ) : users?.length === 0 ? (
        <Card style={"flex justify-center"} padding={16}>
          <div className="items-center flex flex-col gap-[24px] justify-center w-full text-center ">
            <TextMain
              text={`У компании пока нет вакансий`}
              style="text-[14px] font-medium leading-[18px] tracking-[-0.013em]"
            />
          </div>
        </Card>
      ) : (
        <>
          <LayoutGroup id="comptests">
            {users.map((item, key) => (
              <TestCard item={item} />
            ))}
          </LayoutGroup>
          {hasNextPage ? (
            <Waypoint
              onEnter={async () => {
                console.log("Enter waypoint");
                await getUsers(cursor);
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

export default CompanyTests;
