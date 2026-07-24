import React from 'react';
import { ExternalLink, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-[#05070d]/90 backdrop-blur-xl py-10 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div>
          <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-extrabold tracking-tight apple-title-gradient">
              LeadDesk Mini
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            © {new Date().getFullYear()} LeadDesk Mini CRM. Production-grade full stack platform.
          </p>
        </div>

        {/* Mandatory Digital Heroes Verification Footer Credit Line */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/90 border border-white/15 text-xs font-semibold text-slate-400 shadow-xl backdrop-blur-md">
          <span className="text-slate-400">Verification Credit:</span>
          <a
            href="https://digitalheroesco.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 font-bold underline underline-offset-4 flex items-center gap-1 transition-colors"
          >
            Built for Digital Heroes Training Task
            <ExternalLink className="w-3 h-3 inline" />
          </a>
        </div>
      </div>
    </footer>
  );
}
