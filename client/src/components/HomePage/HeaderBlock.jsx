import React from "react";
import { motion } from "framer-motion";
function HeaderBlock() {
  const variants = {
    hidden: { opacity: 0, x: -50 },
    visible: (delay) => ({
      opacity: 1,
      x: 0,
      transition: { delay, duration: 0.5 },
    }),
  };

  return (
    <div className=" text-center  text-gray-200">
      <motion.h1
        variants={variants}
        initial="hidden"
        animate="visible"
        custom={0.5}
        className="text-7xl"
      >
        <span className="text-fuchsia-600">Welcome</span> back
      </motion.h1>
      <motion.h2
        variants={variants}
        initial="hidden"
        animate="visible"
        custom={1.5}
        className="text-5xl mt-[23px]"
      >
        Ready to start chatting?
      </motion.h2>
    </div>
  );
}

export default HeaderBlock;
