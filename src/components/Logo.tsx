import React from "react";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <svg
        width="260"
        height="80"
        viewBox="0 0 390 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Optional background rectangle: remove or set opacity as needed */}
        {/* <rect width="390" height="110" fill="#132447" /> */}

        {/* AstraSky text */}
        <text
          x="10"
          y="70"
          fontFamily="serif"
          fontSize="74"
          fill="white"
          fontWeight="400"
          letterSpacing="-2"
        >
          AstraSky
        </text>
        {/* Crescent moon */}
        <g>
          {/* Outer moon (yellow) */}
          <circle cx="350" cy="38" r="26" fill="gold" />
          {/* Black overlap for crescent */}
          <ellipse cx="362" cy="38" rx="26" ry="26" fill="#132447" />
        </g>
        {/* Tagline subtitle */}
        <text
          x="10"
          y="98"
          fontFamily="sans-serif"
          fontSize="24"
          fill="#adb8cb"
          fontWeight="400"
        >
          Real-Time Astronomy Dashboard
        </text>
      </svg>
    </div>
  );
}
