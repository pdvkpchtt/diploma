"use client";

import { useRef, useState } from "react";
import { useEffect } from "react";
import * as faceapi from "face-api.js";

const TestimFichi = () => {
  const myVideo = useRef();
  const canvasRef = useRef();

  const [unveren, setUveren] = useState(0);
  const [stream, setStream] = useState(null);
  const [detections, setDetections] = useState({
    neutral: 0,
    happy: 0,
    sad: 0,
    angry: 0,
    fearful: 0,
    disgusted: 0,
    surprised: 0,
  });

  useEffect(() => {
    setUveren(
      ((4 -
        (detections.sad +
          detections.angry +
          detections.fearful +
          detections.disgusted)) /
        4) *
        100
    );
  }, [detections]);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
      });
  }, []);

  useEffect(() => {
    if (myVideo.current) {
      myVideo.current.srcObject = stream;
      loadModels();
    }
  }, [myVideo, stream]);

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

        canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(
          myVideo.current
        );
        faceapi.matchDimensions(canvasRef.current, {
          width: 540,
          height: 405,
        });

        const resized = faceapi.resizeResults(detections, {
          width: 540,
          height: 405,
        });

        faceapi.draw.drawDetections(canvasRef.current, resized);
        // faceapi.draw.drawFaceLandmarks(canvasRef.current, resized);
        faceapi.draw.drawFaceExpressions(canvasRef.current, resized);

        if (detections.length > 0) {
          setDetections(detections[0]?.expressions);
          console.log(detections[0]?.expressions);
        }
      }, 350);
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

  return (
    <div className="mt-[86px] w-full h-full">
      <div className="flex flex-row gap-[32px]">
        <div className="w-[540px] h-full">
          <canvas ref={canvasRef}></canvas>
          <video
            ref={myVideo}
            id="video"
            width="540"
            height="405"
            muted
            autoPlay
            // className="scale-x-[-1]"
          ></video>
        </div>

        <div className="w-fit h-full">
          <p>neutral: {Number(detections.neutral).toFixed(4)}</p>
          <p>happy: {Number(detections.happy).toFixed(4)}</p>
          <p>surprised: {Number(detections.surprised).toFixed(4)}</p>
          <p className="text-[red]">sad: {Number(detections.sad).toFixed(4)}</p>
          <p className="text-[red]">
            angry: {Number(detections.angry).toFixed(4)}
          </p>
          <p className="text-[red]">
            fearful: {Number(detections.fearful).toFixed(4)}
          </p>
          <p className="text-[red]">
            disgusted: {Number(detections.disgusted).toFixed(4)}
          </p>

          <p className="mt-[24px]">Увереность: {unveren}%</p>
        </div>
      </div>
    </div>
  );
};

export default TestimFichi;
