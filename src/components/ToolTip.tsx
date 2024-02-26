"use client";

import React, { useState, ReactNode } from "react";

interface TooltipProps {
  text: string;
  children: ReactNode;
}
export default function ToolTip({ text, children }: TooltipProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative">
      <div
        className="flex h-full w-full cursor-pointer items-center justify-center"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {children}
      </div>
      {showTooltip && (
        <div
          className="absolute left-1/2 z-10 mt-2 inline-block -translate-x-1/2 transform rounded-md bg-primary p-2 text-14 text-white shadow-lg"
          style={{ top: "80%" }}
        >
          <div className="inline-flex whitespace-nowrap">{text}</div>
          <div className="absolute left-1/2 top-[-8px] h-4 w-4 -translate-x-1/2 rotate-45 transform bg-primary"></div>
        </div>
      )}
    </div>
  );
}
