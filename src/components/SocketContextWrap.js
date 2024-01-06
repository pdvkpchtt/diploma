"use client";

import { createContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";
import * as faceapi from "face-api.js";

export const SocketContext = createContext();

const socket = io("http://localhost:5000");

const SocketContextWrap = ({ children }) => {
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
  const canvasRef = useRef();

  const [stream, setStream] = useState(null);
  const [me, setMe] = useState("");
  const [call, setCall] = useState({});
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");

  const [angry, setangry] = useState(0);
  const [disgusted, setdisgusted] = useState(0);
  const [fearful, setfearful] = useState(0);
  const [happy, sethappy] = useState(0);
  const [neutral, setneutral] = useState(0);
  const [sad, setsad] = useState(0);
  const [surprised, setsurprised] = useState(0);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);

        // myVideo?.current?.srcObject = currentStream;
      });

    socket.on("me", (id) => setMe(id));
    socket.on("calluser", ({ from, name: callerName, signal }) => {
      setCall({ isReceivedCall: true, from, name: callerName, signal });
    });
  }, []);

  useEffect(() => {
    if (myVideo.current) {
      myVideo.current.srcObject = stream;
      loadModels();
    }
  }, [myVideo, stream]);

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("answercall", { signal: data, to: call.from });
    });
    peer.on("stream", (currentStream) => {
      if (userVideo.current) userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("calluser", {
        userToCall: id,
        signalData: data,
        from: me,
        name,
      });
    });
    peer.on("stream", (currentStream) => {
      if (userVideo.current) userVideo.current.srcObject = currentStream;
    });

    socket.on("callaccepted", (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);

    connectionRef.current.destroy();

    window.location.reload();
  };

  const faceMyDetect = () => {
    try {
      setInterval(async () => {
        const detections = await faceapi
          .detectAllFaces(
            myVideo.current,
            new faceapi.TinyFaceDetectorOptions()
          )
          .withFaceLandmarks()
          .withFaceExpressions();

        if (canvasRef.current) {
          canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(
            myVideo.current
          );
          faceapi.matchDimensions(canvasRef.current, {
            width: 940,
            height: 650,
          });
        }

        const resized = faceapi.resizeResults(detections, {
          width: 940,
          height: 650,
        });

        faceapi.draw.drawDetections(canvasRef.current, resized);
        //   faceapi.draw.drawFaceLandmarks(canvasRef.current, resized);
        faceapi.draw.drawFaceExpressions(canvasRef.current, resized);

        if (detections.length > 0) {
          setangry(angry + detections[0]?.expressions?.angry);
          setdisgusted(disgusted + detections[0]?.expressions?.disgusted);
          setfearful(fearful + detections[0]?.expressions?.fearful);
          sethappy(happy + detections[0]?.expressions?.happy);
          setneutral(neutral + detections[0]?.expressions?.neutral);
          setsad(sad + detections[0]?.expressions?.sad);
          setsurprised(surprised + detections[0]?.expressions?.surprised);
          // console.log(detections[0]?.expressions);
        }
      }, 1000);
    } catch (err) {
      // console.log("");
    }
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

  return (
    <SocketContext.Provider
      value={{
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        name,
        setName,
        callEnded,
        me,
        callUser,
        leaveCall,
        answerCall,
        canvasRef,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextWrap;
