import React, { useState } from 'react';
import { OrigamiMarkWhite } from './BrandLogos';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { submitWaitlist } from '../lib/googleSheets';

export const FinalCTA: React.FC = () => {
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
      await submitWaitlist({ email, source: 'Final CTA Section' });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 sm:py-28 bg-[#1A1A1A] text-white relative overflow-hidden corner-fold-container corner-fold-dark">
      {/* Background Subtle Gradient & Grid Accent */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600 rounded-full blur-[140px]"></div>
      </div>

      <div className="maxwell-container relative z-10 text-center max-w-3xl mx-auto space-y-6 sm:space-y-8 px-4">
        
        {/* Reversed Logo Lockup */}
        <div className="inline-flex items-center gap-3 justify-center mb-1">
          <OrigamiMarkWhite size={32} />
          <span style={{ fontSize: '1.8rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
            Max<span style={{ color: '#6C4FE0' }}>W</span>ell
          </span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Be one of the first.
        </h2>

        {/* Subhead */}
        <p className="text-sm sm:text-lg text-gray-400 font-normal max-w-xl mx-auto leading-relaxed">
          Experience the platform where publishing a paper is as simple, fast, and satisfying as deploying a website.
        </p>

        {/* Form */}
        <div className="w-full max-w-md mx-auto pt-2">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="input-field py-3 text-sm bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-purple-500"
                aria-label="Email address for early access waitlist"
              />
              <button
                type="submit"
                disabled={loading}
                className="btn-primary py-3 px-6 text-sm whitespace-nowrap shadow-lg hover:bg-purple-600 disabled:opacity-75"
              >
                <span>{loading ? 'Submitting...' : 'Join Waitlist'}</span>
                <ArrowRight size={16} />
              </button>
            </form>
          ) : (
            <div className="p-4 rounded-xl bg-purple-950/90 border border-purple-800 text-purple-200 flex items-center justify-center gap-3 animate-fadeIn shadow-sm">
              <CheckCircle2 size={20} className="text-purple-400 shrink-0" />
              <span className="text-sm font-medium text-left">
                You're on the early access waitlist! We'll reach out soon.
              </span>
            </div>
          )}

          {error && (
            <p className="mt-2 text-xs text-red-400 font-medium text-left px-1">
              {error}
            </p>
          )}
        </div>

        <div className="pt-2 text-[11px] font-mono text-gray-400 tracking-wider uppercase">
          Open Access • GitHub Native • CC-BY-4.0 Default
        </div>

      </div>
    </section>
  );
};
