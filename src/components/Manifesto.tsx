import React from 'react';
import { Quote } from 'lucide-react';

export const Manifesto: React.FC = () => {
  return (
    <section className="py-24 bg-white border-t border-b border-gray-100 relative">
      <div className="maxwell-container">
        
        {/* Section Header Tag */}
        <div className="flex items-center gap-2 mb-10">
          <span className="h-px w-8 bg-purple-600"></span>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-purple-700">
            Philosophical Core
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Main Manifesto Copy */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Serif Display Pull-Quote */}
            <div className="relative pl-6 border-l-2 border-purple-600">
              <Quote size={28} className="text-purple-200 absolute -top-3 -left-3.5 fill-purple-100" />
              <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl text-gray-900 leading-snug font-normal italic">
                “James Clerk Maxwell showed that electricity, magnetism, and light were never separate phenomena — only separate descriptions of the same underlying truth. We believe the same is true of how research gets written, reviewed, and preserved.”
              </blockquote>
            </div>

            {/* Paragraph 1: Unification */}
            <div className="space-y-4 text-base sm:text-lg text-gray-700 leading-relaxed font-sans" style={{ color: '#4A4A4A' }}>
              <p>
                <strong className="text-gray-900 font-semibold">Unification over fragmentation.</strong> Today, scientific publishing forces researchers to partition their work across disparate systems: code lives on GitHub, raw datasets sit on institutional servers, preprints hide in PDF repositories, and peer review happens behind closed doors in proprietary editorial software. None of it is version-controlled as a single coherent object.
              </p>
              
              <p>
                MaxWell unifies these fragments into one continuous act. When you publish a paper on MaxWell, your text, raw data, computational figures, and review lineage inhabit the exact same object: a public, version-controlled repository on GitHub.
              </p>

              {/* Paragraph 2: Openness as Verifiability */}
              <p>
                <strong className="text-gray-900 font-semibold">Openness as a scientific value.</strong> Open science and open-source software share the exact same foundation: verifiability. A result you cannot inspect is not a result you can trust. A <code className="font-mono text-xs bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200">git blame</code> on a dataset and a peer review thread on an equation serve the exact same master — transparency of provenance.
              </p>

              {/* Paragraph 3: Minimalism & Precision */}
              <p>
                <strong className="text-gray-900 font-semibold">Minimalism as respect for time.</strong> Every administrative hurdle, paywall, and opaque editorial delays science. We reject hype adjectives and focus entirely on precision. MaxWell is not a social network or an ad platform — it is clean infrastructure built to accelerate human discovery.
              </p>
            </div>

          </div>

          {/* Side Illustration: SVG Origami Fold Construction Diagram */}
          <div className="lg:col-span-5 bg-gray-50 border border-gray-200 rounded-2xl p-6 sm:p-8 corner-fold-container relative">
            <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-purple-600"></div>
                <span className="font-mono text-xs uppercase font-bold text-gray-900">Form Follows Axiom</span>
              </div>
              <span className="font-mono text-[11px] text-gray-500">FIG 1.0 — ORIGAMI W-FOLD</span>
            </div>

            {/* SVG Construction Diagram */}
            <div className="relative flex justify-center items-center py-6 bg-white rounded-xl border border-gray-200/80 shadow-inner">
              <svg width="280" height="240" viewBox="0 0 280 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Background Grid Lines */}
                <pattern id="diagGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#F0F0F0" strokeWidth="0.8" />
                </pattern>
                <rect width="280" height="240" fill="url(#diagGrid)" />

                {/* Construction Axes */}
                <line x1="140" y1="20" x2="140" y2="220" stroke="#E5E5E5" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="20" y1="120" x2="260" y2="120" stroke="#E5E5E5" strokeWidth="1" strokeDasharray="4 4" />
                <circle cx="140" cy="120" r="90" stroke="#6C4FE0" strokeWidth="0.75" strokeDasharray="2 4" opacity="0.4" />

                {/* Origami Fold Planes (W-Shape) */}
                {/* Left Facet */}
                <polygon points="140,120 40,40 70,200" fill="#6C4FE0" fillOpacity="0.1" stroke="#6C4FE0" strokeWidth="1.5" />
                {/* Left Shadow Fold */}
                <polygon points="140,120 40,40 140,20" fill="#6C4FE0" fillOpacity="0.25" stroke="#6C4FE0" strokeWidth="1.5" strokeDasharray="3 3" />
                
                {/* Right Facet */}
                <polygon points="140,120 240,40 210,200" fill="#6C4FE0" fillOpacity="0.15" stroke="#6C4FE0" strokeWidth="1.5" />
                {/* Right Shadow Fold */}
                <polygon points="140,120 240,40 140,20" fill="#6C4FE0" fillOpacity="0.3" stroke="#6C4FE0" strokeWidth="1.5" strokeDasharray="3 3" />

                {/* Angle Annotations */}
                <path d="M 140,80 A 40 40 0 0 0 110,60" fill="none" stroke="#4ECDC4" strokeWidth="1.5" />
                <text x="100" y="55" fill="#36B0A7" fontSize="10" fontFamily="monospace" fontWeight="bold">α = 45°</text>

                <path d="M 140,80 A 40 40 0 0 1 170,60" fill="none" stroke="#6C4FE0" strokeWidth="1.5" />
                <text x="175" y="55" fill="#6C4FE0" fontSize="10" fontFamily="monospace" fontWeight="bold">β = 45°</text>

                {/* Nodes & Vector Labels */}
                <circle cx="140" cy="120" r="4" fill="#6C4FE0" />
                <text x="148" y="132" fill="#1A1A1A" fontSize="10" fontFamily="monospace" fontWeight="bold">V₀(0,0)</text>

                <circle cx="40" cy="40" r="3" fill="#1A1A1A" />
                <text x="15" y="35" fill="#4A4A4A" fontSize="9" fontFamily="monospace">P₁(x₁,y₁)</text>

                <circle cx="240" cy="40" r="3" fill="#1A1A1A" />
                <text x="235" y="35" fill="#4A4A4A" fontSize="9" fontFamily="monospace">P₂(x₂,y₂)</text>

                <circle cx="70" cy="200" r="3" fill="#4ECDC4" />
                <text x="40" y="215" fill="#36B0A7" fontSize="9" fontFamily="monospace">W-LEFT</text>

                <circle cx="210" cy="200" r="3" fill="#4ECDC4" />
                <text x="205" y="215" fill="#36B0A7" fontSize="9" fontFamily="monospace">W-RIGHT</text>
              </svg>
            </div>

            {/* Caption */}
            <div className="mt-4 text-xs text-gray-600 font-mono space-y-1">
              <div className="flex justify-between">
                <span>STRUCTURE:</span>
                <span className="text-gray-900 font-semibold">Origami Butterfly Manifold</span>
              </div>
              <div className="flex justify-between">
                <span>CONSTRAINTS:</span>
                <span className="text-gray-900 font-semibold">Zero Proprietary Storage</span>
              </div>
              <div className="flex justify-between">
                <span>PROVENANCE:</span>
                <span className="text-purple-700 font-semibold">Cryptographically Signed (git)</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
