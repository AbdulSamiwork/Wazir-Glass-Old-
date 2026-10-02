import React from "react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "full" | "icon";
  dark?: boolean;
}

export function Logo({
  className = "",
  size = "md",
  variant = "full",
  dark = false,
}: LogoProps) {
  // Dimension mappings
  const iconDimensions = {
    sm: { width: 32, height: 32 },
    md: { width: 42, height: 42 },
    lg: { width: 54, height: 54 },
    xl: { width: 68, height: 68 },
  }[size];

  const textSizeClasses = {
    sm: "text-lg tracking-tight",
    md: "text-xl tracking-tight",
    lg: "text-2xl tracking-normal",
    xl: "text-3xl tracking-wide",
  }[size];

  const subtextSizeClasses = {
    sm: "text-[9px] tracking-wider",
    md: "text-[10px] tracking-widest",
    lg: "text-xs tracking-[0.2em]",
    xl: "text-sm tracking-[0.25em]",
  }[size];

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* --- Architectural Glass & Aluminium Emblem --- */}
      <div className="relative flex-shrink-0 group">
        {/* Subtle ambient glass glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-cyan-400/20 rounded-xl blur-sm opacity-80 group-hover:opacity-100 transition-opacity" />

        <svg
          width={iconDimensions.width}
          height={iconDimensions.height}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative drop-shadow-md transition-transform duration-300 group-hover:scale-105"
        >
          <defs>
            {/* Aluminium Frame Gradient */}
            <linearGradient id="frameGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#1d4ed8" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>

            {/* Faceted Crystal Blue Gradient 1 */}
            <linearGradient id="glassFacet1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>

            {/* Faceted Crystal Blue Gradient 2 */}
            <linearGradient id="glassFacet2" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>

            {/* Central Crystal Apex Gradient */}
            <linearGradient id="centerGlass" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#93c5fd" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1e40af" />
            </linearGradient>

            {/* Glass Glare Specular Highlight */}
            <linearGradient id="specularGlint" x1="0%" y1="0%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#ffffff" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Hexagonal / Diamond Architectural Shield */}
          <rect
            x="4"
            y="4"
            width="92"
            height="92"
            rx="22"
            fill="url(#frameGrad)"
            stroke="#60a5fa"
            strokeWidth="2.5"
            strokeOpacity="0.4"
          />

          {/* Frosted Glass Geometric Inner Backdrop */}
          <rect
            x="8"
            y="8"
            width="84"
            height="84"
            rx="18"
            fill="#0f172a"
            fillOpacity="0.6"
          />

          {/* Architectural "W" Glass Geometric Facets */}
          {/* Left Wing Outer Pillar */}
          <path
            d="M 22 24 L 32 24 L 40 76 L 30 76 Z"
            fill="url(#glassFacet1)"
            opacity="0.95"
          />

          {/* Left Inner Diag */}
          <path
            d="M 32 24 L 42 24 L 50 62 L 40 76 Z"
            fill="url(#glassFacet2)"
          />

          {/* Right Inner Diag */}
          <path
            d="M 58 24 L 68 24 L 60 76 L 50 62 Z"
            fill="url(#centerGlass)"
          />

          {/* Right Wing Outer Pillar */}
          <path
            d="M 68 24 L 78 24 L 70 76 L 60 76 Z"
            fill="url(#glassFacet1)"
            opacity="0.95"
          />

          {/* Central Architectural Glass Diamond Peak */}
          <polygon
            points="50,22 58,40 50,56 42,40"
            fill="#38bdf8"
            stroke="#e0f2fe"
            strokeWidth="1.5"
          />

          {/* Diagonal Glass Reflection Sheen */}
          <path
            d="M 12 16 L 84 16 L 50 84 Z"
            fill="url(#specularGlint)"
            opacity="0.25"
          />

          {/* Polished Glass Structural Dots */}
          <circle cx="27" cy="24" r="2.5" fill="#bae6fd" />
          <circle cx="73" cy="24" r="2.5" fill="#bae6fd" />
          <circle cx="50" cy="22" r="2.5" fill="#ffffff" />
        </svg>
      </div>

      {/* --- Brand Wordmark --- */}
      {variant === "full" && (
        <div className="flex flex-col leading-tight">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-black font-sans uppercase ${textSizeClasses} ${dark ? "text-white" : "text-gray-900"
                }`}
            >
              Wazir
            </span>
            {/* <span className="font-semibold text-blue-600 uppercase text-xs px-1.5 py-0.5 rounded bg-blue-50 border border-blue-200/60 dark:bg-blue-900/40 dark:border-blue-700">
              Pro
            </span> */}
          </div>
          <span
            className={`font-bold uppercase ${subtextSizeClasses} ${dark ? "text-blue-300" : "text-blue-600"
              }`}
          >
            Glass & Aluminium
          </span>
        </div>
      )}
    </div>
  );
}
export default Logo;
