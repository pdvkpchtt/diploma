"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

import Cross2 from "../../shared/icons/Cross2";

const modalVariant = {
  initial: { opacity: 0 },
  isOpen: { opacity: 1 },
  exit: { opacity: 0 },
};
const containerVariant = {
  initial: { bottom: "-100%", transition: { type: "spring" } },
  isOpen: { bottom: "0%" },
  exit: { bottom: "-100%" },
};

const BottomModal = ({
  handleClose,
  children,
  isOpen,
  translate = "translate(-50%, 0%)",
}) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed top-0 left-0 w-full h-full bg-[#4A5479] bg-opacity-[20%] dark:bg-[#000] dark:bg-opacity-[50%] z-[100]"
            initial={"initial"}
            animate={"isOpen"}
            exit={"exit"}
            variants={modalVariant}
            onClick={handleClose}
          ></motion.div>
          <motion.div
            className="max-w-[978px] [@media(pointer:coarse)]:max-w-[498px] z-[200] [@media(pointer:coarse)]:px-[12px] px-[16px] w-full h-fit fixed bottom-0 left-[50%]"
            initial={"initial"}
            animate={"isOpen"}
            exit={"exit"}
            variants={containerVariant}
            style={{ transform: translate }}
          >
            {/* modal header */}
            <div className="p-[16px] w-full border-b-[0.7px] flex justify-end dark:bg-[#141414] bg-[#F6F6F8] border-b-[#e7e7e7] rounded-t-[20px] dark:border-b-[#282828]">
              <Cross2 onClick={handleClose} />
            </div>
            {/* modal header */}

            <div className="dark:bg-[#141414] bg-[#F6F6F8]">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BottomModal;
