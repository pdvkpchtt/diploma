"use client";

import { motion } from "framer-motion";
import { useContext, useRef } from "react";

import { SocketContext } from "../SocketContextWrap";
import Card from "../../shared/ui/Card";
import Options from "./Options";

const VideoCall = () => {
  const constraintsRef = useRef(null);

  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } =
    useContext(SocketContext);

  return (
    <>
      <div className="bg-[#212122] w-full h-full rounded-[20px] p-[12px]">
        {/* {callAccepted && !callEnded && ( */}
        <div
          ref={constraintsRef}
          className="bg-black rounded-[8px] w-full relative h-full flex items-end justify-end"
        >
          <viedo playsInline autoplay ref={userVideo} className={"w-full"} />

          {/* my window */}
          {stream && (
            <motion.div
              drag={callAccepted && !callEnded}
              dragConstraints={constraintsRef}
              dragMomentum={false}
              style={{ touchAction: "none" }}
              className={`bg-[#212121] absolute ${
                callAccepted && !callEnded
                  ? "w-[200px] h-[150px] p-[6px] rounded-[10px]"
                  : "w-full h-full p-[0px] rounded-[8px]"
              } transition-all duration-500`}
            >
              <div
                className={`bg-black ${
                  callAccepted && !callEnded ? "rounded-[4px]" : "rounded-[8px]"
                } transition-all duration-500 w-full h-full flex text-center items-center`}
              >
                <video
                  playsInline
                  muted
                  ref={myVideo}
                  className="w-full h-full"
                  autoPlay
                ></video>
              </div>
            </motion.div>
          )}
          {/* my window */}
        </div>
        {/*} )} */}
      </div>

      <Options />
    </>
  );
};

export default VideoCall;
