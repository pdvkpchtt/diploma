"use client";

import AiIcon from "@/shared/icons/AiIcon";
import Cross2 from "@/shared/icons/Cross2";
import TextMain from "@/shared/Text/TextMain";
import TextSecondary from "@/shared/Text/TextSecondary";
import CardOpacity from "@/shared/ui/CardOpacity";
import CustomLoader from "@/shared/ui/CustomLoader";
import DropDownWithSearch from "@/shared/ui/DropDownWithSearch";
import Modal from "@/shared/ui/Modal";
import LlamaAI from "llamaai";
import { useState } from "react";

const apiToken =
  "LL-vyczsgT2XPanXRF6UF8OPx3wWMWcJ9L9bbEJ7IDxCOmGieRiIJcoPuqvOCYOjKbu";
const llamaAPI = new LlamaAI(apiToken);

const SettingsModal = ({
  area,
  modalState = false,
  setUsed = () => {},
  setModalState = () => {},
  setDataToUpdate,
}) => {
  const [loading, setLoading] = useState(false);
  const [dd1, setDd1] = useState(false);
  const [dd2, setDd2] = useState(false);
  const [questions, setQuestions] = useState(5);
  const [answers, setAnswers] = useState(2);

  const apiRequestJson = {
    messages: [
      {
        role: "user",
        content: `generate a test in JSON format for knowledge of the basics of the ${area} industry of the level of complexity average in json format. Questions and answers should be in Russian. the data should be in the form [{"id": 0, "question": "Вопрос", "answers": [{"id": 0, "answer": "Вопрос 1", "rightAnswer": false}, {"id": 1, "answer": "Вопрос 2", "rightAnswer": true]}]. Number of questions should be ${questions}. Each question should have ${answers} answers`,
      },
    ],

    stream: false,
  };

  const handle = async () => {
    // добавить проверки на латинские символы
    setLoading(true);
    await llamaAPI
      .run(apiRequestJson)
      .then((response) => {
        const content = response?.choices[0]?.message?.content;
        console.log(
          JSON.parse(
            content
              ?.slice(content?.indexOf("["), content?.lastIndexOf("]") + 1)
              .replace(/'/gi, '"')
          )
        );
        setDataToUpdate(
          JSON.parse(
            content
              ?.slice(content?.indexOf("["), content?.lastIndexOf("]") + 1)
              .replace(/'/gi, '"')
          )
        );
        setUsed(true);
        setLoading(false);
        setModalState(false);
      })
      .catch((error) => {
        console.log(error);
        handle();
      });
  };

  return (
    <Modal isOpen={modalState} handleClose={() => setModalState(false)}>
      {/* header */}
      <div className="flex flex-row justify-end [@media(pointer:coarse)]:hidden relative h-fit">
        <Cross2 onClick={() => setModalState(false)} />

        {/* <div className="h-[0.5px] w-[calc(100%+24px)] bg-[#e7e7e7] dark:bg-[#2f2f2f] absolute top-[30px] left-[-12px]" /> */}
      </div>
      {/* header */}

      <div className="h-fit mt-[12px] flex flex-col rounded-b-[20px] px-[12px] mb-[-12px] pb-[12px] gap-[12px]">
        <div className="flex flex-col [@media(pointer:coarse)]:hidden">
          <TextSecondary
            text={"Вопросы"}
            style="font-medium text-[14px] select-none leading-[16.8px] tracking-[-0.013em] mb-[6px]"
          />
          <DropDownWithSearch
            state={dd1}
            setState={setDd1}
            city={questions}
            setCity={(val) => setQuestions(val.label)}
            items={[
              { label: 2 },
              { label: 3 },
              { label: 4 },
              { label: 5 },
              { label: 6 },
              { label: 7 },
              { label: 8 },
              { label: 9 },
              { label: 10 },
            ]}
            placeholder="Кол-во вопросов в тесте"
          />
        </div>

        <div className="flex flex-col [@media(pointer:coarse)]:hidden">
          <TextSecondary
            text={"Ответы"}
            style="font-medium text-[14px] select-none leading-[16.8px] tracking-[-0.013em] mb-[6px]"
          />
          <DropDownWithSearch
            state={dd2}
            setState={setDd2}
            city={answers}
            setCity={(val) => setAnswers(val.label)}
            items={[{ label: 2 }, { label: 3 }, { label: 4 }, { label: 5 }]}
            placeholder="Кол-во ответов для каждого вопроса"
          />
        </div>

        <div className="flex flex-col gap-[6px]">
          <TextSecondary
            text={"Сгенерировать тест"}
            style="font-medium text-[14px] select-none leading-[16.8px] tracking-[-0.013em]"
          />
          <CardOpacity
            styled="cursor-pointer w-[105px] flex justify-center h-[51.98px] items-center"
            onClick={() => handle()}
          >
            {!loading ? (
              <>
                <AiIcon />
                <p
                  className={
                    "group text-center h-[28px] w-fit whitespace-nowrap items-center flex-row gap-[8px] flex font-medium leading-[20px] text-[16px] tracking-[-0.015em] text-[#5875e8] select-none transition duration-[250ms] group-hover:text-[#3A56C5] group-active:text-[#2C429C]"
                  }
                >
                  Готово
                </p>
              </>
            ) : (
              <CustomLoader
                diameter={26}
                strokeWidth={6}
                strokeWidthSecondary={6}
              />
            )}
          </CardOpacity>
          <TextSecondary
            text={"*генерация может занять некоторое время"}
            style="font-medium text-[12px] select-none leading-[12.8px] tracking-[-0.013em]"
          />
        </div>
      </div>
    </Modal>
  );
};

export default SettingsModal;
