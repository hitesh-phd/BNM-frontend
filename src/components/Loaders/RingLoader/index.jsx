import React from "react";
import { twMerge } from "tailwind-merge";

const RingLoader = ({ className = "", borderColor = "border-primary-1" }) => {
  return (
    <div
      className={twMerge(`flex items-center justify-center h-full`, className)}
    >
      <div
        className={twMerge(
          `w-12 h-12 mr-5 border-t-2 border-b-2 rounded-full animate-spin`,
          borderColor
        )}
      />
    </div>
  );
};

export default RingLoader;
