"use client";

import { useState } from "react";

import EditLeft from "./EditLeft";
import EditRight from "./EditRight";

const EditProfile = ({
  data,
  dataToCompare,
  skills,
  areas,
  educationLevelData,
  updateProfileData,
}) => {
  const [dataToUpdate, setDataToUpdate] = useState(data);

  // validation
  const [status, setStatus] = useState(null);
  // validation

  console.log(dataToUpdate, "dataToUpdate");

  return (
    <>
      <EditLeft
        data={data}
        setDataToUpdate={setDataToUpdate}
        dataToUpdate={dataToUpdate}
        status={status}
        setStatus={setStatus}
      />
      <EditRight
        areas={areas}
        skills={skills}
        data={data}
        updateProfileData={updateProfileData}
        educationLevelData={educationLevelData}
        setDataToUpdate={setDataToUpdate}
        dataToCompare={dataToCompare}
        dataToUpdate={dataToUpdate}
        status={status}
        setStatus={setStatus}
      />
    </>
  );
};

export default EditProfile;
