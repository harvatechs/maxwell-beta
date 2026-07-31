import React from 'react';
import { Database, ShieldCheck, GitBranch, Key, FileCheck } from 'lucide-react';

export const WhyGitHub: React.FC = () => {
  return (
    <section className="py-24 bg-white border-b border-gray-100">
      <div className="maxwell-container">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-100 text-xs font-mono font-bold text-purple-800 uppercase tracking-widest mb-4">
            Architecture & Credibility
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-4" style={{ color: '#1A1A1A' }}>
            Why GitHub-Native?
          </h2>
          <p className="text-lg text-gray-600 font-normal leading-relaxed" style={{ color: '#4A4A4A' }}>
            Traditional platforms host your papers in proprietary databases, charging subscriptions to view what you created. MaxWell flips the architecture: your research lives in your own GitHub repository.
          </p>
        </div>

        {/* Highlight Credibility Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-purple-900 text-white mb-16 relative overflow-hidden shadow-lg">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-purple-300 font-mono text-xs uppercase font-bold tracking-wider">
                <Database size={14} />
                <span>Zero Infrastructure Lock-in</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                “No proprietary database. Your research lives where your code lives.”
              </h3>
            </div>
            <div className="px-4 py-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-xs font-mono text-purple-200 shrink-0">
              CC-BY-4.0 Default License
            </div>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Pillar 1 */}
          <div className="p-6 rounded-2xl border border-gray-200 bg-gray-50/50 space-y-3 hover:border-purple-300 transition-colors corner-fold-container">
            <div className="p-2.5 rounded-lg bg-purple-100 text-purple-700 w-fit">
              <Key size={20} />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Author Ownership</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Every manuscript is committed directly to your public GitHub repository (<code className="font-mono text-xs bg-gray-200/80 px-1 py-0.5 rounded text-gray-800">github.com/{'{username}'}/maxwell-papers</code>). If MaxWell ever disappeared tomorrow, your research remains completely intact and accessible under open licensing.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="p-6 rounded-2xl border border-gray-200 bg-gray-50/50 space-y-3 hover:border-purple-300 transition-colors corner-fold-container">
            <div className="p-2.5 rounded-lg bg-teal-100 text-teal-800 w-fit">
              <ShieldCheck size={20} />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Transparent Review Protocol</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Peer reviews are conducted via structured GitHub Issues. Anyone can view who reviewed the paper, what critiques were raised, what changes were made, and how status badges (<code className="font-mono text-xs bg-gray-200/80 px-1 py-0.5 rounded text-gray-800">status:community-verified</code>) were earned.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="p-6 rounded-2xl border border-gray-200 bg-gray-50/50 space-y-3 hover:border-purple-300 transition-colors corner-fold-container">
            <div className="p-2.5 rounded-lg bg-amber-100 text-amber-800 w-fit">
              <GitBranch size={20} />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Immutable Git Lineage</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Research is not static. When equations are refined or datasets expanded, updates are committed as clean git releases. Readers can view exact line-by-line diffs across paper versions with complete cryptographic provenance.
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="p-6 rounded-2xl border border-gray-200 bg-gray-50/50 space-y-3 hover:border-purple-300 transition-colors corner-fold-container">
            <div className="p-2.5 rounded-lg bg-indigo-100 text-indigo-800 w-fit">
              <FileCheck size={20} />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Zero Reading Gateways</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Reading research on MaxWell is 100% open and un-gated forever. No sign-in wall, no institution login required to read, download, or cite work. Auth is only required when writing, reviewing, or annotating.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
