import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";

import DropDownCross from "../icons/DropDownCross";
// import { getCitiesFromApi } from "../../server/actions/getCitiesFromApi";

const DropDownWithChoise = ({
  state = false,
  setState = () => {},
  items = [],
  city = {},
  placeholder = "",
  setCity = () => {},
}) => {
  useEffect(() => {
    // getCitiesFromApi("Уфа");
  }, []);

  const isMobile = useMediaQuery({ query: "(pointer:coarse)" });

  const ref = useRef();
  const [input, setInput] = useState("");
  const [filtered, setFiltered] = useState(
    items.filter((i) => !city.find((i2) => i2.label === i.label))
  );

  useEffect(() => {
    if (input.length === 0)
      setFiltered(
        items.filter((i) => !city.find((i2) => i2.label === i.label))
      );
  }, [input]);
  useEffect(() => {
    setFiltered(items.filter((i) => !city.find((i2) => i2.label === i.label)));
  }, [city]);

  return (
    <AnimatePresence>
      {state && (
        <>
          <div
            className="top-0 left-0 fixed w-full z-[200] h-full"
            onClick={() => setState(false)}
          />
          <motion.div
            className="absolute w-[236px] shadow-lg z-[201]"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.2 }}
          >
            {/* верхняя хуйня */}
            <>
              <div
                className={`h-fit w-full max-h-[200px] overflow-y-auto hideScrollbarNavMobile z-[201] bg-[#F6F6F8] dark:bg-[#2c2c2c] rounded-t-[8px]`}
              >
                {city.length !== 0 &&
                  city.map((item, key) => (
                    <div
                      className={`flex items-center cursor-pointer transition w-full duration-[250ms] justify-between p-[12px] hover:bg-[#efeff1] dark:hover:bg-[#212121]`}
                      onClick={() => {
                        setCity(city.filter((i) => i.label !== item.label));
                        if (!isMobile) ref?.current?.focus();
                      }}
                    >
                      <p className="w-[calc(100%-24px)] select-none truncate break-words font-normal text-[14px] leading-[18px] tracking-[-0.015em] text-[#2c2c2c] dark:text-[#fff]">
                        {item.label}
                      </p>
                      <DropDownCross />
                    </div>
                  ))}
              </div>
            </>
            {/* верхняя хуйня */}
            <div
              className={`${
                state ? "cursor-text" : "cursor-pointer"
              } border-b-[1px] flex w-full p-[12px] z-[201] h-[42px] flex-row items-center justify-between rounded-b-none ${
                city.length > 0 ? "rounded-t-0 border-t-[1px]" : "rounded-[8px]"
              } bg-[#F6F6F8] dark:bg-[#2c2c2c] dark:border-[#141414] border-[#f6f6f8]`}
              onClick={() => {
                ref?.current?.focus();
              }}
            >
              <input
                ref={ref}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  const newArr = filtered.filter((i) =>
                    i.label.toLowerCase().includes(e.target.value.toLowerCase())
                  );
                  setFiltered(newArr);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setCity([...city, { label: input }]);
                    setInput("");
                  }
                }}
                placeholder={placeholder}
                className={`outline-none z-[201] bg-[#F6F6F8] dark:bg-[#2c2c2c] text-[#2c2c2c] dark:text-white placeholder:text-[#bfbfbf] dark:placeholder:text-[#8f8f8f] w-full mr-[12px] ${
                  state ? "cursor-text" : "cursor-pointer"
                }`}
              />
            </div>
            {/* нижняя хуйня */}
            <>
              <div
                className={`h-fit w-full max-h-[200px] overflow-y-auto hideScrollbarNavMobile z-[201] bg-[#F6F6F8] dark:bg-[#2c2c2c] rounded-b-[8px]`}
              >
                {filtered.length !== 0 ? (
                  filtered.map((item, key) => (
                    <div
                      className={`${
                        key === filtered.length - 1 && "rounded-b-[8px]"
                      } 
                  hover:bg-[#efeff1] z-[201] select-none dark:hover:bg-[#212121] cursor-pointer flex flex-col transition duration-[250ms] p-[12px] font-normal text-[14px] leading-[18px] tracking-[-0.015em] text-[#2c2c2c] dark:text-[#fff]`}
                      onClick={() => {
                        setCity([...city, { label: item.label }]);
                        setFiltered(
                          filtered.filter((i) => i.label !== item.label)
                        );
                        setInput("");
                        if (!isMobile) ref?.current?.focus();
                      }}
                    >
                      {item.label}
                    </div>
                  ))
                ) : (
                  <div
                    className={`${
                      input.length !== 0 &&
                      "cursor-pointer hover:bg-[#efeff1] dark:hover:bg-[#212121]"
                    } flex rounded-b-[8px] select-none flex-col transition duration-[250ms] p-[12px] font-normal text-[14px] leading-[18px] tracking-[-0.015em] text-[#2c2c2c] dark:text-[#fff]`}
                    onClick={() => {
                      if (input.length !== 0)
                        setCity([...city, { label: input }]);
                      setInput("");
                      if (!isMobile) ref?.current?.focus();
                    }}
                  >
                    {input}
                  </div>
                )}
              </div>
            </>
            {/* нижняя хуйня */}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DropDownWithChoise;
