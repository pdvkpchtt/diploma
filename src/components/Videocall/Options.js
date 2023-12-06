"use client";

import { useContext, useState } from "react";

import { Input } from "../../shared/ui/Input";
import Card from "../../shared/ui/Card";
import { SocketContext } from "../SocketContextWrap";

const Options = ({ children }) => {
  const { name, setName, callAccepted, me, callEnded, leaveCall, callUser } =
    useContext(SocketContext);

  const [idToCall, setIdToCall] = useState("");

  return (
    <Card padding={12} style="left-0 flex flex-col justify-center gap-[12px]">
      <div className="flex flex-row gap-[12px]">
        <Input
          value={name}
          onChange={(val) => setName(val)}
          label="Имя"
          placeholder="Имя пользователя"
        />
        <Input
          value={idToCall}
          onChange={(val) => setIdToCall(val)}
          label="Username"
          placeholder="Username пользователя"
        />
      </div>
      {callAccepted && !callEnded ? (
        <div className="bg-red-500">Hang</div>
      ) : (
        <div className="bg-red-500">call</div>
      )}

      {children}
    </Card>
  );
};

export default Options;
