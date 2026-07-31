import React from 'react';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

interface FoundingExpertsProps {
  onOpenModal: () => void;
}

export const FoundingExperts: React.FC<FoundingExpertsProps> = ({ onOpenModal }) => {
  return (
    <section id="founding-experts" className="py-20 bg-purple-50/50 border-b border-purple-100/60 relative">
      <div className="maxwell-container">
        <div className="bg-white border border-purple-200 rounded-3xl p-8 sm:p-12 shadow-sm corner-fold-container relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-800 font-mono text-xs font-bold uppercase tracking-wider">
                <Sparkles size={14} className="text-purple-600" />
                <span>Founding Expert Program</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight" style={{ color: '#1A1A1A' }}>
                Shape the future of open peer review.
              </h2>

              <p className="text-base sm:text-lg text-gray-700 leading-relaxed max-w-2xl" style={{ color: '#4A4A4A' }}>
                Peer review quality on day one determines whether <code className="font-mono text-xs bg-purple-50 px-2 py-0.5 rounded text-purple-900 border border-purple-200">status:community-verified</code> ever means anything. We are selecting a inaugural cohort of 50 Founding Experts across mathematics, physics, computer science, and life sciences to establish the open review protocol.
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-gray-600 pt-2">
                <span className="flex items-center gap-1.5 text-purple-900 font-medium">
                  <CheckCircle2 size={15} className="text-purple-600" /> Public Review Credit
                </span>
                <span className="flex items-center gap-1.5 text-purple-900 font-medium">
                  <CheckCircle2 size={15} className="text-purple-600" /> Verified Expert Badge
                </span>
                <span className="flex items-center gap-1.5 text-purple-900 font-medium">
                  <CheckCircle2 size={15} className="text-purple-600" /> Direct Protocol Input
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center">
              <button
                onClick={onOpenModal}
                className="btn-primary py-3.5 px-6 text-sm w-full sm:w-auto shadow-md"
              >
                <span>Apply as Founding Expert</span>
                <ArrowRight size={16} />
              </button>
              <span className="text-[11px] font-mono text-gray-500 mt-2">
                Applications reviewed on a rolling basis.
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
