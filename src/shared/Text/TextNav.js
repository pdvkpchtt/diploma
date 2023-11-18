import { motion } from "framer-motion";

const TextNav = ({ text = "", active = false, styled = "" }) => {
  return (
    <motion.div
      className={`${styled} text-[15px] leading-[20px] tracking-[-0.0140625em] transition duration-[250ms] font-medium
          ${active ? "text-[#5875e8]" : "text-[#2c2c2c] dark:text-[#8f8f8f]"}
        `}
    >
      {text}

      {active ? (
        <motion.div
          layoutId="activeItem"
          className="mt-[8px] h-[2px] w-full bg-[#5875e8] z-50"
        />
      ) : null}
    </motion.div>
  );
};

export default TextNav;
