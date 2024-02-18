"use client";

import { useState } from "react";

import NavigationMobile from "../../shared/ui/NavigationMobile";
import Left from "./Left";
import Right from "./Right";
import ProfileInfo from "./ProfileInfo";
import ProfileBookmarks from "../../components/Profile/ProfileBookmarks";
import ProfileCalls from "./ProfileCalls";
import ProfileBookmarks2 from "./ProfileBookmarks2";

const Profile = ({ data, userId }) => {
  console.log("client profile", data);
  const [navState, setNavState] = useState(
    data?.role?.includes("hr")
      ? [
          {
            id: 0,
            active: true,
            name: "История собеседований",
            component: (
              <ProfileBookmarks2 userId={userId} others role={data?.role} />
            ),
          },
        ]
      : [
          {
            id: 0,
            active: true,
            name: "Информация",
            component: <ProfileInfo data={data} />,
          },
          {
            id: 1,
            active: false,
            name: "Собеседования",
            component: <ProfileCalls />,
          },
          {
            id: 2,
            active: false,
            name: "История собеседований",
            component: <ProfileBookmarks userId={userId} role={data?.role} />,
          },
        ]
  );

  const handleClick = (value) => {
    setNavState(value);
  };

  return (
    <>
      <NavigationMobile
        navState={navState}
        useState={(value) => handleClick(value)}
        layoutId="mobile"
      />
      <Left navState={navState[0].active} data={data} />
      <Right handleClick={(value) => handleClick(value)} navState={navState} />
    </>
  );
};

export default Profile;
