import React, { useState, useEffect } from 'react';
import AdminNav from '../components/admin/AdminNav';
import StatsCards from '../components/admin/StatsCards';
import LeadsTable from '../components/admin/LeadsTable';
import { getLeads, isAuthenticated } from '../api/client';

export default function Dashboard({ onLogout, setCurrentView }) {
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState('');

  const fetchLeads = async (silent = false) => {
    if (!silent) setIsLoading(true);
    else setIsRefreshing(true);
    setError('');

    try {
      const data = await getLeads();
      setLeads(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch leads from backend.');
      if (err.message.includes('validate credentials') || err.message.includes('Unauthorized')) {
        setCurrentView('login');
      }
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated()) {
      setCurrentView('login');
      return;
    }
    fetchLeads();
  }, []);

  const handleStatusChanged = (updatedLead) => {
    setLeads(prev =>
      prev.map(l => (l.id === updatedLead.id ? updatedLead : l))
    );
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      <AdminNav
        onLogout={onLogout}
        onRefresh={() => fetchLeads(true)}
        isRefreshing={isRefreshing}
      />

      {error && (
        <div className="p-4 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-sm">
          {error}
        </div>
      )}

      <StatsCards leads={leads} />

      <LeadsTable
        leads={leads}
        onStatusChanged={handleStatusChanged}
        isLoading={isLoading}
      />
    </div>
  );
}
