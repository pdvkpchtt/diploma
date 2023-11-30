"use client";

import { useState } from "react";

import NavigationMobile from "../../shared/ui/NavigationMobile";
import CompanyLeft from "./CompanyLeft";
import CompanyRight from "./CompanyRight";
import CompanyVacancies from "./CompanyVacancies";

const CompanyProfile = ({ data, role, userId }) => {
  const [navState, setNavState] = useState([
    {
      id: 1,
      active: true,
      name: "Вакансии",
      component: <CompanyVacancies role={role} id={data.id} userId={userId} />,
    },
  ]);

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
      <CompanyLeft navState={navState[0].active} data={data} />
      <CompanyRight
        handleClick={(value) => handleClick(value)}
        navState={navState}
      />
    </>
  );
};

export default CompanyProfile;
