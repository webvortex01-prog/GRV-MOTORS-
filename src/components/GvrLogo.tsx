import React from 'react';

interface GvrLogoProps {
  className?: string;
  showPhone?: boolean;
  variant?: 'full' | 'compact' | 'horizontal';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const GvrLogo: React.FC<GvrLogoProps> = ({
  className = '',
  showPhone = true,
  variant = 'full',
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'h-10',
    md: 'h-14',
    lg: 'h-20',
    xl: 'h-28',
  };

  if (variant === 'compact') {
    return (
      <div className={`inline-flex items-center gap-2.5 ${className}`}>
        <svg
          viewBox="0 0 120 70"
          className={`${sizeClasses[size]} w-auto drop-shadow-md select-none`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="gvrCompactGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0047FF" />
              <stop offset="50%" stopColor="#0077FE" />
              <stop offset="100%" stopColor="#00E5FF" />
            </linearGradient>
            <linearGradient id="carLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0047FF" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#00D2FF" />
              <stop offset="100%" stopColor="#FFFFFF" />
            </linearGradient>
          </defs>

          {/* Car profile outline */}
          <path
            d="M 35 24 C 55 12, 80 12, 105 22 C 114 26, 118 32, 116 38 C 110 39, 106 38, 102 34 C 98 29, 86 28, 80 32 C 70 33, 50 34, 38 35"
            stroke="url(#carLineGrad)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Headlight flare */}
          <ellipse cx="106" cy="30" rx="4" ry="1.5" fill="#38BDF8" />

          {/* GVR stylized acronym */}
          <text
            x="4"
            y="42"
            fontFamily="Outfit, system-ui, sans-serif"
            fontWeight="900"
            fontStyle="italic"
            fontSize="32"
            letterSpacing="-1.5"
            fill="url(#gvrCompactGrad)"
            stroke="#FFFFFF"
            strokeWidth="0.8"
          >
            GVR
          </text>
          {/* GOMES text */}
          <text
            x="5"
            y="60"
            fontFamily="Outfit, system-ui, sans-serif"
            fontWeight="800"
            fontSize="18"
            letterSpacing="2"
            fill="#0284C7"
          >
            GOMES
          </text>
        </svg>
        <div className="flex flex-col">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-sky-400">
            Veículos
          </span>
          <span className="text-[11px] font-mono font-medium text-slate-300">
            (66) 99677-7111
          </span>
        </div>
      </div>
    );
  }

  // Full fidelity logo matching user's image exactly
  return (
    <div className={`relative inline-block ${className}`}>
      <svg
        viewBox="0 0 540 320"
        className={`${sizeClasses[size]} w-auto max-w-full drop-shadow-xl select-none`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Metallic GVR Gradient */}
          <linearGradient id="gvrGrad" x1="0%" y1="0%" x2="100%" y2="80%">
            <stop offset="0%" stopColor="#0B3C9B" />
            <stop offset="30%" stopColor="#0256D8" />
            <stop offset="65%" stopColor="#0284FE" />
            <stop offset="90%" stopColor="#00D2FF" />
            <stop offset="100%" stopColor="#7AE5FF" />
          </linearGradient>

          {/* Bevel Stroke Gradient */}
          <linearGradient id="bevelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#7DD3FC" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0284C7" stopOpacity="0.4" />
          </linearGradient>

          {/* Car Swoosh Gradient */}
          <linearGradient id="carGrad" x1="10%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0284C7" />
            <stop offset="45%" stopColor="#00D2FF" />
            <stop offset="85%" stopColor="#FFFFFF" />
          </linearGradient>

          {/* Dark Royal Banner Gradient */}
          <linearGradient id="bannerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#003585" />
            <stop offset="50%" stopColor="#0263E0" />
            <stop offset="100%" stopColor="#003585" />
          </linearGradient>
        </defs>

        {/* Top Arc & Sports Car Silhouette */}
        <g id="car-silhouette">
          {/* Outer sweeping canopy stroke */}
          <path
            d="M 60 110 C 120 40, 240 25, 390 40 C 450 48, 500 70, 520 95"
            stroke="url(#carGrad)"
            strokeWidth="5"
            strokeLinecap="round"
          />

          {/* Car aerodynamic roofline */}
          <path
            d="M 215 95 C 265 65, 340 55, 415 78 C 450 90, 480 108, 505 130"
            stroke="url(#carGrad)"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Car hood and front fascia */}
          <path
            d="M 405 85 C 445 100, 475 118, 508 140 C 522 148, 526 156, 520 162 C 500 166, 475 160, 458 152"
            stroke="url(#carGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Front wheel arch outline */}
          <path
            d="M 370 170 C 375 142, 405 138, 422 165"
            stroke="url(#carGrad)"
            strokeWidth="5"
            strokeLinecap="round"
          />

          {/* Wheel rim glow */}
          <ellipse cx="395" cy="170" rx="20" ry="14" fill="#0066FF" fillOpacity="0.4" />
          <ellipse cx="395" cy="170" rx="14" ry="10" fill="#00D2FF" fillOpacity="0.7" />

          {/* Modern Sharp LED Headlights */}
          <path
            d="M 460 138 L 495 144 L 468 150 Z"
            fill="#FFFFFF"
            filter="drop-shadow(0 0 6px #00D2FF)"
          />
          <path
            d="M 412 128 L 442 133 L 420 137 Z"
            fill="#38BDF8"
          />
          {/* Grille bar */}
          <line x1="480" y1="152" x2="520" y2="158" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
        </g>

        {/* Big Stylized "GVR" Logo */}
        <g id="gvr-text" filter="drop-shadow(0 6px 14px rgba(2, 132, 199, 0.4))">
          {/* G */}
          <path
            d="M 90 98 C 65 98, 42 110, 32 135 C 22 160, 30 190, 56 205 C 80 216, 120 214, 138 198 L 148 165 L 105 165 L 108 150 L 165 150 L 152 208 C 125 228, 70 230, 36 215 C 5 200, -6 158, 7 122 C 22 84, 58 75, 102 75 C 132 75, 158 84, 178 98 L 158 116 C 142 105, 120 98, 90 98 Z"
            fill="url(#gvrGrad)"
            stroke="url(#bevelGrad)"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* V */}
          <path
            d="M 188 78 L 228 78 L 265 180 L 315 78 L 355 78 L 285 224 L 245 224 Z"
            fill="url(#gvrGrad)"
            stroke="url(#bevelGrad)"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* R */}
          <path
            d="M 335 78 L 415 78 C 452 78, 475 92, 470 125 C 466 152, 442 165, 412 168 L 455 224 L 415 224 L 378 174 L 368 174 L 356 224 L 322 224 Z M 366 152 L 405 152 C 428 152, 438 144, 440 128 C 442 112, 432 102, 410 102 L 378 102 Z"
            fill="url(#gvrGrad)"
            stroke="url(#bevelGrad)"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
        </g>

