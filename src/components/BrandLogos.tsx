import React from 'react';
import faviconImg from '../assets/favicon.png';

/**
 * Official 3D Origami Butterfly Logo Mark (Screenshot 2)
 * Rendered with imported asset to guarantee 100% path resolution on GitHub Pages & local dev.
 */
export const OrigamiMark: React.FC<{ size?: number; className?: string }> = ({
  size = 36,
  className = ""
}) => {
  return (
    <img
      src={faviconImg}
      alt="MaxWell 3D Origami Butterfly Logo Mark"
      width={size}
      height={size}
      className={`object-contain transition-transform duration-200 hover:scale-105 ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
    />
  );
};

/**
 * Monochrome / High-Contrast Mark for Dark Surfaces
 */
export const OrigamiMarkWhite: React.FC<{ size?: number; className?: string }> = ({
  size = 36,
  className = ""
}) => {
  return (
    <div className={`relative inline-block ${className}`} style={{ width: `${size}px`, height: `${size}px` }}>
      <img
        src={faviconImg}
        alt="MaxWell 3D Origami Butterfly Logo Mark White"
        width={size}
        height={size}
        className="object-contain brightness-150 contrast-125 filter drop-shadow(0 2px 8px rgba(255,255,255,0.3))"
        style={{ width: `${size}px`, height: `${size}px` }}
      />
    </div>
  );
};

/**
 * Navbar Logo Lockup: 3D Mark + Wordmark (MaxWell)
 */
export const NavbarLogo: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <OrigamiMark size={32} />
      <div className="flex items-baseline">
        <span style={{ fontSize: '1.45rem', fontWeight: 800, color: '#1A1A1A', letterSpacing: '-0.03em' }}>
          Max<span style={{ color: '#6C4FE0' }}>W</span>ell
        </span>
      </div>
    </div>
  );
};

/**
 * Primary Hero Lockup: 3D Mark + Wordmark + "— Powered by HarVa —"
 */
export const PrimaryHeroLockup: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`inline-flex flex-col items-center gap-2.5 ${className}`}>
      <div className="flex items-center gap-3">
        <OrigamiMark size={52} />
        <span style={{ fontSize: '2.8rem', fontWeight: 800, color: '#1A1A1A', letterSpacing: '-0.03em' }}>
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
