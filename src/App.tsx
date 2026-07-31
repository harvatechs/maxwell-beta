import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Manifesto } from './components/Manifesto';
import { HowItWorks } from './components/HowItWorks';
import { WhyGitHub } from './components/WhyGitHub';
import { FoundingExperts } from './components/FoundingExperts';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { ExpertModal } from './components/ExpertModal';

export const App: React.FC = () => {
  const [isExpertModalOpen, setIsExpertModalOpen] = useState(false);

  const scrollToWaitlist = () => {
    const heroInput = document.querySelector('input[type="email"]');
    if (heroInput) {
      heroInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      (heroInput as HTMLInputElement).focus();
    }
  };

  return (
    <div className="min-h-screen bg-white text-charcoal font-sans antialiased flex flex-col">
      {/* Navigation */}
      <Navbar 
        onOpenWaitlist={scrollToWaitlist}
        onOpenExpertModal={() => setIsExpertModalOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-grow">
        <Hero 
          onOpenExpertModal={() => setIsExpertModalOpen(true)}
        />
        
        <div className="crease-line"></div>
        
        <Manifesto />
        
        <div className="crease-line"></div>
        
        <HowItWorks />
        
        <WhyGitHub />
        
        <FoundingExperts 
          onOpenModal={() => setIsExpertModalOpen(true)}
        />
        
        <FinalCTA />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <ExpertModal 
        isOpen={isExpertModalOpen}
        onClose={() => setIsExpertModalOpen(false)}
      />
    </div>
  );
};
