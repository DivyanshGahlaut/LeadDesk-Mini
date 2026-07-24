import React from 'react';
import { Users, Clock, CheckCircle2, Award } from 'lucide-react';

export default function StatsCards({ leads }) {
  const total = leads.length;
  const newLeads = leads.filter(l => l.status === 'New').length;
  const contacted = leads.filter(l => l.status === 'Contacted').length;
  const closed = leads.filter(l => l.status === 'Closed').length;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-8">
      {/* Total Leads */}
      <div className="apple-glass-card p-5 sm:p-6 rounded-3xl relative overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400">Total Leads</span>
          <div className="p-2.5 rounded-2xl bg-blue-500/15 text-blue-400 border border-blue-500/30">
            <Users className="w-4 h-4" />
          </div>
        </div>
        <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">{total}</div>
        <p className="text-xs text-slate-500 mt-1 font-medium">Stored in database</p>
      </div>

      {/* New Leads */}
      <div className="apple-glass-card p-5 sm:p-6 rounded-3xl relative overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-400">New Leads</span>
          <div className="p-2.5 rounded-2xl bg-amber-500/15 text-amber-400 border border-amber-500/30">
            <Clock className="w-4 h-4" />
          </div>
        </div>
        <div className="text-3xl sm:text-4xl font-extrabold text-amber-400 tracking-tight">{newLeads}</div>
        <p className="text-xs text-slate-500 mt-1 font-medium">Awaiting response</p>
      </div>

      {/* Contacted */}
      <div className="apple-glass-card p-5 sm:p-6 rounded-3xl relative overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-indigo-400">Contacted</span>
          <div className="p-2.5 rounded-2xl bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>
        <div className="text-3xl sm:text-4xl font-extrabold text-indigo-400 tracking-tight">{contacted}</div>
        <p className="text-xs text-slate-500 mt-1 font-medium">In active conversation</p>
      </div>

      {/* Closed */}
      <div className="apple-glass-card p-5 sm:p-6 rounded-3xl relative overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-400">Closed</span>
          <div className="p-2.5 rounded-2xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <Award className="w-4 h-4" />
          </div>
        </div>
        <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 tracking-tight">{closed}</div>
        <p className="text-xs text-slate-500 mt-1 font-medium">Converted or finalized</p>
      </div>
    </div>
  );
}
