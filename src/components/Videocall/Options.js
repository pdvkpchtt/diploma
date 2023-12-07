"use client";

import { useContext, useState } from "react";

import { Input } from "../../shared/ui/Input";
import Card from "../../shared/ui/Card";
import { SocketContext } from "../SocketContextWrap";

import Call1 from "../../shared/icons/Call1";
import Call2 from "../../shared/icons/Call2";

const Options = ({ children }) => {
  const { name, setName, callAccepted, me, callEnded, leaveCall, callUser } =
    useContext(SocketContext);

  console.log(me);

  const [idToCall, setIdToCall] = useState("");

  return (
    <Card
      padding={12}
      style="left-0 flex flex-col justify-center items-center gap-[12px]"
    >
      <div className="flex flex-row gap-[12px] w-full justify-center items-end">
        {/* <Input
          value={name}
          onChange={(val) => setName(val)}
          label="Имя"
          placeholder="Имя пользователя"
        /> */}
        <Input
          value={idToCall}
          onChange={(val) => setIdToCall(val)}
          label="Username"
          placeholder="Username пользователя"
        />
        {callAccepted && !callEnded ? (
          <Call2 onClick={leaveCall} />
        ) : (
          <Call1 onClick={() => callUser(idToCall)} />
        )}
      </div>

      {children}
    </Card>
  );
};

export default Options;
