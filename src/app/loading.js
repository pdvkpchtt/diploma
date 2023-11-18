"use client";

import CustomLoader from "../shared/ui/CustomLoader";

const Loading = () => {
  return (
    <div className="[@media(hover)]:absolute [@media(pointer:coarse)]:max-w-[500px] [@media(pointer:coarse)]:mx-auto top-[50%] z-[203] [@media(hover)]:mt-[-27px] [@media(pointer:coarse)]:mt-[50%] [@media(hover)]:left-[calc(50%-24px)] [@media(pointer:coarse)]:w-full [@media(pointer:coarse)]:flex [@media(pointer:coarse)]:justify-center">
      <CustomLoader />
    </div>
  );
};

export default Loading;
