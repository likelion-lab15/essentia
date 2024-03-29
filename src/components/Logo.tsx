"use client";

import Link from "next/link";

export default function Logo() {
  const handleMouseOver = () => {
    const firstPath = document.querySelector("path");
    if (firstPath) {
      firstPath.setAttribute("fill", "#A0D1EF");
    }
  };

  const handleMouseOut = () => {
    const firstPath = document.querySelector("path");
    if (firstPath) {
      firstPath.setAttribute("fill", "#fff");
    }
  };

  return (
    <Link
      href="/"
      className="mr-[60px] flex h-[80px] w-[140px] items-center justify-center"
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 361 111"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <path
          d="M357.383 0.370117H96.1226V23.2701C86.9426 9.11011 71.4426 0.370117 52.7626 0.370117C22.4026 0.370117 0.382568 23.5101 0.382568 55.3701C0.382568 87.2301 22.4026 110.37 52.7626 110.37C71.4226 110.37 86.9426 101.61 96.1226 87.4701V110.37H360.383V0.370117H357.363H357.383Z"
          fill="#fff"
        />
        <path
          d="M52.7826 99.3701C28.3626 99.3701 11.2426 81.4701 11.2426 55.3701C11.2426 29.2701 28.3626 11.3701 52.7826 11.3701C77.2026 11.3701 94.3226 29.2701 94.3226 55.3701C94.3226 81.4701 77.0626 99.3701 52.7826 99.3701ZM52.7826 21.3301C34.7425 21.3301 23.0626 34.6501 23.0626 55.3701C23.0626 76.0901 34.7425 89.4101 52.7826 89.4101C70.8226 89.4101 82.3826 76.0901 82.3826 55.3701C82.3826 34.6501 70.8426 21.3301 52.7826 21.3301Z"
          fill="black"
        />
        <path
          d="M166.903 78.7101V11.3901H178.063V99.3901H168.563L118.143 28.7101V99.3901H106.983V11.3901H119.383L166.903 78.7101Z"
          fill="black"
        />
        <path
          d="M254.503 11.3701H267.183L233.423 64.8701V99.3701H221.983V64.8701L188.103 11.3701H201.183L228.323 53.5501L254.503 11.3701Z"
          fill="black"
        />
        <path
          d="M315.943 53.2901L349.563 99.3901H335.503L308.783 62.9301L282.463 99.3901H269.103L302.583 54.1301L272.003 11.3901H286.063L309.623 44.7701L333.183 11.3901H346.543L315.963 53.2901H315.943Z"
          fill="black"
        />
      </svg>
    </Link>
  );
}
