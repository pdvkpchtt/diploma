"use client";

import EmptyAvatar from "@/shared/ui/EmptyAvatar";

const TestPage = () => {
  return (
    <div className="mt-[100px] bg-[#2c2c2c] w-full flex flex-row gap-[20px] flex-wrap h-full p-[20px]">
      <EmptyAvatar />
      <EmptyAvatar fifty />
      <EmptyAvatar hungredAndTen />
      <EmptyAvatar little />
      <EmptyAvatar sixtySeven />
      <EmptyAvatar thirty />
    </div>
  );
};

export default TestPage;
