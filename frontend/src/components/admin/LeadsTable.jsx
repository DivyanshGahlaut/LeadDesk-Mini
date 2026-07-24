import React, { useState } from 'react';
import { Search, Filter, ChevronDown, X, Info, ExternalLink } from 'lucide-react';
import { updateLeadStatus } from '../../api/client';

export default function LeadsTable({ leads, onStatusChanged, isLoading }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [updatingId, setUpdatingId] = useState(null);
  const [selectedLead, setSelectedLead] = useState(null);

  const filteredLeads = leads.filter(lead => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.budget.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.status.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusUpdate = async (leadId, newStatus) => {
    setUpdatingId(leadId);
    try {
      const updated = await updateLeadStatus(leadId, newStatus);
      if (onStatusChanged) onStatusChanged(updated);
    } catch (err) {
      alert(err.message || 'Status update failed.');
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'New':
        return 'badge-new';
      case 'Contacted':
        return 'badge-contacted';
      case 'Closed':
        return 'badge-closed';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls Bar: Search & Status Filter */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-3xl apple-glass border border-white/10">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search leads by name, email, budget, message..."
            className="w-full pl-11 pr-10 py-3 rounded-2xl text-sm apple-input text-slate-100 placeholder-slate-400"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Status Quick Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 rounded-2xl text-xs font-bold apple-input bg-slate-900 text-slate-100 cursor-pointer"
          >
            <option value="ALL">All Statuses</option>
            <option value="New">New Only</option>
            <option value="Contacted">Contacted Only</option>
            <option value="Closed">Closed Only</option>
          </select>
        </div>
      </div>

      {/* Main Table / Cards Container */}
      <div className="apple-glass rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
        {isLoading ? (
          <div className="p-16 text-center text-slate-400">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-sm font-semibold">Fetching leads from SQLite database...</p>
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="p-16 text-center">
            <Info className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-200">No leads found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              {searchTerm
                ? `No lead matched "${searchTerm}". Try clearing your search term.`
                : 'No leads submitted yet. Submit a test inquiry on the public site!'}
            </p>
          </div>
        ) : (
          <>
            {/* Desktop / Tablet Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="bg-slate-950/80 text-[11px] font-extrabold uppercase tracking-widest text-slate-400 border-b border-white/10">
                  <tr>
                    <th className="px-6 py-4">Lead ID</th>
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4">Budget</th>
                    <th className="px-6 py-4">Message</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Created Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-white/[0.03] transition-colors">
                      <td className="px-6 py-4 font-mono text-xs text-blue-400 font-bold">
                        #{lead.id}
                      </td>
                      <td className="px-6 py-4 font-bold text-white">
                        {lead.name}
                      </td>
                      <td className="px-6 py-4 font-mono text-xs text-slate-300">
                        <a href={`mailto:${lead.email}`} className="hover:text-blue-400 underline underline-offset-2 decoration-slate-700">
                          {lead.email}
                        </a>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-900 text-slate-200 border border-white/10 shadow-sm">
                          {lead.budget}
                        </span>
                      </td>
                      <td className="px-6 py-4 max-w-xs">
                        <button
                          onClick={() => setSelectedLead(lead)}
                          className="text-left text-xs text-slate-400 hover:text-slate-200 line-clamp-2 transition-colors cursor-pointer"
                        >
                          {lead.message}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        {/* Apple 3D Status Dropdown */}
                        <div className="relative inline-block">
                          <select
                            value={lead.status}
                            disabled={updatingId === lead.id}
                            onChange={(e) => handleStatusUpdate(lead.id, e.target.value)}
                            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border appearance-none cursor-pointer pr-8 transition-all shadow-md ${getStatusBadgeClass(
                              lead.status
                            )} disabled:opacity-50`}
                          >
                            <option value="New" className="bg-slate-900 text-amber-400">New</option>
                            <option value="Contacted" className="bg-slate-900 text-indigo-400">Contacted</option>
                            <option value="Closed" className="bg-slate-900 text-emerald-400">Closed</option>
                          </select>
                          <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-80" />
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-400 whitespace-nowrap font-medium">
                        {formatDate(lead.created_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="block md:hidden divide-y divide-white/5">
              {filteredLeads.map((lead) => (
                <div key={lead.id} className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-blue-400">#{lead.id}</span>
                    <div className="relative">
                      <select
                        value={lead.status}
                        disabled={updatingId === lead.id}
                        onChange={(e) => handleStatusUpdate(lead.id, e.target.value)}
                        className={`px-3 py-1 rounded-xl text-xs font-bold border appearance-none pr-6 ${getStatusBadgeClass(lead.status)}`}
                      >
                        <option value="New" className="bg-slate-900 text-amber-400">New</option>
                        <option value="Contacted" className="bg-slate-900 text-indigo-400">Contacted</option>
                        <option value="Closed" className="bg-slate-900 text-emerald-400">Closed</option>
                      </select>
                      <ChevronDown className="w-3 h-3 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-70" />
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-white text-base">{lead.name}</h4>
                    <a href={`mailto:${lead.email}`} className="text-xs text-blue-400 font-mono">{lead.email}</a>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="px-2.5 py-1 rounded-full bg-slate-900 text-slate-300 font-bold border border-white/10">{lead.budget}</span>
                    <span className="font-medium">{formatDate(lead.created_at)}</span>
                  </div>

                  <p className="text-xs text-slate-300 bg-slate-900/80 p-3 rounded-xl border border-white/5">
                    "{lead.message}"
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Lead Message Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="apple-glass max-w-lg w-full rounded-3xl p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setSelectedLead(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-full hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <span className="font-mono text-xs font-bold text-blue-400">Lead #{selectedLead.id}</span>
              <span className={`px-3 py-0.5 rounded-full text-xs font-bold ${getStatusBadgeClass(selectedLead.status)}`}>
                {selectedLead.status}
              </span>
            </div>

            <h3 className="text-2xl font-extrabold text-white">{selectedLead.name}</h3>
            <p className="text-sm font-mono text-blue-400 mb-6">{selectedLead.email}</p>

            <div className="space-y-4 bg-slate-900/80 p-5 rounded-2xl border border-white/10 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400 font-semibold uppercase">Budget Range:</span>
                <span className="font-bold text-white">{selectedLead.budget}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-semibold uppercase">Date Submitted:</span>
                <span className="text-slate-300 font-medium">{formatDate(selectedLead.created_at)}</span>
              </div>
              <div className="pt-3 border-t border-white/10">
                <span className="text-slate-400 font-semibold uppercase block mb-2">Project Message:</span>
                <p className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap">{selectedLead.message}</p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedLead(null)}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl apple-button-secondary"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
