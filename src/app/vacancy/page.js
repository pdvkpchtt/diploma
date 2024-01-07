"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";

import CustomLoader from "../../shared/ui/CustomLoader";

const VacancyPageLoad = () => {
  useEffect(() => {
    redirect("/not_found");
  }, []);

  return (
    <div className="overflow-y-auto [@media(pointer:coarse)]:mt-[77px] flex items-center justify-center w-full [@media(hover)]:min-h-[calc(100vh-230px)] h-full">
      <CustomLoader />
    </div>
  );
};

export default VacancyPageLoad;
