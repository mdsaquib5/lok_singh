import { FiChevronLeft } from 'react-icons/fi';

export default function Step4({ formData, prevStep, handleSubmit, loading }) {
  return (
    <div className="formStep">
      <div className='step-heading'>Review & Submit</div>
      <div className="reviewBox">
        <div className="reviewItem"><strong>Brand:</strong> <p>{formData.brand}</p></div>
        <div className="reviewItem"><strong>Website:</strong> <p>{formData.website || 'N/A'}</p></div>
        <div className="reviewItem"><strong>Contact:</strong> <p>{formData.contactName} ({formData.contactPhone})</p></div>
        <div className="reviewItem"><strong>Collab Types:</strong> <p>{formData.collabTypes.join(', ') || 'N/A'}</p></div>
        <div className="reviewItem"><strong>Niches:</strong> <p>{formData.niches.join(', ') || 'N/A'}</p></div>
        <div className="reviewItem"><strong>Budget:</strong> <p>{formData.budget || 'N/A'}</p></div>
        <div className="reviewItem"><strong>Timeline:</strong> <p>{formData.timeline || 'N/A'}</p></div>
        <div className="reviewItem"><strong>Goals:</strong> <p>{formData.goals || 'N/A'}</p></div>
      </div>
      <div className="actions">
        <button type="button" onClick={prevStep} className="btnSecondary" disabled={loading}><FiChevronLeft /> Back</button>
        <button type="button" onClick={handleSubmit} className="btnSubmit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Pitch'}
        </button>
      </div>
    </div>
  );
}
