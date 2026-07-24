// API Client for LeadDesk Mini

const RENDER_BACKEND_URL = 'https://leaddesk-mini-s9i4.onrender.com';
const API_BASE_URL = import.meta.env.VITE_API_URL || RENDER_BACKEND_URL;

const getAuthHeaders = () => {
  const token = localStorage.getItem('leaddesk_admin_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
};

export const submitLead = async (leadData) => {
  const response = await fetch(`${API_BASE_URL}/api/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(leadData)
  });

  const data = await response.json();
  if (!response.ok) {
    const errorMsg = Array.isArray(data.detail) ? data.detail.join(', ') : (data.detail || 'Failed to submit lead form.');
    throw new Error(errorMsg);
  }
  return data;
};

export const loginAdmin = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.detail || 'Invalid login credentials.');
  }

  if (data.access_token) {
    localStorage.setItem('leaddesk_admin_token', data.access_token);
    localStorage.setItem('leaddesk_admin_email', data.admin_email);
  }
  return data;
};

export const logoutAdmin = () => {
  localStorage.removeItem('leaddesk_admin_token');
  localStorage.removeItem('leaddesk_admin_email');
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('leaddesk_admin_token');
};

export const getAdminEmail = () => {
  return localStorage.getItem('leaddesk_admin_email') || 'admin@leaddesk.com';
};

export const getLeads = async (searchTerm = '', statusFilter = '') => {
  const params = new URLSearchParams();
  if (searchTerm) params.append('search', searchTerm);
  if (statusFilter) params.append('status', statusFilter);

  const url = `${API_BASE_URL}/api/leads${params.toString() ? '?' + params.toString() : ''}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: getAuthHeaders()
  });

  const data = await response.json();
  if (!response.ok) {
    if (response.status === 401) {
      logoutAdmin();
    }
    throw new Error(data.detail || 'Failed to fetch leads.');
  }
  return data;
};

export const updateLeadStatus = async (leadId, newStatus) => {
  const response = await fetch(`${API_BASE_URL}/api/leads/${leadId}/status`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify({ status: newStatus })
  });

  const data = await response.json();
  if (!response.ok) {
    if (response.status === 401) {
      logoutAdmin();
    }
    throw new Error(data.detail || 'Failed to update status.');
  }
  return data;
};
