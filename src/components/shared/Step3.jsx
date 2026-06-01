import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { BUDGET_OPTIONS, TIMELINE_OPTIONS } from '../../constant/options';

export default function Step3({ formData, handleChange, nextStep, prevStep }) {
  return (
    <div className="formStep">
      <div className='step-heading'>Setup & Goals</div>
      <div className="dual-col">
        <div className="inputGroup">
          <label>Budget Range</label>
          <select name="budget" value={formData.budget} onChange={handleChange} className="select">
            <option value="">Select Budget</option>
            {BUDGET_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
        <div className="inputGroup">
          <label>Timeline</label>
          <select name="timeline" value={formData.timeline} onChange={handleChange} className="select">
            <option value="">Select Timeline</option>
            {TIMELINE_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
      </div>
      <div className="inputGroup">
        <label>Campaign Description & Goals</label>
        <textarea name="goals" rows={5} value={formData.goals} onChange={handleChange} className="textarea" placeholder="Describe what you want to achieve..."></textarea>
      </div>
      <div className="actions">
        <button type="button" onClick={prevStep} className="btnSecondary"><FiChevronLeft /> Back</button>
        <button type="button" onClick={nextStep} className="btnPrimary">Next <FiChevronRight /></button>
      </div>
    </div>
  );
}
