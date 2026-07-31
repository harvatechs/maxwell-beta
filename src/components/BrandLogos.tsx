import React from 'react';

/**
 * High-Definition 3D MaxWell Origami Butterfly Vector Mark
 * Renders instantly with crisp 3D paper facets & gradients.
 */
export const OrigamiMark: React.FC<{ size?: number; className?: string }> = ({
  size = 32,
  className = ""
}) => {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`} style={{ width: `${size}px`, height: `${size}px` }}>
      {/* High-Definition 3D Vector SVG Mark */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm transition-transform duration-200 hover:scale-105"
      >
        <defs>
          {/* Gradients for 3D Origami Facets */}
          <linearGradient id="leftWingOuter" x1="15" y1="20" x2="50" y2="85" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ECE6FF" />
            <stop offset="60%" stopColor="#9E81FF" />
            <stop offset="100%" stopColor="#6C4FE0" />
          </linearGradient>
          
          <linearGradient id="leftWingInner" x1="50" y1="48" x2="15" y2="20" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#583CBD" />
            <stop offset="100%" stopColor="#7E60FE" />
          </linearGradient>

          <linearGradient id="rightWingOuter" x1="85" y1="20" x2="50" y2="85" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F5F0FF" />
            <stop offset="50%" stopColor="#B29CFF" />
            <stop offset="100%" stopColor="#6C4FE0" />
          </linearGradient>

          <linearGradient id="rightWingInner" x1="50" y1="48" x2="85" y2="20" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#482CA6" />
            <stop offset="100%" stopColor="#6C4FE0" />
          </linearGradient>
        </defs>

        {/* Outer Left Wing */}
        <polygon points="50,85 15,20 35,70" fill="url(#leftWingOuter)" />
        
        {/* Inner Left Fold Facet */}
        <polygon points="50,85 15,20 50,48" fill="url(#leftWingInner)" />

        {/* Outer Right Wing */}
        <polygon points="50,85 85,20 65,70" fill="url(#rightWingOuter)" />

        {/* Inner Right Fold Facet */}
        <polygon points="50,85 85,20 50,48" fill="url(#rightWingInner)" />

        {/* Center Paper Crease Highlight Line */}
        <line x1="50" y1="48" x2="50" y2="85" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.85" strokeLinecap="round" />
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
        <polygon points="50,85 15,20 35,70" fill="#FFFFFF" fillOpacity="0.95" />
        <polygon points="50,85 15,20 50,48" fill="#FFFFFF" fillOpacity="0.75" />
        <polygon points="50,85 85,20 65,70" fill="#FFFFFF" fillOpacity="1" />
        <polygon points="50,85 85,20 50,48" fill="#FFFFFF" fillOpacity="0.8" />
        <line x1="50" y1="48" x2="50" y2="85" stroke="#1A1A1A" strokeWidth="1.5" opacity="0.5" />
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
      <OrigamiMark size={30} />
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
        <OrigamiMark size={44} />
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
      {isDark ? <OrigamiMarkWhite size={26} /> : <OrigamiMark size={26} />}
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
