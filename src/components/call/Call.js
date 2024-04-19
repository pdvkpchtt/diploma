"use client";

import { useRef } from "react";
import { useEffect, useState } from "react";
import * as faceapi from "face-api.js";

import useWebRTC, { LOCAL_VIDEO } from "@/hooks/useWebRTC";
import { useRouter } from "next/navigation";
import { endCall } from "@/server/actions/call/endCall";
import { SendIcon } from "@/shared/icons/SendIcon";
import socket from "@/socket";
import { fetchMessages } from "@/server/actions/call/fetchMessages";
import CustomLoader from "@/shared/ui/CustomLoader";
import TextSecondary from "@/shared/Text/TextSecondary";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import TestModal from "./TestModal";
dayjs.extend(relativeTime);
require("dayjs/locale/ru");
dayjs.locale("ru");
var updateLocale = require("dayjs/plugin/updateLocale");
dayjs.extend(updateLocale);

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

const Call = ({ roomID, role, data, id, VacTests }) => {
  const router = useRouter();

  const canvasRef = useRef();
  const videoRef = useRef();

  const [ai, setAi] = useState(false);
  const [loading, setLoading] = useState(true);
  const [msgData, setMsgData] = useState([]);
  const [modal, setModal] = useState(false);

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

  socket.on("eventSend", function (msg) {
    // console.log(msg, "asss");
    setMsgData([msg, ...msgData]);
  });

  useEffect(() => {
    const getData = async () => {
      const data = await fetchMessages(roomID);
      setMsgData(data.reverse());
      setLoading(false);
    };

    getData();
  }, []);

  return (
    <>
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
                    {role.includes("hr") &&
                      ai &&
                      clientID !== "LOCAL_VIDEO" && (
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
            <h6>Чат</h6>
          </div>

          <div className="overflow-y-auto flex-grow h-[calc(100vh-73px)] flex-col-reverse gap-[5px] flex p-[20px]">
            {loading ? (
              <div className="w-full h-full flex items-center justify-center">
                <CustomLoader diameter={36} />
              </div>
            ) : msgData.length === 0 ? (
              <div className="w-full h-full flex items-center justify-center text-center">
                <TextSecondary text="Сообщений нет" style={"font-medium"} />
              </div>
            ) : (
              msgData.map((i, key) => (
                <div
                  className={`flex flex-row ${
                    i.text.split("^^")[1] === id
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    key={key}
                    className={`text-[#f6f6f8] font-medium break-all flex flex-col rounded-[8px] text-[14px] p-[5px] w-fit ${
                      i.text.split("^^")[1] === id
                        ? "bg-[#5875e8]"
                        : "bg-[#313131]"
                    }`}
                  >
                    {i.text.split("^^")[0]}
                    {/* <TextSecondary
                    text={dayjs(i.text.split("^^")[2]).format("hh:mm")}
                    style="font-medium text-[12px] text-end"
                  /> */}
                  </div>
                </div>
              ))
            )}
          </div>

          <form
            id={"clear"}
            action={(e) => {
              if (e.get("msg")?.toString().length > 0)
                socket.emit("send", {
                  message: e.get("msg")?.toString(),
                  roomID: roomID,
                  userId: id,
                });
              document.getElementById("clear").reset();
            }}
            className="border-t-[2px] mx-[10px] border-[#8f8f8f] flex flex-row items-center "
          >
            <input
              name={"msg"}
              placeholder={"Сообщение..."}
              className="px-[12px] bg-transparent w-full h-[42px] text-[#2c2c2c] dark:text-white dark:placeholder:text-[#8f8f8f] text-[14px] pb-[12px] pt-[11px] transition duration-[250ms] hover:inner-border-[1px] outline-none placeholder:font-normal placeholder:text-[#bfbfbf] leading-[18px] tracking-[-0.015em] placeholder:leading-[18px] placeholder:tracking-[-0.015em]"
            />
            {role.includes("hr") && (
              <div
                onClick={() => setModal(true)}
                className="transition mr-[8px] duration-[250ms] h-fit w-fit cursor-pointer flex items-center justify-center bg-[#5875e8] hover:bg-[#3A56C5] active:bg-[#2C429C] rounded-full p-[10px]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  viewBox="0 0 2048 2048"
                >
                  <path
                    fill="#fff"
                    d="M1536 384v1216q0 93-35 174t-96 142-142 96-175 36q-93 0-174-35t-142-96-96-142-36-175V320q0-66 25-124t69-101 102-69T960 0t124 25 101 69 69 102 26 124v1280q0 40-15 75t-41 61-61 41-75 15-75-15-61-41-41-61-15-75V512h128v1088q0 26 19 45t45 19 45-19 19-45V320q0-40-15-75t-41-61-61-41-75-15-75 15-61 41-41 61-15 75v1280q0 66 25 124t69 101 102 69 124 26 124-25 101-69 69-102 26-124V384z"
                  />
                </svg>
              </div>
            )}
            <SendIcon />
          </form>
          {/* right */}
        </div>
      </div>

      <TestModal
        modalState={modal}
        setModalState={() => setModal(false)}
        VacTests={VacTests}
      />
    </>
  );
};

export default Call;
