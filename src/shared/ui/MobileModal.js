import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

const MobileModal = ({
  isOpen = false,
  handleClose = () => {},
  children,
  slideToLeft = false,
  translate = "translate(-50%, 0%)",
  withScroll = false,
  withOutScroll = false,
}) => {
  useEffect(() => {
    if (withOutScroll) {
      if (isOpen) document.body.style.overflow = "hidden";
      else document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const modalVariant = {
    initial: { opacity: 0 },
    isOpen: { opacity: 1 },
    exit: { opacity: 0 },
  };
  const containerVariant = slideToLeft
    ? {
        initial: { left: "100%", transition: { type: "spring" } },
        isOpen: { left: "50%" },
        exit: { left: "100%" },
      }
    : {
        initial: { top: "100%", transition: { type: "spring" } },
        isOpen: { top: "0" },
        exit: { top: "100%" },
      };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed [@media(hover)]:hidden top-0 left-0 w-full h-full bg-[#000] bg-opacity-[20%] z-50"
          initial={"initial"}
          animate={"isOpen"}
          exit={"exit"}
          variants={modalVariant}
        >
          <motion.div
            className="w-full h-full fixed z-[900] dark:bg-[#141414] bg-[#F6F6F8] bottom-0 left-[50%]"
            variants={containerVariant}
            style={{ transform: translate }}
          >
            <div
              className={`max-w-[500px] z-[900] mx-auto w-full h-full ${
                withScroll && "overflow-y-scroll"
              }`}
            >
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileModal;
