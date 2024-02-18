"use client";

import { fetchMeetings } from "@/server/actions/call/fetchMeetings";
import MeetingCard from "@/shared/ui/MeetingCard";
import { useEffect, useState } from "react";
import { Waypoint } from "react-waypoint";

import TextMain from "../../shared/Text/TextMain";
import Card from "../../shared/ui/Card";
import CustomLoader from "../../shared/ui/CustomLoader";

const ProfileCalls = ({ userId, others }) => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState(null);

  const getPosts = async () => {
    console.log("fetching");
    if (loading) return;
    setLoading(true);
    const data = await fetchMeetings();
    console.log("client bookmarks", data.data);
    setPosts(data.data);
    setLoading(false);
  };

  useEffect(() => {
    getPosts("");
  }, [fetchMeetings]);

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
              text={"У вас пока нет приглашений на собеседования"}
              style="text-[14px] font-medium leading-[18px] tracking-[-0.013em]"
            />
          </div>
        </Card>
      ) : (
        <>
          {posts.map((item) => (
            <MeetingCard item={item} />
          ))}
        </>
      )}
    </>
  );
};

export default ProfileCalls;
