import React from "react";

export function ShopeeIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <rect x="3" y="9" width="34" height="29" rx="7" fill="#EE4D2D" />
      <path d="M14 12V9A6 6 0 0126 9V12" stroke="#EE4D2D" strokeWidth="4" strokeLinecap="round" />
      <path d="M14 12V9A6 6 0 0126 9V12" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
      {/* S shape on shopping bag */}
      <path
        d="M24.5 19.5C24.5 18 23 17 20 17C17 17 15.5 18.2 15.5 19.8C15.5 22.5 24.5 21.5 24.5 24.2C24.5 26 23 27 20 27C17 27 15.5 25.8 15.5 24"
        stroke="white"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      {/* Sparkles */}
      <circle cx="34" cy="7" r="1.5" fill="#EE4D2D" />
      <path d="M35 12L36 13L35 14L34 13Z" fill="#FF8A65" />
    </svg>
  );
}

export function LazadaIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <path
        d="M20 34L6.5 23.2C2.5 19.5 2.5 13 7 9C11.5 5 17.5 7 20 11.2C22.5 7 28.5 5 33 9C37.5 13 37.5 19.5 33.5 23.2L20 34Z"
        fill="url(#lazada-grad-v2)"
      />
      <path
        d="M20 30L9 21.2C5.8 18 5.8 13 9.5 9.8C13 6.5 18 8 20 11.2C22 8 27 6.5 30.5 9.8C34.2 13 34.2 18 31 21.2L20 30Z"
        fill="url(#lazada-inner-grad)"
        opacity="0.9"
      />
      <defs>
        <linearGradient id="lazada-grad-v2" x1="6" y1="6" x2="34" y2="34" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF7A00" />
          <stop offset="0.35" stopColor="#FF007A" />
          <stop offset="0.7" stopColor="#9800FF" />
          <stop offset="1" stopColor="#0F146D" />
        </linearGradient>
        <linearGradient id="lazada-inner-grad" x1="8" y1="8" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF9E00" />
          <stop offset="0.5" stopColor="#FF2E93" />
          <stop offset="1" stopColor="#1A208C" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function TikTokIcon({ className = "w-5 h-5", size }: { className?: string; size?: number }) {
  const style = size ? { width: size, height: size } : undefined;
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
      <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 1 1-2.901-2.9 2.884 2.884 0 0 1 1.02.193v-3.5a6.376 6.376 0 0 0-1.02-.084 6.34 6.34 0 1 0 6.34 6.34V9a8.214 8.214 0 0 0 4.776 1.524V7.079a4.843 4.843 0 0 1-1.000-.393z" />
    </svg>
  );
}

export function LineIcon({ className = "w-5 h-5", size }: { className?: string; size?: number }) {
  const style = size ? { width: size, height: size } : undefined;
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} style={style}>
      {/* LINE Speech Bubble */}
      <path
        d="M21.5 10.5C21.5 5.8 17.2 2 12 2C6.8 2 2.5 5.8 2.5 10.5C2.5 14.7 6.3 18.2 11.5 18.8C11.8 18.9 12.3 19 12.4 19.3C12.5 19.6 12.5 20 12.4 20.3C12.3 20.7 12.1 21.8 12.1 22.1C12 22.7 12.3 22.7 12.6 22.5C12.9 22.3 16.5 20.2 18 18.5C20.2 17.4 21.5 14.2 21.5 10.5Z"
        fill="currentColor"
      />
      {/* LINE text cutout */}
      <path
        d="M6.86 12.5h2.38v-.76H7.62V8.42H6.86v4.08zm3.28-4.08h.76v4.08h-.76V8.42zm3.93 0h-.76v2.54l-1.68-2.54h-.75v4.08h.76V9.96l1.68 2.54h.75V8.42zm3.73 0h-2.38v4.08h2.38v-.76h-1.62v-.9h1.54v-.76h-1.54v-.9h1.62v-.76z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function Lemon8Icon({ className = "w-5 h-5", size }: { className?: string; size?: number }) {
  const style = size ? { width: size, height: size } : undefined;
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} style={style}>
      {/* Lemon8 outer shape */}
      <path
        d="M12 21.5C16.6944 21.5 20.5 17.6944 20.5 13C20.5 8.30558 16.6944 4.5 12 4.5C7.30558 4.5 3.5 8.30558 3.5 13C3.5 17.6944 7.30558 21.5 12 21.5Z"
        fill="currentColor"
      />
      {/* Lemon leaf */}
      <path
        d="M12 4.5C13.5 2.2 16.2 1.8 17.8 2.3C17.8 4.3 15.6 6 13.5 5.3L12 4.5Z"
        fill="currentColor"
        opacity="0.85"
      />
      {/* Number 8 inside in white cutout */}
      <circle cx="12" cy="10.2" r="2.1" stroke="#FFFFFF" strokeWidth="1.8" fill="none" />
      <circle cx="12" cy="15" r="2.6" stroke="#FFFFFF" strokeWidth="1.8" fill="none" />
    </svg>
  );
}

export function OfficialStoreIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <path d="M8 16V31C8 32.7 9.3 34 11 34H29C30.7 34 32 32.7 32 31V16" stroke="#EC5F92" strokeWidth="3.2" strokeLinecap="round" />
      <path
        d="M5 16C5 13.5 7.5 12 10 12C12.5 12 13.5 14.5 15 14.5C16.5 14.5 17.5 12 20 12C22.5 12 23.5 14.5 25 14.5C26.5 14.5 27.5 12 30 12C32.5 12 35 13.5 35 16"
        fill="#FFE4EF"
        stroke="#EC5F92"
        strokeWidth="2.8"
        strokeLinejoin="round"
      />
      <path
        d="M20 22C18.5 20.5 16 20.5 16 22.5C16 24.5 20 27.5 20 27.5C20 27.5 24 24.5 24 22.5C24 20.5 21.5 20.5 20 22Z"
        fill="#EC5F92"
      />
    </svg>
  );
}

export function CuteBowRibbon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className}>
      {/* Left & right ribbon tails */}
      <path d="M12 18L7 27C6.5 28 8 29 9 28L14 20" stroke="#F472B6" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M20 18L25 27C25.5 28 24 29 23 28L18 20" stroke="#F472B6" strokeWidth="2.5" strokeLinecap="round" />
      {/* Left loop */}
      <path
        d="M15 15C11.5 9.5 4.5 10.5 5.5 14.8C6.5 18.8 13 16 15 15Z"
        fill="#FFE4F1"
        stroke="#F472B6"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Right loop */}
      <path
        d="M17 15C20.5 9.5 27.5 10.5 26.5 14.8C25.5 18.8 19 16 17 15Z"
        fill="#FFE4F1"
        stroke="#F472B6"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Center knot */}
      <rect x="13.5" y="13" width="5" height="4.5" rx="2" fill="#EC5F92" stroke="#F472B6" strokeWidth="1.5" />
    </svg>
  );
}
