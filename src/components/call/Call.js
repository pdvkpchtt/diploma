"use client";

import { useRef } from "react";
import { useEffect, useState } from "react";
import * as faceapi from "face-api.js";

import useWebRTC, { LOCAL_VIDEO } from "@/hooks/useWebRTC";
import { useRouter } from "next/navigation";
import { endCall } from "@/server/actions/call/endCall";

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

const Call = ({ roomID, role, data }) => {
  const router = useRouter();

  const canvasRef = useRef();
  const videoRef = useRef();

  const [ai, setAi] = useState(false);

  const faceMyDetect = () => {
    try {
      setInterval(async () => {
        const detections = await faceapi
          .detectAllFaces(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions()
          )
          .withFaceLandmarks()
          .withFaceExpressions();

        canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(
          videoRef.current
        );
        faceapi.matchDimensions(canvasRef.current, {
          width: 940,
          height: 650,
        });

        const resized = faceapi.resizeResults(detections, {
          width: 940,
          height: 650,
        });

        faceapi.draw.drawDetections(canvasRef.current, resized);
        //   faceapi.draw.drawFaceLandmarks(canvasRef.current, resized);
        faceapi.draw.drawFaceExpressions(canvasRef.current, resized);

        if (detections.length > 0) {
          // setangry(angry + detections[0]?.expressions?.angry);
          // setdisgusted(disgusted + detections[0]?.expressions?.disgusted);
          // setfearful(fearful + detections[0]?.expressions?.fearful);
          // sethappy(happy + detections[0]?.expressions?.happy);
          // setneutral(neutral + detections[0]?.expressions?.neutral);
          // setsad(sad + detections[0]?.expressions?.sad);
          // setsurprised(surprised + detections[0]?.expressions?.surprised);
          console.log(detections[0]?.expressions);
        }
        console.log("sda");
      }, 1500);
    } catch (err) {}
  };

  const loadModels = () => {
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      faceapi.nets.faceExpressionNet.loadFromUri("/models"),
    ]).then(() => {
      faceMyDetect();
    });
  };

  const buttons = [
    [
      {
        text: "Mute",
        icon: "fa fa-microphone",
        onClick: () => {},
      },
      {
        text: "Pause Video",
        icon: "fa fa-video-camera",
        onClick: () => {},
      },
      {
        text: "Pause Video",
        icon: !ai ? "fa fa-toggle-off" : "fa fa-toggle-on",
        onClick: () => test(),
      },
    ],
    [
      {
        text: "Leave Meeting",
        icon: "fa fa-sign-out",
        leave: true,
        onClick: async () => {
          if (role?.includes("hr")) {
            await endCall(roomID);
            router.push("/profile");
          } else router.push("/profile");
        },
      },
    ],
  ];

  const { clients, provideMediaRef, peerMediaElements, testSend } =
    useWebRTC(roomID);
  const videoLayout = layout(clients.length);

  // супер костыль
  const test = () => {
    if (role.includes("hr")) {
      setAi(!ai);
      clients.map((i) => {
        if (i !== "LOCAL_VIDEO")
          videoRef.current = peerMediaElements.current[i];
      });
      loadModels();
    }
  };

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
                  className={`flex items-center bg-black relative`}
                >
                  {role.includes("hr") && ai && clientID !== "LOCAL_VIDEO" && (
                    <canvas
                      ref={canvasRef}
                      width="100%"
                      height="100%"
                      className="absolute top-[100px] left-0 z-[500] w-full h-fit"
                    />
                  )}
                  <video
                    width="100%"
                    height="100%"
                    ref={(instance) => {
                      provideMediaRef(clientID, instance);
                    }}
                    autoPlay
                    playsInline
                    muted={clientID === "LOCAL_VIDEO"}
                    className="scale-x-[-1]"
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
                  } cursor-pointer ${
                    i.icon.includes("fa fa-toggle-") &&
                    !role.includes("hr") &&
                    "hidden"
                  } p-[10px] h-[60px] justify-center items-center min-w-[80px] transition-all duration-[300ms] rounded-[10px] m-[5px]`}
                  onClick={i.onClick}
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

        <div
          // type="text"
          onClick={() => testSend()}
          // placeholder="Type message here.."
          className="outline-none bg-[red] h-[50px] border-t-[1px] border-t-[#181818] text-[#f6f6f8] placeholder:text-[#8f8f8f] p-[10px]"
        />
      </div>
      {/* right */}
    </div>
  );
};

export default Call;
