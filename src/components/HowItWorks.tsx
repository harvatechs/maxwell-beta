import React, { useState } from 'react';
import { PenTool, GitPullRequest, GitCommit, MessageSquare, Sparkles, FileText, CheckCircle2, GitBranch, ShieldCheck, Layers, ArrowRight } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const steps = [
    {
      id: 0,
      title: 'Write',
      pillar: 'GitHub-Powered Publishing',
      icon: PenTool,
      tagline: 'Publishing as simple as filling out an e-filing wizard.',
      philosophicalReason: 'Minimalism as respect — no 1998 academic submission portals or PDF black-hole uploads.',
      description: 'Authors write in clean Markdown with live MathJax equations or link preprints. On submission, MaxWell commits the manuscript directly to a public repository in the author’s own GitHub account.',
    },
    {
      id: 1,
      title: 'Review',
      pillar: 'Open Peer Review Protocol',
      icon: GitPullRequest,
      tagline: 'Transparent, asynchronous peer review run in public.',
      philosophicalReason: 'Verifiability — peer review shouldn’t be an opaque editorial secret.',
      description: 'Peer review threads live as structured GitHub Issues in maxwell-hq/reviews. Vetted domain experts evaluate claims, discuss revisions, and issue verified status badges reflected live on the paper.',
    },
    {
      id: 2,
      title: 'Version',
      pillar: 'Version Control Lineage',
      icon: GitCommit,
      tagline: 'Every revision retains its full, immutable git blame.',
      philosophicalReason: 'Provenance — science evolves through iteration; every step must be inspectable.',
      description: 'Revisions, errata, and updated figures are pushed as commits. Readers can inspect exact line-by-line diffs across paper versions, ensuring complete historical integrity.',
    },
    {
      id: 3,
      title: 'Discuss',
      pillar: 'Community Idea Layer',
      icon: MessageSquare,
      tagline: 'Open discussion where code, data, and claims meet.',
      philosophicalReason: 'Unification — discussions belong beside the paper, not fragmented on social media.',
      description: 'Community members sign in with GitHub to annotate equations, ask clarification questions, or cite follow-up work directly alongside author-owned repositories.',
    }
  ];

  return (
    <section className="py-20 sm:py-28 bg-gray-50/80 border-b border-gray-200">
      <div className="maxwell-container">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100/80 border border-purple-200 text-xs font-mono font-bold text-purple-900 uppercase tracking-widest mb-4">
            <Layers size={14} className="text-purple-600" />
            <span>Core Mechanics</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4" style={{ color: '#1A1A1A' }}>
            How MaxWell Works
          </h2>
          <p className="text-base sm:text-lg text-gray-600 font-normal leading-relaxed" style={{ color: '#4A4A4A' }}>
            A four-step architecture that replaces journal bureaucracy with version-controlled transparency.
          </p>
        </div>

        {/* 4 Steps Navigation Rail */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {steps.map((step) => {
            const Icon = step.icon;
            const isActive = activeTab === step.id;
            return (
              <button
                key={step.id}
                onClick={() => setActiveTab(step.id)}
                className={`p-4 sm:p-5 rounded-2xl text-left transition-all relative border ${
                  isActive
                    ? 'bg-white border-purple-600 shadow-lg ring-2 ring-purple-600/20'
                    : 'bg-white/70 border-gray-200 hover:bg-white hover:border-gray-300 shadow-sm'
                }`}
              >
                {/* Active Indicator Bar */}
                {isActive && (
                  <div className="absolute top-0 left-4 right-4 h-1 bg-purple-600 rounded-b-md"></div>
                )}
                
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2.5 rounded-xl ${isActive ? 'bg-purple-600 text-white shadow-sm' : 'bg-gray-100 text-gray-600'}`}>
                    <Icon size={18} />
                  </div>
                  <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${isActive ? 'bg-purple-100 text-purple-900' : 'bg-gray-100 text-gray-500'}`}>
                    0{step.id + 1}
                  </span>
                </div>

                <h3 className="font-bold text-gray-900 text-base sm:text-lg mb-1">{step.title}</h3>
                <p className="text-xs text-gray-500 font-medium line-clamp-1">{step.pillar}</p>
              </button>
            );
          })}
        </div>

        {/* 3D Perspective Container */}
        <div className="perspective-1000">
          
          {/* Interactive Mockup Display Frame with 3D Paper Flip Animation */}
          <div 
            key={activeTab}
            className="bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden corner-fold-container relative animate-page-flip preserve-3d"
          >
            
            {/* Mockup Window Chrome */}
            <div className="bg-gray-900 text-white px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 border-b border-gray-800">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-2 font-mono text-xs text-gray-400 truncate max-w-[180px] sm:max-w-none">
                  maxwell.pub / p / adas-lab / unified-field-notes
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-purple-950/80 border border-purple-800 text-[11px] font-mono text-purple-300 flex items-center gap-1.5 shadow-sm">
                  <Sparkles size={12} className="text-purple-400" />
                  <span>Preview • In Development</span>
                </span>
              </div>
            </div>

            {/* Tab Details & Visual Simulation */}
            <div className="p-5 sm:p-8 md:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Left Column: Context & Philosophical Grounding */}
                <div className="lg:col-span-5 space-y-5">
                  <div className="inline-flex items-center gap-2 text-xs font-mono text-purple-900 uppercase font-bold bg-purple-100 px-3 py-1 rounded-md">
                    <span>Step 0{steps[activeTab].id + 1} — {steps[activeTab].title}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight leading-snug" style={{ color: '#1A1A1A' }}>
                    {steps[activeTab].tagline}
                  </h3>

                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-normal" style={{ color: '#4A4A4A' }}>
                    {steps[activeTab].description}
                  </p>

                  <div className="p-4 rounded-xl bg-purple-50 border border-purple-200/80 text-xs font-mono text-purple-900 space-y-1 shadow-inner">
                    <div className="font-bold uppercase tracking-wider text-[10px] text-purple-700">Philosophical Grounding</div>
                    <p className="leading-relaxed">{steps[activeTab].philosophicalReason}</p>
                  </div>
                </div>

                {/* Right Column: High-Fidelity Simulated Interface */}
                <div className="lg:col-span-7">
                  {activeTab === 0 && <MockupWrite />}
                  {activeTab === 1 && <MockupReview />}
                  {activeTab === 2 && <MockupVersion />}
                  {activeTab === 3 && <MockupDiscuss />}
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

/* --- High-Fidelity Simulated Interface Components --- */

const MockupWrite: React.FC = () => (
  <div className="bg-gray-950 text-gray-100 rounded-xl p-4 sm:p-6 font-mono text-xs space-y-4 border border-gray-800 shadow-2xl">
    <div className="flex items-center justify-between text-gray-400 border-b border-gray-800 pb-3">
      <span className="flex items-center gap-2 text-gray-200 font-semibold">
        <FileText size={15} className="text-purple-400" />
        <span>manuscript.md</span>
      </span>
      <span className="text-[10px] text-teal-300 bg-teal-950/90 px-2.5 py-1 rounded border border-teal-800 flex items-center gap-1 font-bold">
        <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse"></span>
        AUTO-SAVING TO GITHUB
      </span>
    </div>
    
    <div className="space-y-2 text-gray-300 text-[11px] leading-relaxed">
      <p className="text-purple-400 font-bold">---</p>
      <p><span className="text-gray-500">title:</span> "On the Unification of Electrodynamics and Field Equations"</p>
      <p><span className="text-gray-500">authors:</span> ["Ada Lovelace", "J. C. Maxwell"]</p>
      <p><span className="text-gray-500">license:</span> "CC-BY-4.0"</p>
      <p><span className="text-gray-500">repo:</span> "github.com/adas-lab/maxwell-papers"</p>
      <p className="text-purple-400 font-bold">---</p>
      
      <p className="text-gray-100 font-bold text-xs pt-2"># Abstract</p>
      <p className="text-gray-400 leading-relaxed">
        We present a unified formulation showing that light, electricity, and magnetic induction originate from a single electromagnetic tensor F_μν...
      </p>
    </div>

    <div className="pt-3 border-t border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px]">
      <span className="text-gray-400 flex items-center gap-1.5">
        <GitBranch size={13} className="text-purple-400" />
        <span>Target: adas-lab/maxwell-papers (main)</span>
      </span>
      <button className="bg-purple-600 hover:bg-purple-500 text-white px-3.5 py-1.5 rounded font-sans font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors shadow">
        <span>Publish to GitHub</span>
        <ArrowRight size={13} />
      </button>
    </div>
  </div>
);

const MockupReview: React.FC = () => (
  <div className="bg-white rounded-xl p-4 sm:p-6 text-xs space-y-4 border border-gray-200 shadow-md text-gray-800">
    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-3">
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-teal-500"></span>
        <span className="font-bold text-gray-900 text-sm">Issue #42 — Peer Review Protocol</span>
      </div>
      <span className="px-2.5 py-1 rounded-full bg-teal-50 text-teal-800 font-bold border border-teal-200 text-[10px] flex items-center gap-1">
        <CheckCircle2 size={12} className="text-teal-600" />
        <span>status:community-verified</span>
      </span>
    </div>

    {/* Comment 1 */}
    <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200/80 space-y-2">
      <div className="flex flex-wrap items-center justify-between gap-2 text-[11px]">
        <span className="font-bold text-gray-900 flex items-center gap-1.5">
          <ShieldCheck size={14} className="text-purple-600" />
          @dr-chen (Founding Expert / Theoretical Physics)
        </span>
        <span className="text-gray-400 font-mono text-[10px]">2 days ago</span>
      </div>
      <p className="text-gray-700 leading-relaxed text-[11px]">
        "Equation (4) holds under boundary conditions lim(r → ∞) A_μ = 0. Derivation is mathematically sound and verified against independent numerical simulation."
      </p>
      <div className="flex items-center gap-2 pt-1">
        <span className="px-2 py-0.5 rounded bg-green-100 text-green-800 font-mono text-[10px] font-bold">
          Recommendation: Accept with Minor Notes
        </span>
      </div>
    </div>

    {/* Comment 2 */}
    <div className="p-3.5 bg-purple-50/60 rounded-xl border border-purple-100 space-y-2">
      <div className="flex flex-wrap items-center justify-between gap-2 text-[11px]">
        <span className="font-bold text-purple-950">@ada-lovelace (Author)</span>
        <span className="text-purple-700 font-mono text-[10px]">Commit 4f2a9b updated</span>
      </div>
      <p className="text-gray-700 leading-relaxed text-[11px]">
        "Added explicit proof of boundary decay rate in Appendix B per @dr-chen's suggestion. Updated manuscript pushed to GitHub."
      </p>
    </div>
  </div>
);

const MockupVersion: React.FC = () => (
  <div className="bg-gray-950 text-gray-200 rounded-xl p-4 sm:p-6 font-mono text-xs space-y-4 border border-gray-800 shadow-2xl">
    <div className="flex items-center justify-between text-gray-400 border-b border-gray-800 pb-3">
      <span className="flex items-center gap-2 text-gray-200 font-semibold">
        <GitCommit size={15} className="text-purple-400" />
        <span>git log --oneline maxwell/main</span>
      </span>
      <span className="text-gray-400 text-[10px] bg-gray-900 px-2 py-0.5 rounded border border-gray-800">
        3 VERIFIED COMMITS
      </span>
    </div>

    <div className="space-y-2.5 text-[11px]">
      <div className="p-3 bg-purple-950/60 rounded-lg border border-purple-800/80 space-y-1">
        <div className="flex items-center justify-between text-purple-300">
          <span className="font-bold">8f9e12a (HEAD -&gt; main, tag: v1.2)</span>
          <span className="text-teal-400 text-[10px] font-bold">+42 -4</span>
        </div>
        <p className="text-gray-200 font-sans font-semibold text-xs">v1.2 — Address expert feedback on boundary decay</p>
        <p className="text-gray-400 text-[10px]">Verified by 2 reviewers • Signed GPG key • 14 mins ago</p>
      </div>

      <div className="p-3 bg-gray-900/60 rounded-lg border border-gray-800/80 space-y-1">
        <div className="flex items-center justify-between text-gray-400">
          <span className="font-bold">4f2a9b1 (tag: v1.1)</span>
          <span className="text-teal-400 text-[10px]">+18 -2</span>
        </div>
        <p className="text-gray-300 font-sans text-xs">v1.1 — Add high-resolution vector figures for tensor field</p>
        <p className="text-gray-500 text-[10px]">1 day ago</p>
      </div>

      <div className="p-3 bg-gray-900/40 rounded-lg border border-gray-800/60 space-y-1">
        <div className="flex items-center justify-between text-gray-400">
          <span className="font-bold">1a2b3c4 (tag: v1.0)</span>
          <span className="text-teal-400 text-[10px]">+320 -0</span>
        </div>
        <p className="text-gray-300 font-sans text-xs">v1.0 — Initial preprint release on MaxWell</p>
        <p className="text-gray-500 text-[10px]">3 days ago</p>
      </div>
    </div>
  </div>
);

const MockupDiscuss: React.FC = () => (
  <div className="bg-white rounded-xl p-4 sm:p-6 text-xs space-y-4 border border-gray-200 shadow-md">
    <div className="flex items-center justify-between border-b border-gray-100 pb-3">
      <span className="font-bold text-gray-900 text-sm">Community Discussion & Annotations</span>
      <span className="text-xs text-purple-700 font-bold bg-purple-50 px-2.5 py-0.5 rounded border border-purple-200">
        12 Active Annotations
      </span>
    </div>

    <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
      <div className="flex items-center justify-between">
        <span className="font-semibold text-gray-900">Annotation on Line 142 (Theorem 2)</span>
        <span className="text-gray-500 text-[10px] font-mono">by @quantum-dev</span>
      </div>
      <p className="text-gray-700 text-[11px] leading-relaxed">
        "Has anyone attempted compiling the Julia benchmark notebook in repo directory <code className="bg-gray-200 px-1 py-0.5 rounded font-mono text-[10px]">/benchmarks/field_sim.jl</code>? Results match theorem to 6 decimal places!"
      </p>
      <div className="flex items-center gap-4 text-[11px] text-gray-600 pt-1 border-t border-gray-200/60">
        <button className="text-purple-700 font-bold flex items-center gap-1 hover:underline">
          <span>▲ 24 Upvotes</span>
        </button>
        <button className="text-gray-600 font-medium hover:text-purple-700">
          Reply (3 replies)
        </button>
      </div>
    </div>
  </div>
);
