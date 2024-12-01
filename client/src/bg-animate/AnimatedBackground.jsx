import React from "react";
import AnimatedSpark from "./AnimatedSpark";
import { getRandomPosition } from "./utils";

const AnimatedBackground = () => {
  const sparks = Array.from({ length: 10 }); // Уменьшаем количество вспышек до 10

  return (
    <div className="absolute top-0 left-0 w-full h-full  overflow-hidden">
      {sparks.map((_, index) => {
        const { x, y } = getRandomPosition(); // Получаем случайные координаты
        return <AnimatedSpark key={index} x={x} y={y} />;
      })}
    </div>
  );
};

export default AnimatedBackground;
