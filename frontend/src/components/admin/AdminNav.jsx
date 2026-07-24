import React from 'react';
import { ShieldCheck, LogOut, RefreshCw } from 'lucide-react';
import { getAdminEmail } from '../../api/client';

export default function AdminNav({ onLogout, onRefresh, isRefreshing }) {
  const adminEmail = getAdminEmail();

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Admin Lead Manager</h1>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5" /> JWT Authenticated
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">
          Logged in as <span className="text-blue-400 font-semibold font-mono">{adminEmail}</span>
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onRefresh}
          disabled={isRefreshing}
          className="px-4 py-2 text-xs font-bold text-slate-200 apple-button-secondary rounded-xl flex items-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>

        <button
          onClick={onLogout}
          className="px-4 py-2 text-xs font-bold text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-sm"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}
