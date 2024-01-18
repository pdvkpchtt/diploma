"use client";

import { useEffect, useState } from "react";
import { Waypoint } from "react-waypoint";

import Modal from "../../shared/ui/Modal";
import CustomLoader from "../../shared/ui/CustomLoader";
import ConnectionCard from "../../shared/ui/ConnectionCard";
import TextCaption from "../../shared/Text/TextCaption";
import MobileModal from "../../shared/ui/MobileModal";
import MobileHeader from "../../shared/ui/MobileHeader";
import { fetchGetRecruters } from "../../server/actions/connections/fetchGetRecruters";

import Cross2 from "../../shared/icons/Cross2";

const RecrutersModal = ({
  comapnyId,
  modalState = false,
  setModalState = () => {},
}) => {
  const [cursor, setCursor] = useState("");
  const [input, setInput] = useState("");
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState(null);
  const [role, setRole] = useState("");

  const getRecruters = async (cursor) => {
    console.log("fetching");
    // if (loading) return;
    setLoading(true);
    const data = await fetchGetRecruters(comapnyId, cursor, input);
    if (cursor.length) {
      setUsers([...users, ...data.data]);
      setRole(data.role);
    } else {
      setUsers(data.data);
      setRole(data.role);
    }
    setCursor(data.cursor);
    setHasNextPage(data.hasNextPage);
    setLoading(false);
  };

  useEffect(() => {
    setCursor("");
    getRecruters("");
  }, [fetchGetRecruters, input]);
  useEffect(() => {
    setCursor("");
    getRecruters("");
  }, [modalState]);

  return (
    <>
      <Modal withScroll isOpen={modalState}>
        {/* header */}
        <div className="flex flex-row justify-end pb-[12px] relative">
          <Cross2 onClick={() => setModalState(false)} />

          <div className="h-[0.5px] w-[calc(100%+24px)] bg-[#e7e7e7] dark:bg-[#2f2f2f] absolute top-[30px] left-[-12px]" />
        </div>
        {/* header */}

        {/* body */}
        <div className="h-[371px] mt-[12px] flex flex-col gap-[12px]">
          <>
            {!users ? (
              <div className="w-full flex justify-center items-center h-full">
                <CustomLoader diameter={36} />
              </div>
            ) : users?.length === 0 ? (
              input.length === 0 ? (
                <div className="flex w-full justify-center">
                  <TextCaption
                    text={`Нет рекрутеров...`}
                    style="text-[18px] leading-[21.6px] tracking-[-0.025em]"
                  />
                </div>
              ) : (
                <div className="flex w-full justify-center">
                  <TextCaption
                    text={`Ничего не найдено...`}
                    style="text-[18px] leading-[21.6px] tracking-[-0.025em]"
                  />
                </div>
              )
            ) : (
              <div className="hideScrollbarNav flex flex-col gap-[12px] overflow-y-scroll pb-[12px]">
                {users.map((item, key) => (
                  <ConnectionCard
                    key={key}
                    friend
                    role={role}
                    updateModal={() => {
                      setCursor("");
                      getRecruters("");
                    }}
                    item={item}
                  />
                ))}
                {hasNextPage ? (
                  <Waypoint
                    onEnter={async () => {
                      console.log("Enter waypoint");
                      await getRecruters(cursor);
                    }}
                    topOffset="50px"
                  >
                    <div className="w-full flex justify-center items-center">
                      <CustomLoader diameter={36} />
                    </div>
                  </Waypoint>
                ) : null}
              </div>
            )}
          </>
        </div>
        {/* body */}
      </Modal>

      <MobileModal isOpen={modalState} slideToLeft>
        <div className="fixed w-full z-[-1] h-full top-0 left-0 bg-[#f6f6f8] dark:bg-[#141414]" />
        {/* header */}
        <MobileHeader onClick={() => setModalState(false)}></MobileHeader>

        {/* header */}

        {/* body */}
        <div className="mt-[113px] flex flex-col gap-[6px] p-[12px] overflow-y-scroll h-[100vh]">
          <>
            {!users ? (
              <div className="w-full flex justify-center items-center h-full">
                <CustomLoader diameter={36} />
              </div>
            ) : users?.length === 0 ? (
              input.length === 0 ? (
                <div className="flex w-full justify-center">
                  <TextCaption
                    text={`Нет рекрутеров...`}
                    style="text-[18px] leading-[21.6px] tracking-[-0.025em]"
                  />
                </div>
              ) : (
                <div className="flex w-full justify-center">
                  <TextCaption
                    text={`Ничего не найдено...`}
                    style="text-[18px] leading-[21.6px] tracking-[-0.025em]"
                  />
                </div>
              )
            ) : (
              <>
                {users.map((item, key) => (
                  <ConnectionCard
                    key={key}
                    friend
                    role={role}
                    updateModal={() => {
                      setCursor("");
                      getRecruters("");
                    }}
                    item={item}
                  />
                ))}
                {hasNextPage ? (
                  <Waypoint
                    onEnter={async () => {
                      console.log("Enter waypoint");
                      await getRecruters(cursor);
                    }}
                    topOffset="50px"
                  >
                    <div className="w-full flex justify-center items-center">
                      <CustomLoader diameter={36} />
                    </div>
                  </Waypoint>
                ) : null}
                <div className="[@media(pointer:coarse)]:pb-[48px] [@media(hover)]:hidden" />
              </>
            )}
          </>
          <div className="mb-[108px]" />
        </div>
        {/* body */}
      </MobileModal>
    </>
  );
};

export default RecrutersModal;
