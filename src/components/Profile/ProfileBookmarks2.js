"use client";

import EndedMeetingCard from "@/shared/ui/EndedMeetingCard";
import { useEffect, useState } from "react";
import { Waypoint } from "react-waypoint";

import { fetchBookmarks } from "../../server/actions/bookmarks/fetchBookmarks";
// import VacancyCard from "../../shared/ui/VacancyCard";
import TextMain from "../../shared/Text/TextMain";
import Card from "../../shared/ui/Card";
import CustomLoader from "../../shared/ui/CustomLoader";

const ProfileBookmarks2 = ({ userId, others, role }) => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState(null);

  const getPosts = async () => {
    console.log("fetching");
    if (loading) return;
    setLoading(true);
    const data = await fetchBookmarks(true);
    console.log("client bookmarks", data.data);
    setPosts(data.data);
    setLoading(false);
  };

  useEffect(() => {
    getPosts("");
  }, [fetchBookmarks]);

  return (
    <>
      {!posts ? (
        <div className="w-full flex justify-center items-center h-full">
          <CustomLoader diameter={36} />
        </div>
      ) : posts?.length === 0 ? (
        <Card style={"flex justify-center"} padding={16}>
          <div className="items-center flex flex-col gap-[24px] justify-center w-full text-center ">
            <TextMain
              text={
                !others
                  ? `Вы пока не прошли ни одного собеседования`
                  : "Вы пока не провели ни одного собеседования"
              }
              style="text-[14px] font-medium leading-[18px] tracking-[-0.013em]"
            />
          </div>
        </Card>
      ) : (
        <>
          {posts.map((item) => (
            // <VacancyCard key={item.id} item={item.vacancy} userId={userId} />
            <EndedMeetingCard item={item} role={role} />
          ))}
        </>
      )}
      <div className="[@media(hover)]:h-[24px]" />
    </>
  );
};

export default ProfileBookmarks2;
