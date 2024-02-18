"use client";

import { useRef } from "react";
import { useEffect, useState } from "react";

import useWebRTC, { LOCAL_VIDEO } from "@/hooks/useWebRTC";

const buttons = [
  [
    {
      text: "Mute",
      icon: "fa fa-microphone",
    },
    {
      text: "Pause Video",
      icon: "fa fa-video-camera",
    },
  ],
  [{ text: "Leave Meeting", icon: "fa fa-sign-out", leave: true }],
];

function layout(clientsNumber = 1) {
  const pairs = Array.from({ length: clientsNumber }).reduce(
    (acc, next, index, arr) => {
      if (index % 2 === 0) {
        acc.push(arr.slice(index, index + 2));
      }

      return acc;
    },
    []
  );

  const rowsNumber = pairs.length;
  const height = `${100 / rowsNumber}%`;

  return pairs
    .map((row, index, arr) => {
      if (index === arr.length - 1 && row.length === 1) {
        return [
          {
            width: "100%",
            height,
          },
        ];
      }

      return row.map(() => ({
        width: "50%",
        height,
      }));
    })
    .flat();
}

const Call = ({ roomID }) => {
  const { clients, provideMediaRef } = useWebRTC(roomID);
  const videoLayout = layout(clients.length);

  return (
    <div className="flex max-h-screen max-w-screen h-screen w-full">
      <div className="flex-[0.8] flex flex-col">
        {/* video */}
        <div className="flex-grow bg-[#141414] flex items-center justify-center">
          <div className="flex justify-center h-full w-full items-center flex-wrap overflow-y-auto">
            {clients.map((clientID, index) => {
              return (
                <div
                  key={clientID}
                  style={videoLayout[index]}
                  id={clientID}
                  className={`flex items-center bg-black`}
                >
                  <video
                    width="100%"
                    height="100%"
                    ref={(instance) => {
                      provideMediaRef(clientID, instance);
                    }}
                    autoPlay
                    playsInline
                    muted={clientID === "LOCAL_VIDEO"}
                    // className={`${
                    //   clientID === "LOCAL_VIDEO" && "border-[1px] border-[red]"
                    // }`}
                  />
                </div>
              );
            })}
          </div>
        </div>
        {/* video */}

        {/* menu */}
        <div className="bg-[#212122] flex text-[#d2d2d2] justify-between p-[5px]">
          {buttons.map((i, key) => (
            <div key={key} className="flex">
              {i.map((i, key) => (
                <div
                  key={key}
                  className={`flex flex-col ${
                    i?.leave
                      ? "bg-[#F04646] hover:bg-[#C92121] active:bg-[#8a3838] text-white"
                      : "hover:bg-[#141414] hover:bg-opacity-70 active:bg-[#141414]"
                  } cursor-pointer p-[10px] h-[60px] justify-center items-center min-w-[80px] transition-all duration-[300ms] rounded-[10px] m-[5px]`}
                  // onclick="muteUnmute()"
                >
                  <i className={i.icon} style={{ fontSize: 25 }}></i>
                </div>
              ))}
            </div>
          ))}
        </div>
        {/* menu */}
      </div>

      {/* right */}
      <div className="flex flex-[0.2] flex-col bg-[#212122] border-left-[1px]">
        <div className="text-[#8f8f8f] text-center mt-[5px] mx-[10px] pb-[5px] border-b-[2px] border-[#8f8f8f] font-medium">
          <h6>Chat</h6>
        </div>

        <div className="overflow-y-auto flex-grow flex-col-reverse gap-[5px] flex p-[20px]">
          {[...Array(50)].map((i, key) => (
            <p
              key={key}
              className="text-[#f6f6f8] bg-[#5875e8] font-medium break-all rounded-[8px] text-[14px] p-[5px] w-fit"
            >
              sasaaaaaaasssss ssssssss sssssssss s sssss
            </p>
          ))}
        </div>

        <input
          type="text"
          placeholder="Type message here.."
          className="outline-none bg-transparent border-t-[1px] border-t-[#181818] text-[#f6f6f8] placeholder:text-[#8f8f8f] p-[10px]"
        />
      </div>
      {/* right */}
    </div>
  );
};

export default Call;
