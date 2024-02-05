"use client";

import People from "./People";

const Candidates = ({ session }) => {
  return (
    <>
      <div
        // onScroll={(e) => setScroll(e.currentTarget.scrollTop)}
        className="h-full [@media(hover)]:pt-[100px] hideScrollbarNavMobile [@media(hover)]:pb-[24px] [@media(pointer:coarse)]:h-[calc(100%-189px)] [@media(pointer:coarse)]:py-[12px] [@media(pointer:coarse)]:mt-[59px] flex flex-col gap-[8px]"
      >
        <People session={session} />

        <div
          className={`[@media(pointer:coarse)]:pb-[80px] [@media(hover)]:pb-[24px]`}
        />
      </div>
    </>
  );
};

export default Candidates;
