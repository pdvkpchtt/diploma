"use client";

import { useState } from "react";

import CompanyLeft from "../../components/company/CompanyLeft";
import CreateVacancyRight from "./CreateVacancyRight";

const CreateVacancy = ({ data, skills }) => {
  const [dataToUpdate, setDataToUpdate] = useState({
    name: "",
    shortDescription: "",
    description: "",
    conditions: "",
    waitings: "",
    vacArea: [],
    format: { label: "" },
    contract: { label: "" },
    experience: { label: "" },
    EducationLevel: { label: "" },
    salaryStart: "",
    salaryEnd: "",
    currency: { label: "" },
    VacancySkills: [],
    distantWork: false,
    priceByTalk: false,
    TestsIds: [],
  });

  console.log(dataToUpdate, "jopa2");

  return (
    <>
      <CompanyLeft data={data} withoutActions />
      <CreateVacancyRight
        cdata={data}
        skills={skills}
        dataToUpdate={dataToUpdate}
        setDataToUpdate={setDataToUpdate}
      />
    </>
  );
};

export default CreateVacancy;
