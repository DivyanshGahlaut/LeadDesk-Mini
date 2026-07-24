import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { isAuthenticated, logoutAdmin } from './api/client';

export default function App() {
  const [currentView, setCurrentView] = useState(() => {
    const path = window.location.pathname;
    if (path === '/admin') return 'admin';
    if (path === '/login') return 'login';
    return 'home';
  });

  const handleLogout = () => {
    logoutAdmin();
    setCurrentView('login');
  };

  const handleLoginSuccess = () => {
    setCurrentView('admin');
  };

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/admin') setCurrentView('admin');
      else if (path === '/login') setCurrentView('login');
      else setCurrentView('home');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (view) => {
    setCurrentView(view);
    const path = view === 'admin' ? '/admin' : view === 'login' ? '/login' : '/';
    window.history.pushState({}, '', path);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#020408] text-slate-100 selection:bg-blue-600 selection:text-white">
      {currentView !== 'login' && (
        <Navbar
          currentView={currentView}
          setCurrentView={navigateTo}
          onLogout={handleLogout}
        />
      )}

      <main className="flex-1">
        {currentView === 'home' && (
          <Home onLeadSubmitted={() => {}} />
        )}
        {currentView === 'login' && (
          <Login
            onLoginSuccess={handleLoginSuccess}
            onGoHome={() => navigateTo('home')}
          />
        )}
        {currentView === 'admin' && (
          <Dashboard
            onLogout={handleLogout}
            setCurrentView={navigateTo}
          />
        )}
      </main>

      {currentView !== 'login' && <Footer />}
    </div>
  );
}
