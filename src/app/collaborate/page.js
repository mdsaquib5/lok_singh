"use client";

import { useState } from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import Link from 'next/link';

import Step1 from '../../components/shared/Step1';
import Step2 from '../../components/shared/Step2';
import Step3 from '../../components/shared/Step3';
import Step4 from '../../components/shared/Step4';

export default function CollaboratePage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [successId, setSuccessId] = useState(null);
  const [formData, setFormData] = useState({
    brand: '',
    website: '',
    contactName: '',
    contactRole: '',
    contactPhone: '',
    collabTypes: [],
    niches: [],
    budget: '',
    timeline: '',
    goals: '',
    website_bot: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleArrayItem = (field, item) => {
    setFormData(prev => {
      const array = prev[field];
      if (array.includes(item)) {
        return { ...prev, [field]: array.filter(i => i !== item) };
      } else {
        return { ...prev, [field]: [...array, item] };
      }
    });
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccessId(data.referenceId || 'SUCCESS');
        setStep(5);
      } else {
        alert(data.error || 'Something went wrong');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to submit');
    } finally {
      setLoading(false);
    }
  };

  const renderStepIndicator = () => (
    <div className="stepper">
      {[1, 2, 3, 4].map(num => (
        <div key={num} className={`step ${step >= num ? 'activeStep' : ''}`}>
          <div className="stepNum">{num}</div>
          {num < 4 && <div className="stepLine"></div>}
        </div>
      ))}
    </div>
  );

  return (
    <section className='collab-bg'>
      <div className="container">
        <form className="collab-wrapper" onSubmit={(e) => e.preventDefault()}>
          {step < 5 && (
            <div className='bg-center-heading'>
              <div className='center-sub-heading'>LET'S COLLABORATE</div>
              <div className='center-main-heading'>Bring Your Vision to Life</div>
              {renderStepIndicator()}
            </div>
          )}

          {step === 1 && (
            <Step1 formData={formData} handleChange={handleChange} nextStep={nextStep} />
          )}

          {step === 2 && (
            <Step2 formData={formData} toggleArrayItem={toggleArrayItem} nextStep={nextStep} prevStep={prevStep} />
          )}

          {step === 3 && (
            <Step3 formData={formData} handleChange={handleChange} nextStep={nextStep} prevStep={prevStep} />
          )}

          {step === 4 && (
            <Step4 formData={formData} prevStep={prevStep} handleSubmit={handleSubmit} loading={loading} />
          )}

          {step === 5 && (
            <div className="successStep">
              <FiCheckCircle className="successIcon" />
              <h2>Pitch Submitted Successfully!</h2>
              <p>Thank you for your interest. We have received your details.</p>
              {successId && successId !== 'SUCCESS' && (
                <div className="referenceBox">
                  <span>Your Reference ID:</span>
                  <strong>{successId}</strong>
                </div>
              )}
              <Link href="/" className="btnPrimary" style={{ marginTop: '30px' }}>Return to Home</Link>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
