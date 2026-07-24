import React, { useState, forwardRef } from 'react';
import { Send, CheckCircle2, AlertCircle, Sparkles, User, Mail, DollarSign, MessageSquare } from 'lucide-react';
import { submitLead } from '../api/client';

const LeadForm = forwardRef(({ onLeadSubmitted }, ref) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    budget: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState(false);

  const budgetOptions = [
    { value: 'Under $1000', label: '▼ Under $1000' },
    { value: '$1000-$5000', label: '▼ $1000-$5000' },
    { value: 'Above $5000', label: '▼ Above $5000' }
  ];

  const validateField = (name, value) => {
    let error = '';
    if (name === 'name') {
      if (!value || !value.trim()) error = 'Name cannot be empty.';
    } else if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value || !value.trim()) {
        error = 'Please enter a valid email.';
      } else if (!emailRegex.test(value.trim())) {
        error = 'Please enter a valid email.';
      }
    } else if (name === 'budget') {
      if (!value) error = 'Budget must be selected.';
    } else if (name === 'message') {
      if (!value || !value.trim()) error = 'Message cannot be empty.';
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (serverError) setServerError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    setSuccessMessage(false);

    const newErrors = {};
    const nameErr = validateField('name', formData.name);
    const emailErr = validateField('email', formData.email);
    const budgetErr = validateField('budget', formData.budget);
    const messageErr = validateField('message', formData.message);

    if (nameErr) newErrors.name = nameErr;
    if (emailErr) newErrors.email = emailErr;
    if (budgetErr) newErrors.budget = budgetErr;
    if (messageErr) newErrors.message = messageErr;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await submitLead(formData);
      setSuccessMessage(true);
      setFormData({ name: '', email: '', budget: '', message: '' });
      setErrors({});
      if (onLeadSubmitted) onLeadSubmitted(response);
    } catch (err) {
      setServerError(err.message || 'Submission failed. Please check your details and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={ref} id="lead-form-section" className="py-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      <div className="apple-glass rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-2xl">
        {/* Glow corner */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold mb-3 shadow-inner">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Direct Project Inquiry</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Let's Build Something Great</h2>
          <p className="text-sm text-slate-400 mt-2">Complete your project details below. Our team reviews every lead within 24 hours.</p>
        </div>

        {/* Success Alert */}
        {successMessage && (
          <div className="mb-8 p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 flex items-start gap-3 animate-fade-in shadow-lg">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-sm">Lead Submitted Successfully!</h4>
              <p className="text-xs text-emerald-300/80 mt-1">Your inquiry has been stored in our SQLite database. An admin can now review and update your project status.</p>
            </div>
          </div>
        )}

        {/* Backend Validation Alert */}
        {serverError && (
          <div className="mb-8 p-4 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-300 flex items-start gap-3 animate-fade-in shadow-lg">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-sm">Validation Error</h4>
              <p className="text-xs text-rose-300/90 mt-1">{serverError}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          {/* Name Field */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Name <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. John Smith"
                className={`w-full pl-11 pr-4 py-3.5 rounded-2xl text-slate-100 text-sm apple-input ${
                  errors.name ? 'border-rose-500/80 ring-2 ring-rose-500/30' : ''
                }`}
              />
            </div>
            {errors.name && (
              <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1 font-semibold">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.name}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Email <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. john@gmail.com"
                className={`w-full pl-11 pr-4 py-3.5 rounded-2xl text-slate-100 text-sm apple-input ${
                  errors.email ? 'border-rose-500/80 ring-2 ring-rose-500/30' : ''
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1 font-semibold">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
              </p>
            )}
          </div>

          {/* Budget Field */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Budget Range <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <DollarSign className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
              <select
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className={`w-full pl-11 pr-10 py-3.5 rounded-2xl text-slate-100 text-sm apple-input appearance-none bg-slate-900 ${
                  errors.budget ? 'border-rose-500/80 ring-2 ring-rose-500/30' : ''
                }`}
              >
                <option value="" disabled className="text-slate-500">
                  Select Budget Range...
                </option>
                {budgetOptions.map((opt) => (
                  <option key={opt.value} value={opt.value} className="bg-slate-900 text-slate-100 font-medium">
                    {opt.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400 text-xs font-bold">
                ▼
              </div>
            </div>
            {errors.budget && (
              <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1 font-semibold">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.budget}
              </p>
            )}
          </div>

          {/* Message Field */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Message <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <MessageSquare className="w-4 h-4 text-slate-400 absolute left-4 top-4" />
              <textarea
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                placeholder="Describe your website goals, features, or project timeline..."
                className={`w-full pl-11 pr-4 py-3.5 rounded-2xl text-slate-100 text-sm apple-input ${
                  errors.message ? 'border-rose-500/80 ring-2 ring-rose-500/30' : ''
                }`}
              />
            </div>
            {errors.message && (
              <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1 font-semibold">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.message}
              </p>
            )}
          </div>

          {/* 3D Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 text-base font-bold text-white apple-button-3d rounded-2xl flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Submitting Lead...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Send className="w-4 h-4" />
                Submit Lead
              </span>
            )}
          </button>
        </form>
      </div>
    </section>
  );
});

export default LeadForm;
