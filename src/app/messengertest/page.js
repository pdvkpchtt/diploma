"use client";

import socket from "@/socket";

const MessengerTestPage = () => {
  return (
    <div
      className="mt-[80px] w-full h-full cursor-pointer"
      onClick={() => socket.on("send")}
    >
      MessengerTestPage
    </div>
  );
};

export default MessengerTestPage;
