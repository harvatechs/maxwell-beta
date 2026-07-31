import React from 'react';

/**
 * High-Definition 3D MaxWell Origami Butterfly Vector Mark (Matching Screenshot 2 1:1)
 * Features soft lavender outer paper wings, rich 3D mountain-fold inner shadow, and crisp vector resolution.
 */
export const OrigamiMark: React.FC<{ size?: number; className?: string }> = ({
  size = 32,
  className = ""
}) => {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`} style={{ width: `${size}px`, height: `${size}px` }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm transition-transform duration-200 hover:scale-105"
      >
        <defs>
          <linearGradient id="leftWingGrad" x1="15" y1="23" x2="45" y2="70" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FAF7FF" />
            <stop offset="50%" stopColor="#E8DCFF" />
            <stop offset="100%" stopColor="#D4C2FF" />
          </linearGradient>

          <linearGradient id="rightWingGrad" x1="85" y1="23" x2="55" y2="70" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F5EEFF" />
            <stop offset="50%" stopColor="#DFCEFF" />
            <stop offset="100%" stopColor="#C9B4FF" />
          </linearGradient>

          <linearGradient id="innerLeftGrad" x1="50" y1="44" x2="34" y2="76" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#9B7EFF" />
            <stop offset="60%" stopColor="#7A56F0" />
            <stop offset="100%" stopColor="#603ED8" />
          </linearGradient>

          <linearGradient id="innerRightGrad" x1="50" y1="44" x2="66" y2="76" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#8868FF" />
            <stop offset="60%" stopColor="#6C4FE0" />
            <stop offset="100%" stopColor="#5232C7" />
          </linearGradient>

          <filter id="foldShadowFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#4A2BB8" floodOpacity="0.3" />
          </filter>
        </defs>

        <g filter="url(#foldShadowFilter)">
          {/* Outer Left Wing */}
          <path d="M 15 23 L 50 44 L 34 76 Z" fill="url(#leftWingGrad)" stroke="#C8B6FF" strokeWidth="0.75" strokeLinejoin="round" />
          
          {/* Outer Right Wing */}
          <path d="M 85 23 L 50 44 L 66 76 Z" fill="url(#rightWingGrad)" stroke="#C4B0FF" strokeWidth="0.75" strokeLinejoin="round" />

          {/* Inner Left Mountain Fold */}
          <path d="M 50 44 L 34 76 L 50 59 Z" fill="url(#innerLeftGrad)" stroke="#5B39D4" strokeWidth="0.5" strokeLinejoin="round" />

          {/* Inner Right Mountain Fold */}
          <path d="M 50 44 L 66 76 L 50 59 Z" fill="url(#innerRightGrad)" stroke="#4F2DC6" strokeWidth="0.5" strokeLinejoin="round" />

          {/* Center Crease Highlight Line */}
          <line x1="50" y1="44" x2="50" y2="59" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" opacity="0.9" />
        </g>
      </svg>
    </div>
  );
};

/**
 * Monochrome White Mark for Dark Surfaces
 */
export const OrigamiMarkWhite: React.FC<{ size?: number; className?: string }> = ({
  size = 32,
  className = ""
}) => {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`} style={{ width: `${size}px`, height: `${size}px` }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full filter drop-shadow(0 2px 4px rgba(255,255,255,0.25))"
      >
        <path d="M 15 23 L 50 44 L 34 76 Z" fill="#FFFFFF" fillOpacity="0.95" />
        <path d="M 85 23 L 50 44 L 66 76 Z" fill="#FFFFFF" fillOpacity="1" />
        <path d="M 50 44 L 34 76 L 50 59 Z" fill="#FFFFFF" fillOpacity="0.8" />
        <path d="M 50 44 L 66 76 L 50 59 Z" fill="#FFFFFF" fillOpacity="0.85" />
        <line x1="50" y1="44" x2="50" y2="59" stroke="#1A1A1A" strokeWidth="1" opacity="0.4" />
      </svg>
    </div>
  );
};

/**
 * Navbar Logo Lockup: Mark + Wordmark (MaxWell)
 */
export const NavbarLogo: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <OrigamiMark size={32} />
      <div className="flex items-baseline">
        <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1A1A1A', letterSpacing: '-0.03em' }}>
          Max<span style={{ color: '#6C4FE0' }}>W</span>ell
        </span>
      </div>
    </div>
  );
};

/**
 * Primary Hero Lockup: Mark + Wordmark + "— Powered by HarVa —"
 */
export const PrimaryHeroLockup: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`inline-flex flex-col items-center gap-2.5 ${className}`}>
      <div className="flex items-center gap-3">
        <OrigamiMark size={48} />
        <span style={{ fontSize: '2.6rem', fontWeight: 800, color: '#1A1A1A', letterSpacing: '-0.03em' }}>
          Max<span style={{ color: '#6C4FE0' }}>W</span>ell
        </span>
      </div>
      <div className="flex items-center gap-2 text-xs font-mono text-gray-500 uppercase tracking-widest">
        <span className="h-px w-6 bg-gray-300"></span>
        <span>Powered by HarVa</span>
        <span className="h-px w-6 bg-gray-300"></span>
      </div>
    </div>
  );
};

/**
 * Footer Sub-lockup (Horizontal)
 */
export const FooterLockup: React.FC<{ className?: string; isDark?: boolean }> = ({ className = "", isDark = false }) => {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {isDark ? <OrigamiMarkWhite size={28} /> : <OrigamiMark size={28} />}
      <div className="flex items-center gap-2">
        <span style={{ fontSize: '1.2rem', fontWeight: 800, color: isDark ? '#FFFFFF' : '#1A1A1A', letterSpacing: '-0.02em' }}>
          Max<span style={{ color: '#6C4FE0' }}>W</span>ell
        </span>
        <span className="text-xs font-mono text-gray-400">|</span>
        <span className={`text-xs font-mono tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          Powered by HarVa
        </span>
      </div>
    </div>
  );
};
