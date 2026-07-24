import React from 'react';
import { Sparkles, LayoutDashboard, LogIn, LogOut, Command } from 'lucide-react';
import { isAuthenticated, getAdminEmail } from '../api/client';

export default function Navbar({ currentView, setCurrentView, onLogout }) {
  const isAuth = isAuthenticated();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#05070d]/70 backdrop-blur-xl transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo - 3D Apple Aesthetic */}
        <div 
          onClick={() => setCurrentView('home')}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 p-[1px] shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-[#0b0f19] rounded-[15px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-blue-400 group-hover:rotate-12 transition-transform" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight apple-title-gradient">
              LeadDesk
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-inner">
              Mini
            </span>
          </div>
        </div>

        {/* Apple Segmented Navigation */}
        <nav className="flex items-center space-x-2 bg-slate-900/60 p-1.5 rounded-full border border-white/10 shadow-inner backdrop-blur-md">
          <button
            onClick={() => setCurrentView('home')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 ${
              currentView === 'home'
                ? 'text-white bg-blue-600/90 shadow-md shadow-blue-600/40 border border-white/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Public Portal
          </button>

          {isAuth ? (
            <>
              <button
                onClick={() => setCurrentView('admin')}
                className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 flex items-center gap-1.5 ${
                  currentView === 'admin'
                    ? 'text-white bg-indigo-600/90 shadow-md shadow-indigo-600/40 border border-white/20'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Dashboard</span>
              </button>

              <button
                onClick={onLogout}
                className="px-3 py-1.5 text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-full transition-colors flex items-center gap-1"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          ) : (
            <button
              onClick={() => setCurrentView('login')}
              className="px-4 py-1.5 text-xs font-semibold text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-white/10 rounded-full transition-all flex items-center gap-1.5 shadow-sm"
            >
              <LogIn className="w-3.5 h-3.5 text-blue-400" />
              <span>Admin Login</span>
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
