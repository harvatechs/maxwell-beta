import React, { useState } from 'react';
import { PrimaryHeroLockup } from './BrandLogos';
import { ArrowRight, CheckCircle2, GitBranch, ShieldCheck, Sparkles, Terminal } from 'lucide-react';
import { submitWaitlist } from '../lib/googleSheets';

interface HeroProps {
  onOpenExpertModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenExpertModal }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      await submitWaitlist({ email, source: 'Hero Section' });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen pt-24 sm:pt-32 pb-16 sm:pb-24 flex flex-col justify-center overflow-hidden bg-white math-grid-bg">
      {/* Background Physics Equations & Geometric Vector Ephemera */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-25">
        {/* Top Right Physics Equations */}
        <div className="absolute top-24 right-6 md:right-24 font-mono text-[11px] md:text-xs text-purple-900/60 leading-relaxed tracking-wider hidden sm:block">
          <p>∇ · E = ρ / ε₀</p>
          <p>∇ × E = -∂B / ∂t</p>
          <p>∇ · B = 0</p>
          <p>∇ × B = μ₀(J + ε₀ ∂E/∂t)</p>
          <p className="mt-1.5 text-purple-700/50">α = 45.0°  β = 90.0°</p>
        </div>

        {/* Top Left Geometric Construction Line */}
        <svg className="absolute top-16 left-6 w-48 h-48 sm:w-64 sm:h-64 text-gray-300 stroke-current hidden sm:block" fill="none" strokeWidth="0.75">
          <circle cx="100" cy="100" r="80" strokeDasharray="3 3" />
          <line x1="20" y1="100" x2="180" y2="100" />
          <line x1="100" y1="20" x2="100" y2="180" />
          <circle cx="100" cy="100" r="3" fill="#6C4FE0" />
          <circle cx="180" cy="100" r="2" fill="#4A4A4A" />
        </svg>

        {/* Bottom Right Paper Fold Axis Indicator */}
        <div className="absolute bottom-12 right-12 font-mono text-[10px] text-gray-400 border border-gray-200 p-2 rounded bg-white/50 backdrop-blur-sm hidden md:block">
          <span>VECTOR_SPACE: R³ | PLANE_FOLD: [0, 1, 1]</span>
        </div>
      </div>

      <div className="maxwell-container relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center px-4">
        
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-purple-50 border border-purple-200/80 mb-6 sm:mb-8 fold-in shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse"></span>
          <span className="text-[11px] sm:text-xs font-mono font-bold text-purple-900 tracking-wide uppercase">
            In Active Development • Launching 2026
          </span>
        </div>

        {/* Primary Lockup */}
        <div className="mb-6 sm:mb-8 fold-in" style={{ animationDelay: '50ms' }}>
          <PrimaryHeroLockup />
        </div>

        {/* Main Hero Headline */}
        <h1 
          className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.15] mb-5 sm:mb-6 fold-in"
          style={{ animationDelay: '100ms', color: '#1A1A1A' }}
        >
          Scientific publishing, <br className="hidden sm:inline" />
          <span className="text-purple-600 bg-clip-text text-transparent bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600">
            unified.
          </span>
        </h1>

        {/* Subhead with Em Dash */}
        <p 
          className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8 sm:mb-10 font-normal leading-relaxed fold-in"
          style={{ animationDelay: '150ms', color: '#4A4A4A' }}
        >
          MaxWell brings publishing, peer review, and version control together on the infrastructure researchers already trust — <span className="font-semibold text-gray-900">GitHub</span>.
        </p>

        {/* Interactive Waitlist Email Form */}
        <div className="w-full max-w-md mx-auto mb-6 fold-in" style={{ animationDelay: '200ms' }}>
          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="input-field shadow-sm text-sm py-3"
                aria-label="Email address for early access waitlist"
              />
              <button
                type="submit"
                disabled={loading}
                className="btn-primary py-3 px-6 text-sm whitespace-nowrap shadow-md disabled:opacity-75"
              >
                <span>{loading ? 'Submitting...' : 'Join Waitlist'}</span>
                <ArrowRight size={16} />
              </button>
            </form>
          ) : (
            <div className="p-4 rounded-xl bg-purple-50 border border-purple-200 text-purple-900 flex items-center justify-center gap-3 animate-fadeIn shadow-sm">
              <CheckCircle2 size={20} className="text-purple-600 shrink-0" />
              <div className="text-left text-sm font-medium">
                You’re on the early access waitlist! We’ve saved your details.
              </div>
            </div>
          )}

          {error && (
            <p className="mt-2 text-xs text-red-600 font-medium text-left px-1">
              {error}
            </p>
          )}
        </div>

        {/* Secondary CTA — Founding Expert Link */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm fold-in" style={{ animationDelay: '250ms' }}>
          <button
            onClick={onOpenExpertModal}
            className="inline-flex items-center gap-1.5 text-purple-700 hover:text-purple-900 font-semibold hover:underline underline-offset-4 transition-colors"
          >
            <Sparkles size={15} />
            <span>Apply to be a Founding Expert Reviewer</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Key Feature Pillars Quick Strip */}
        <div className="mt-14 sm:mt-16 pt-8 border-t border-gray-200/80 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left w-full max-w-3xl">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-purple-50 text-purple-700 shrink-0 mt-0.5">
              <GitBranch size={18} />
            </div>
            <div>
              <h4 className="text-xs font-mono uppercase font-bold text-gray-900 tracking-wider">GitHub Native</h4>
              <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">Zero proprietary database — your research lives in your own repository.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-teal-50 text-teal-700 shrink-0 mt-0.5">
              <ShieldCheck size={18} />
            </div>
            <div>
              <h4 className="text-xs font-mono uppercase font-bold text-gray-900 tracking-wider">Open Peer Review</h4>
              <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">Transparent, issue-based review threads verified by vetted experts.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-amber-50 text-amber-700 shrink-0 mt-0.5">
              <Terminal size={18} />
            </div>
            <div>
              <h4 className="text-xs font-mono uppercase font-bold text-gray-900 tracking-wider">Version Controlled</h4>
              <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">Every commit is part of the permanent, verifiable scientific record.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
