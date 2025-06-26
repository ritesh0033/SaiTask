"use client";

import { useEffect, useState } from "react";

interface ScrollSectionProps {
  from: number;
  to: number;
  direction?: "vertical" | "horizontal";
}

const ScrollSection = ({
  from,
  to,
  direction = "vertical",
}: ScrollSectionProps) => {
  const [items, setItems] = useState<number[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < to - from + 1) {
      const timer = setTimeout(() => {
        setItems((prev) => [...prev, from + index]);
        setIndex((prev) => prev + 1);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [index, from, to]);

  return (
    <div
      className={`flex ${
        direction === "horizontal" ? "flex-row overflow-x-auto" : "flex-col"
      } gap-4 min-h-screen p-4`}
    >
      {items.map((item) => (
        <div
          key={item}
          className="bg-indigo-600 text-white text-3xl font-semibold p-10 rounded-xl shadow-xl min-w-[200px] text-center"
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default ScrollSection;
