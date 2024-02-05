"use client";

import { useContext, useEffect, useState } from "react";
import { Waypoint } from "react-waypoint";
import TextMain from "../../shared/Text/TextMain";
import Card from "../../shared/ui/Card";

import { fetchPeople } from "../../server/actions/hrs/fetchPeople";
import CustomLoader from "../../shared/ui/CustomLoader";
import PeopleCard from "../../shared/ui/PeopleCard";
import { SearchNavContext } from "./SearchNavContext";

const People = () => {
  const { updatePeople } = useContext(SearchNavContext);

  const [cursor, setCursor] = useState("");
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const getUsers = async (cursor) => {
    console.log("fetching");
    // if (loading) return;
    setLoading(true);
    const data = await fetchPeople(cursor, updatePeople);
    console.log("client users", data);
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
  }, [updatePeople?.startFiltering, updatePeople?.input]);

  useEffect(() => {
    if (updatePeople?.startFiltering) {
      setCursor("");
      getUsers("");
    }
  }, [fetchPeople, updatePeople]);

  return (
    <>
      {!users ? (
        <div className="w-full flex justify-center items-center h-full">
          <CustomLoader diameter={36} />
        </div>
      ) : users.length === 0 &&
        (updatePeople?.startFiltering || updatePeople?.input?.length > 0) ? (
        <Card padding={12}>
          <TextMain text="Ничего не найдено" />
        </Card>
      ) : (
        <>
          {users.map((item, key) => (
            <PeopleCard key={key} item={item} />
          ))}
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

export default People;
