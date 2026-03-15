import React from 'react';
import { ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* SECTION 1 – Soft Disclaimer Card */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-6 text-center">
            <p className="text-slate-500 text-sm leading-relaxed">
              For educational purposes only. Mutual fund investments are subject to market risks. 
              Returns are not guaranteed and projections are based on assumed annual growth rates.
            </p>
          </div>
        </div>

        {/* SECTION 2 – Educational References */}
        <div className="text-center mb-16">
          <h3 className="text-slate-400 font-semibold text-sm uppercase tracking-wider mb-6">
            Educational References
          </h3>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
            <a 
              href="https://www.amfiindia.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-indigo-400 text-sm flex items-center gap-1.5 transition-colors"
            >
              Association of Mutual Funds in India (AMFI)
              <ExternalLink className="w-3 h-3" />
            </a>
            <a 
              href="https://www.sebi.gov.in/sebiweb/other/OtherAction.do?doInvestorLearning=yes" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-indigo-400 text-sm flex items-center gap-1.5 transition-colors"
            >
              SEBI Investor Education
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* SECTION 3 – Bottom Bar */}
        <div className="pt-8 border-t border-slate-900/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-600 text-xs">
            © 2026 SIP Edu. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-slate-700 text-xs font-medium uppercase tracking-widest">
              Built for Investor Awareness
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
