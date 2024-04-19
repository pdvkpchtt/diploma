import { getTestId } from "@/server/actions/call/getTestId";
import Card from "@/shared/ui/Card";
import CustomLoader from "@/shared/ui/CustomLoader";
import storage from "@/store/storage";
import { useEffect, useState } from "react";

const SolveTestComp = ({ testId }) => {
  const [data, setData] = useState([]);
  const [solveData, setSolveData] = useState([]);
  const [solved, setSolved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [trigger, setTrigger] = useState(true);

  useEffect(() => {
    const getData = async () => {
      if (storage.get("solved")) {
        setLoading(false);
        setSolved(true);
      }
      const res = await getTestId(testId);
      setData(res);
      console.log(res);
      setLoading(false);
    };

    getData();
  }, []);

  return (
    <div
      className={`w-full text-[#f6f6f8] my-[8px] font-medium break-all flex flex-col gap-[24px] rounded-[8px] text-[14px] p-[5px] bg-[#313131]`}
    >
      {solved ? (
        <p className="text-center">Тест завершен</p>
      ) : (
        <>
          {loading ? (
            <div className="w-full flex items-center justify-center">
              <CustomLoader diameter={20} />
            </div>
          ) : (
            data.questions.map((i, key) => (
              <div className="w-full flex flex-col gap-[6px]" key={key}>
                <div className="text-[13px] text-white font-semibold">
                  {i.text}
                </div>
                {i.answers.map((j, key) => (
                  <div
                    key={key}
                    onClick={() => {
                      if (!solveData.find((k) => k.id === i.id))
                        setSolveData([...solveData, { ...i, answers: j }]);
                      else
                        setSolveData([
                          ...solveData.filter((k) => k.id !== i.id),
                          { ...i, answers: j },
                        ]);
                    }}
                    className={`text-[12px] font-medium  cursor-pointer p-[6px] rounded-[8px] ${
                      solveData.find((l) => l?.answers?.id === j.id)
                        ? "bg-[#5875e8] text-white"
                        : "text-[#dddddd] bg-[#4f4f4f]"
                    }`}
                  >
                    {j.text}
                  </div>
                ))}
              </div>
            ))
          )}
          <div
            onClick={() => {
              if (data?.questions?.length === solveData?.length) {
                setSolved(true);
                storage.set("solved", { status: true });
              }
            }}
            className={`transition duration-[250ms] text-center p-[6px] rounded-[8px] ${
              data?.questions?.length === solveData?.length
                ? "bg-[#5875e8] hover:bg-[#3A56C5] active:bg-[#2C429C] cursor-pointer"
                : "bg-[#8f8f8f] cursor-default"
            } `}
          >
            Отправить
          </div>
        </>
      )}
    </div>
  );
};

export default SolveTestComp;
