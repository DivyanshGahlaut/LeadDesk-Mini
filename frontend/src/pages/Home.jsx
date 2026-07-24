import React, { useRef } from 'react';
import Hero from '../components/Hero';
import LeadForm from '../components/LeadForm';

export default function Home({ onLeadSubmitted }) {
  const formRef = useRef(null);

  const handleScrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-4">
      <Hero onGetStarted={handleScrollToForm} />
      <LeadForm ref={formRef} onLeadSubmitted={onLeadSubmitted} />
    </div>
  );
}
