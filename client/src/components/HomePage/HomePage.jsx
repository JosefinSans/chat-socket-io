import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
import AnimatedBackground from "../../bg-animate/AnimatedBackground.jsx";
import FormBlock from "./FormBlock.jsx";
import HeaderBlock from "./HeaderBlock.jsx";
function HomePage() {
  return (
    <div className="flex flex-col font-main items-center justify-center    gap-14 relative h-screen bg-gray-900">
      <AnimatedBackground />
      <div className="bg-white bg-opacity-5 px-16 py-20 rounded-lg ">
        <HeaderBlock />
        <FormBlock />
      </div>
    </div>
  );
}
export default HomePage;
