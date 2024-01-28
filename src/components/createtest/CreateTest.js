"use client";

import { useState } from "react";
import { uuid } from "uuidv4";

import CompanyLeft from "../../components/company/CompanyLeft";
import CreateTestRight from "./CreateTestRight";

const CreateTest = ({ data, areas, aiCount }) => {
  const [test, setTest] = useState([
    {
      id: uuid(),
      question: "",
      answers: [
        {
          id: uuid(),
          answer: "",
          rightAnswer: true,
        },
      ],
    },
  ]);
  console.log(test);

  const [area, setArea] = useState({ label: "" });

  const deleteHandler = (id, setFunc, state) => {
    setFunc(state.filter((item) => item.id !== id));
  };

  return (
    <>
      <CompanyLeft data={data} withoutActions />
      <CreateTestRight
        aiCount={aiCount}
        compId={data.id}
        areas={areas}
        area={area}
        setArea={setArea}
        dataToUpdate={test}
        setDataToUpdate={(choise) => {
          setTest(choise);
        }}
        deleteHandler={(id, setState, state) =>
          deleteHandler(id, setState, state)
        }
      />
    </>
  );
};

export default CreateTest;
