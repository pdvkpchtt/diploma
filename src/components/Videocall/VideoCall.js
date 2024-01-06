"use client";

import { motion } from "framer-motion";
import { useContext, useRef } from "react";

import { SocketContext } from "../SocketContextWrap";
import Options from "./Options";
import TextMain from "../../shared/Text/TextMain";
import { ButtonGhost } from "../../shared/ui/Button";

const VideoCall = () => {
  const constraintsRef = useRef(null);

  const {
    answerCall,
    callAccepted,
    myVideo,
    userVideo,
    callEnded,
    stream,
    call,
    canvasRef,
  } = useContext(SocketContext);

  return (
    <>
      <div className="bg-[#212122] w-full h-full rounded-[20px] p-[12px]">
        {/* {callAccepted && !callEnded && ( */}
        <div
          ref={constraintsRef}
          className="bg-black rounded-[8px] w-full relative h-full flex items-end justify-end"
        >
          <video
            playsInline
            muted
            ref={userVideo}
            className="w-full h-full scale-x-[-1]"
            autoPlay
          ></video>

          {/* my window */}
          {stream && (
            <motion.div
              // drag={callAccepted && !callEnded}
              dragConstraints={constraintsRef}
              dragMomentum={false}
              style={{ touchAction: "none" }}
              className={`bg-[#212121] absolute ${
                callAccepted && !callEnded
                  ? "w-[400px] h-[300px] p-[6px] rounded-[10px]"
                  : "w-full h-full p-[0px] rounded-[8px]"
              } transition-all duration-500`}
            >
              <div
                className={`bg-black ${
                  callAccepted && !callEnded ? "rounded-[4px]" : "rounded-[8px]"
                } transition-all duration-500 w-full h-full flex text-center items-center`}
              >
                <canvas
                  ref={canvasRef}
                  className="absolute w-full z-[100] h-full"
                />
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

      <Options>
        {call.isReceivedCall && !callAccepted && (
          <div className="flex justify-center">
            {/* <TextMain
              text={call.name + " вызывает"}
              style="text-[16px] font-medium"
            /> */}
            <ButtonGhost text="Принять вызов" onClick={answerCall} />
          </div>
        )}
      </Options>
    </>
  );
};

export default VideoCall;
