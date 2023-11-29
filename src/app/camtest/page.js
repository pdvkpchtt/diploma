"use client";

import { useRef, useEffect, useState } from "react";
import * as faceapi from "face-api.js";
import "./page.css";

const CamTestPage = () => {
  const videoRef = useRef();
  const canvasRef = useRef();

  const [angry, setangry] = useState(0);
  const [disgusted, setdisgusted] = useState(0);
  const [fearful, setfearful] = useState(0);
  const [happy, sethappy] = useState(0);
  const [neutral, setneutral] = useState(0);
  const [sad, setsad] = useState(0);
  const [surprised, setsurprised] = useState(0);

  useEffect(() => {
    startVideo();
    videoRef && loadModels();
  }, []);

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((currentStream) => {
        videoRef.current.srcObject = currentStream;
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
          setangry(angry + detections[0]?.expressions?.angry);
          setdisgusted(disgusted + detections[0]?.expressions?.disgusted);
          setfearful(fearful + detections[0]?.expressions?.fearful);
          sethappy(happy + detections[0]?.expressions?.happy);
          setneutral(neutral + detections[0]?.expressions?.neutral);
          setsad(sad + detections[0]?.expressions?.sad);
          setsurprised(surprised + detections[0]?.expressions?.surprised);
          console.log(detections[0]?.expressions);
        }
      }, 1000);
    } catch (err) {
      console.log("");
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
    <div className="w-[100vw] h-[100vh] flex items-center justify-center">
      <div className="absolute left-[150px] flex flex-col">
        <p className="mt-[5px]"> angry: {angry}</p>
        <p className="mt-[5px]"> disgusted: {disgusted}</p>
        <p className="mt-[5px]"> fearful: {fearful}</p>
        <p className="mt-[5px]"> happy: {happy}</p>
        <p className="mt-[5px]"> neutral: {neutral}</p>
        <p className="mt-[5px]"> sad: {sad}</p>
        <p className="mt-[5px]"> surprised: {surprised}</p>
      </div>

      <video crossOrigin="anonymous" ref={videoRef} autoPlay></video>
      <canvas
        ref={canvasRef}
        width="940"
        height="650"
        className="appcanvas mt-[-150px]"
      />
    </div>
  );
};

export default CamTestPage;
