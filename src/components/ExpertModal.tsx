import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { submitExpertApplication } from '../lib/googleSheets';

interface ExpertModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExpertModal: React.FC<ExpertModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    github: '',
    institution: '',
    field: 'Computer Science / AI',
    scholarUrl: '',
    motivation: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.github) {
      setError('Please fill in your name, email, and GitHub username.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      await submitExpertApplication(formData);
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white border border-gray-200 rounded-2xl max-w-lg w-full p-5 sm:p-8 relative shadow-2xl overflow-y-auto max-h-[92vh] corner-fold-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-900 rounded-lg transition-colors"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-2 text-purple-700 font-mono text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles size={14} />
              <span>Founding Expert Application</span>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-1.5">
              Join the Peer Review Protocol
            </h3>
            <p className="text-xs text-gray-600 mb-5 leading-relaxed">
              Founding Experts lead public review threads, verify scientific claims, and earn permanent protocol recognition on MaxWell.
            </p>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 text-xs font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5 text-left">
              <div>
                <label className="block text-xs font-mono font-bold text-gray-700 uppercase mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Dr. Ada Lovelace"
                  className="input-field py-2.5 text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono font-bold text-gray-700 uppercase mb-1">
                    Institutional Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ada@cambridge.ac.uk"
                    className="input-field py-2.5 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-bold text-gray-700 uppercase mb-1">
                    GitHub Username *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.github}
                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                    placeholder="@adalovelace"
                    className="input-field py-2.5 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono font-bold text-gray-700 uppercase mb-1">
                    Affiliation / Lab
                  </label>
                  <input
                    type="text"
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    placeholder="MIT / Independent Researcher"
                    className="input-field py-2.5 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-bold text-gray-700 uppercase mb-1">
                    Primary Field
                  </label>
                  <select
                    value={formData.field}
                    onChange={(e) => setFormData({ ...formData, field: e.target.value })}
                    className="input-field py-2.5 text-sm bg-white"
                  >
                    <option>Physics / Quantum Mechanics</option>
                    <option>Computer Science / AI</option>
                    <option>Mathematics & Logic</option>
                    <option>Life Sciences & Biology</option>
                    <option>Earth & Environmental Science</option>
                    <option>Social & Behavioral Science</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-gray-700 uppercase mb-1">
                  Google Scholar / ORCID / Website
                </label>
                <input
                  type="url"
                  value={formData.scholarUrl}
                  onChange={(e) => setFormData({ ...formData, scholarUrl: e.target.value })}
                  placeholder="https://scholar.google.com/citations..."
                  className="input-field py-2.5 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-gray-700 uppercase mb-1">
                  Research Expertise & Focus
                </label>
                <textarea
                  rows={2}
                  value={formData.motivation}
                  onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                  placeholder="Briefly describe your subfield specialization..."
                  className="input-field py-2 text-sm resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="btn-secondary py-2.5 px-4 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary py-2.5 px-5 text-xs shadow disabled:opacity-75"
                >
                  <span>{loading ? 'Submitting...' : 'Submit Application'}</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-8 space-y-4 animate-fadeIn">
            <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center mx-auto">
              <CheckCircle2 size={28} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Application Received</h3>
            <p className="text-xs text-gray-600 leading-relaxed max-w-sm mx-auto">
              Thank you, <strong className="text-gray-900">{formData.name}</strong>. Our founding team will review your profile and reach out via GitHub (<code className="font-mono text-purple-700">@{formData.github}</code>) prior to our 2026 early access opening.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="btn-primary py-2 px-6 text-xs mt-2"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
