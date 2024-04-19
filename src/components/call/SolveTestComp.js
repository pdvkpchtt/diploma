import { getTestId } from "@/server/actions/call/getTestId";
import Card from "@/shared/ui/Card";
import CustomLoader from "@/shared/ui/CustomLoader";
import { useEffect, useState } from "react";

const SolveTestComp = ({ testId }) => {
  const [solveData, setSolveData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const res = await getTestId(testId);
      console.log(res);
      setLoading(false);
    };

    getData();
  }, []);

  return (
    <div
      className={`text-[#f6f6f8] font-medium break-all flex flex-col rounded-[8px] text-[14px] p-[5px] w-fit bg-[#313131]`}
    >
      {loading ? <CustomLoader diameter={20} /> : "ass"}
    </div>
  );
};

export default SolveTestComp;
