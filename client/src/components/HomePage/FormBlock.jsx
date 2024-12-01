import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { delay, motion, transform } from "framer-motion";
export default function FormBlock() {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("name", name);
    localStorage.setItem("id", Date.now());
    console.log("connected");
    !name ? alert("enter the name") : navigate("/rooms");
  };

  const variants = {
    hidden: {
      opacity: 0,
      backgroundPosition: "0% 50%",
    },
    visible: {
      opacity: 1,
      backgroundPosition: "100% 50%",
      transition: { delay: 1, duration: 2, easy: "easeInOut" },
    },
  };

  return (
    <motion.form
      initial="hidden"
      animate="visible"
      variants={variants}
      onSubmit={handleSubmit}
      className="bg-gray-100 mt-14 bg-gradient-to-r from-purple-600 via-blue-500 to-fuchsia-500 bg-[length:400%_100%] p-8 rounded-md shadow-md  text-white "
    >
      <div className="text-3xl text-center">enter your nickname</div>
      <input
        id="name"
        type="text"
        value={name}
        onChange={handleChange}
        maxLength={20}
        className="mb-4 py-2  border-[2px] bg-transparent text-gray-600 text-center text-xl border-gray-700 rounded w-full"
      />
      <button
        type="submit"
        className="bg-gray-700 w-full text-center text-2xl text-white py-2 px-4 rounded hover:bg-gray-800 transition"
      >
        Go
      </button>
    </motion.form>
  );
}
