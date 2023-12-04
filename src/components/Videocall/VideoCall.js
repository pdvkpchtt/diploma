"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

const VideoCall = () => {
  const constraintsRef = useRef(null);

  return (
    <div className="bg-[#212122] w-full h-full rounded-[20px] p-[12px]">
      <div
        ref={constraintsRef}
        className="bg-black rounded-[8px] w-full h-full flex text-center items-center"
      >
        <motion.div
          drag
          dragConstraints={constraintsRef}
          dragMomentum={false}
          style={{ touchAction: "none" }}
          className="bg-[#212121] absolute rounded-[10px] p-[6px]"
        >
          <div className="bg-black rounded-[4px] w-[200px] h-[150px] flex text-center items-center"></div>
        </motion.div>
      </div>
    </div>
  );
};

export default VideoCall;
