import React from 'react';
import { FooterLockup } from './BrandLogos';
import { Github, Twitter, Mail, Linkedin, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-10 sm:py-14 text-sm text-gray-600">
      <div className="maxwell-container">
        
        {/* Top Footer Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-gray-100">
          
          {/* Footer Sub-Lockup */}
          <FooterLockup />

          {/* Social & Contact Links */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-mono text-gray-700 w-full md:w-auto">
            
            <a
              href="mailto:maxwell.publication@outlook.com"
              className="inline-flex items-center gap-1.5 hover:text-purple-700 transition-colors font-medium text-gray-800"
            >
              <Mail size={15} className="text-purple-600 shrink-0" />
              <span>maxwell.publication@outlook.com</span>
            </a>

            <a
              href="https://www.linkedin.com/in/techharva/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-purple-700 transition-colors font-medium"
            >
              <Linkedin size={15} className="text-blue-600 shrink-0" />
              <span>LinkedIn</span>
              <ArrowUpRight size={12} className="text-gray-400" />
            </a>

            <a
              href="https://x.com/techharva"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-purple-700 transition-colors font-medium"
            >
              <Twitter size={15} className="text-gray-900 shrink-0" />
              <span>Twitter / X</span>
              <ArrowUpRight size={12} className="text-gray-400" />
            </a>

            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-purple-700 transition-colors font-medium"
            >
              <Github size={15} className="text-gray-900 shrink-0" />
              <span>GitHub</span>
              <ArrowUpRight size={12} className="text-gray-400" />
            </a>

          </div>
        </div>

        {/* Legal & Copyright Bottom Row */}
        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono text-gray-500">
          <div>
            © {new Date().getFullYear()} MaxWell. Inspired by James Clerk Maxwell.
          </div>
          <div>
            Built on open-source standards & GitHub infrastructure.
          </div>
        </div>

      </div>
    </footer>
  );
};
