import React from "react";
import { motion } from "framer-motion";

const AnimatedSpark = ({ x, y }) => {
  const colors = [
    "rgba(255, 0, 150, 0.7)",
    "rgba(0, 204, 255, 0.7)",
    "rgba(75, 0, 130, 0.7)",
    "rgba(255, 165, 0, 0.7)",
    "rgba(128, 0, 128, 0.7)",
    "rgba(0, 255, 127, 0.7)",
  ];

  const variants = {
    initial: {
      opacity: 0,
      scale: 0,
    },
    animate: {
      opacity: 0.5,
      scale: 2.5,
      transition: {
        duration: 5,
        ease: [0.68, -0.55, 0.27, 1.55],
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
  };

  return (
    <motion.div
      className={`absolute rounded-full`}
      initial="initial"
      animate="animate"
      variants={variants}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: "90px",
        height: "90px",
        background: `radial-gradient(circle, ${
          colors[Math.floor(Math.random() * colors.length)]
        } 0%, transparent 70%)`,
        filter: "blur(25px",
      }}
    />
  );
};

export default AnimatedSpark;
