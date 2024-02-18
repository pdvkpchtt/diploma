"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import TextMain from "@/shared/Text/TextMain";
import Card from "@/shared/ui/Card";
import { Input } from "@/shared/ui/Input";
import { ButtonPrimary, OneIconButton } from "@/shared/ui/Button";
import ArrowLeftIcon from "@/shared/icons/ArrowLeftIcon";
import TextSecondary from "@/shared/Text/TextSecondary";
import SkillCard from "@/shared/ui/SkillCard";
import AddCityIcon from "@/shared/icons/AddCityIcon";
import DropDownWithChoise from "@/shared/ui/DropDownWithChoise";
import DropDownWithSearch from "@/shared/ui/DropDownWithSearch";

import { v4 } from "uuidv4";

import socket from "@/socket";
import ACTIONS from "@/socket/actions";

const CreateCall = ({ users }) => {
  const [rooms, updateRooms] = useState([]);
  const rootNode = useRef();

  useEffect(() => {
    socket.on(ACTIONS.SHARE_ROOMS, ({ rooms = [] } = {}) => {
      updateRooms(rooms);
      console.log(rooms, "asasas");
    });
  }, []);

  const usersNew = users?.map((i) => true && { id: i.id, label: i.name });

  const router = useRouter();
  const searchParams = useSearchParams();
  // const email = searchParams.get("email");

  const [state, setState] = useState({
    name: "",
    user: { label: "" },
  });
  const [state6, setState6] = useState(false);

  return (
    <div className="flex justify-center h-full w-full items-center max-w-[500px] mx-auto">
      <Card style={"w-full flex flex-col gap-[12px]"}>
        <div className="w-full flex flex-row items-center justify-between mb-[12px]">
          <OneIconButton onClick={() => router.back()}>
            <ArrowLeftIcon />
          </OneIconButton>

          <TextMain
            text="Создать собеседование"
            style="font-semibold select-none text-[18px]"
          />

          <OneIconButton onClick={() => router.back()} style="invisible">
            <ArrowLeftIcon />
          </OneIconButton>
        </div>

        <Input
          placeholder="Название собеседования"
          label="Название"
          maxLength={480}
          value={state.name}
          onChange={(val) => setState({ ...state, name: val })}
        />

        <div className="flex flex-col">
          <TextSecondary
            text={"Собеседуемый"}
            style="font-medium text-[14px] select-none leading-[16.8px] tracking-[-0.013em] mb-[6px]"
          />
          <DropDownWithSearch
            state={state6}
            setState={setState6}
            city={state.user.label.length === 0 ? "" : state.user.label}
            setCity={(val) => {
              setState({
                ...state,
                user: val,
              });
            }}
            items={usersNew}
            placeholder="Выберите соискателя"
          />
        </div>

        <button
          className={`${
            state.name.length === 0 || !state?.user?.id
              ? "opacity-50 cursor-default"
              : "cursor-pointer hover:bg-[#3A56C5] active:bg-[#2C429C]"
          } w-full mt-[12px] font-medium outline-none [@media(pointer:coarse)]:rounded-[20px] transition duration-[250ms] rounded-[16px] h-[43px] bg-[#5875e8] leading-[20px] text-[16px] tracking-[-0.015em] text-center select-none text-white items-center flex justify-center `}
          onClick={() => {}}
        >
          Начать собеседование
        </button>
      </Card>
    </div>
  );
};

export default CreateCall;