        {/* Word: GOMES */}
        <text
          x="270"
          y="262"
          textAnchor="middle"
          fontFamily="Outfit, system-ui, sans-serif"
          fontWeight="900"
          fontStyle="italic"
          fontSize="56"
          letterSpacing="4"
          fill="url(#gvrGrad)"
          stroke="#FFFFFF"
          strokeWidth="1.2"
          filter="drop-shadow(0 2px 6px rgba(0, 50, 150, 0.4))"
        >
          GOMES
        </text>

        {/* Banner: // VEÍCULOS // */}
        <g id="veiculos-banner">
          {/* Left Double Slash */}
          <line x1="28" y1="298" x2="44" y2="276" stroke="#0077FE" strokeWidth="6" strokeLinecap="round" />
          <line x1="42" y1="298" x2="58" y2="276" stroke="#00D2FF" strokeWidth="6" strokeLinecap="round" />

          {/* Banner central plate */}
          <path
            d="M 68 274 L 472 274 L 460 300 L 56 300 Z"
            fill="url(#bannerGrad)"
            stroke="#00D2FF"
            strokeWidth="1"
          />

          {/* VEÍCULOS Text */}
          <text
            x="264"
            y="294"
            textAnchor="middle"
            fontFamily="Outfit, system-ui, sans-serif"
            fontWeight="900"
            fontSize="23"
            letterSpacing="8"
            fill="#FFFFFF"
          >
            VEÍCULOS
          </text>

          {/* Right Double Slash */}
          <line x1="482" y1="298" x2="498" y2="276" stroke="#00D2FF" strokeWidth="6" strokeLinecap="round" />
          <line x1="496" y1="298" x2="512" y2="276" stroke="#0077FE" strokeWidth="6" strokeLinecap="round" />
        </g>

        {/* WhatsApp & Phone Number */}
        {showPhone && (
          <g id="whatsapp-phone" transform="translate(0, 18)">
            {/* Left Accent Line */}
            <line x1="30" y1="310" x2="90" y2="310" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" />

            {/* WhatsApp Bubble Icon */}
            <g transform="translate(102, 296) scale(0.9)">
              <circle cx="16" cy="16" r="15" fill="#0066FF" stroke="#38BDF8" strokeWidth="1.5" />
              {/* Telephone receiver */}
              <path
                d="M 12 10 C 11.5 10, 10.5 11, 10.5 12 C 10.5 14, 13 18, 17 20.5 C 18 21, 19 21, 19.5 20.5 L 21 19 C 21.5 18.5, 21.5 18, 20.8 17.6 L 19 16.5 C 18.5 16.2, 18 16.3, 17.6 16.8 L 17 17.5 C 15.5 16.7, 14.3 15.5, 13.5 14 L 14.2 13.4 C 14.7 13, 14.8 12.5, 14.5 12 L 13.4 10.2 C 13 9.5, 12.5 9.5, 12 10 Z"
                fill="#FFFFFF"
              />
            </g>

            {/* Phone Text */}
            <text
              x="270"
              y="320"
              textAnchor="middle"
              fontFamily="Outfit, system-ui, sans-serif"
              fontWeight="900"
              fontSize="28"
              letterSpacing="1"
              fill="#0A2558"
              stroke="#38BDF8"
              strokeWidth="0.8"
            >
              (66) 99677-7111
            </text>

            {/* Right Accent Line */}
            <line x1="450" y1="310" x2="510" y2="310" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        )}
      </svg>
    </div>
  );
};
