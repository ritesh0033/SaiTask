"use client";

import { useRef, useState } from "react";

const ScrollPage = () => {
  const [firstSection, setFirstSection] = useState([1]);
  const [middleSection, setMiddleSection] = useState<number[]>([]);
  const [lastSection, setLastSection] = useState<number[]>([]);
  const [currentPhase, setCurrentPhase] = useState<"first" | "middle" | "last">(
    "first"
  );
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    if (scrollTimeout.current) return;
    const isScrollingDown = e.deltaY > 0;

    scrollTimeout.current = setTimeout(() => {
      if (currentPhase === "first") {
        setFirstSection((prev) => {
          const nextValue = prev.length + (isScrollingDown ? 1 : -1);
          if (isScrollingDown && nextValue <= 20) return [...prev, nextValue];
          if (!isScrollingDown && nextValue >= 1) return prev.slice(0, -1);
          if (isScrollingDown && nextValue > 20) setCurrentPhase("middle");
          return prev;
        });
      }

      if (currentPhase === "middle") {
        setMiddleSection((prev) => {
          const currentValue = 21 + prev.length;
          if (isScrollingDown) {
            if (currentValue <= 30) {
              const newItem = currentValue;
              const updated = [...prev, newItem];
              if (newItem === 30) setCurrentPhase("last");
              return updated;
            }
          } else {
            if (prev.length > 0) return prev.slice(0, -1);
            setCurrentPhase("first");
          }
          return prev;
        });
      }

      if (currentPhase === "last") {
        setLastSection((prev) => {
          const nextValue = 31 + prev.length;
          if (isScrollingDown && nextValue <= 50) return [...prev, nextValue];
          if (!isScrollingDown && prev.length > 0) return prev.slice(0, -1);
          if (!isScrollingDown && prev.length === 0) setCurrentPhase("middle");
          return prev;
        });
      }

      scrollTimeout.current = null;
    }, 500);
  };

  return (
    <div
      onWheel={handleScroll}
      className="h-screen overflow-y-scroll p-4 sm:p-6 md:p-8 space-y-6 bg-gray-100"
    >
      {/* First Vertical Section */}
      {firstSection.map((num) => (
        <div
          key={num}
          className="h-32 bg-orange-200 rounded-lg flex items-center justify-center text-xl sm:text-2xl font-bold shadow border border-orange-400"
        >
          {num}
        </div>
      ))}

      {/* Horizontal Section */}
      {(currentPhase === "middle" || middleSection.length > 0) && (
        <div className="w-full overflow-x-auto py-4">
          <div className="flex space-x-4 w-max px-2">
            {middleSection.map((num) => (
              <div
                key={num}
                className="w-40 h-20 bg-teal-200 rounded-lg flex items-center justify-center text-xl font-bold shadow border border-teal-400"
              >
                {num}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Last Vertical Section */}
      {currentPhase === "last" &&
        lastSection.map((num) => (
          <div
            key={num}
            className="h-20 bg-pink-200 rounded-lg flex items-center justify-center text-xl font-bold shadow border border-pink-400"
          >
            {num}
          </div>
        ))}
    </div>
  );
};

export default ScrollPage;
