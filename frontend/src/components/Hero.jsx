import React from 'react';
import { ArrowRight, CheckCircle2, Shield, Zap, Sparkles, Layers, Activity } from 'lucide-react';

export default function Hero({ onGetStarted }) {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-white/5">
      {/* 3D Specular Illumination Orbs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-blue-600/20 via-indigo-600/15 to-purple-600/10 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse" />
      <div className="absolute top-1/4 right-10 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[90px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Apple Pills Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-white/15 text-slate-300 text-xs font-semibold mb-8 shadow-2xl backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span>Next-Generation Lead Engine & CRM</span>
        </div>

        {/* Hero Title - Apple Style Gradient */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
          <span className="apple-title-gradient">LeadDesk</span>{' '}
          <span className="apple-accent-gradient">Mini</span>
        </h1>

        {/* Subheading explicitly requested */}
        <p className="text-xl sm:text-3xl text-slate-200 font-bold mb-6 tracking-tight max-w-3xl mx-auto">
          Helping Businesses Build Better Websites
        </p>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-400 mb-10 leading-relaxed font-normal">
          Capture high-value website project leads, automate client qualification, and manage your pipeline with real-time JWT admin controls and SQLite persistence.
        </p>

        {/* 3D Metallic CTA Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={onGetStarted}
            className="w-full sm:w-auto px-8 py-4 text-base font-bold text-white apple-button-3d rounded-2xl flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Get Started</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>

        {/* 3D CRM Interactive Mockup Showcase */}
        <div className="relative max-w-4xl mx-auto perspective-1000">
          <div className="apple-glass-card rounded-3xl p-6 sm:p-8 rotate-3d-hover transform-3d border border-white/15 shadow-2xl relative overflow-hidden">
            {/* Top Bar of 3D Mockup */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-xs font-mono text-slate-400 font-semibold">leaddesk.crm.v1</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center gap-1">
                  <Activity className="w-3 h-3 animate-pulse" /> Live API Connected
                </span>
              </div>
            </div>

            {/* Floating 3D Lead Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
              {/* Card 1 */}
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 shadow-lg">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-bold text-sm text-white">Alex Rivera</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold badge-new">New</span>
                </div>
                <p className="text-xs text-blue-400 font-mono mb-2">alex@riveradesign.com</p>
                <div className="text-[11px] text-slate-400 bg-black/40 p-2 rounded-lg border border-white/5">
                  "$1000-$5000 • Ecommerce Redesign"
                </div>
              </div>

              {/* Card 2 */}
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 shadow-lg">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-bold text-sm text-white">Sarah Connor</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold badge-contacted">Contacted</span>
                </div>
                <p className="text-xs text-blue-400 font-mono mb-2">sarah@cyberdyne.org</p>
                <div className="text-[11px] text-slate-400 bg-black/40 p-2 rounded-lg border border-white/5">
                  "Above $5000 • Security Portal"
                </div>
              </div>

              {/* Card 3 */}
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 shadow-lg">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-bold text-sm text-white">Robert Davis</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold badge-closed">Closed</span>
                </div>
                <p className="text-xs text-blue-400 font-mono mb-2">robert@techcorp.io</p>
                <div className="text-[11px] text-slate-400 bg-black/40 p-2 rounded-lg border border-white/5">
                  "Under $1000 • Landing Page"
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
