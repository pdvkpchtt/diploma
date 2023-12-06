"use client";

import SocketContextWrap from "../../components/SocketContextWrap";
import VideoCall from "../../components/Videocall/VideoCall";

const TestPage = () => {
  return (
    <SocketContextWrap>
      <VideoCall />
    </SocketContextWrap>
  );
};

export default TestPage;
