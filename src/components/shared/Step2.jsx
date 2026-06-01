import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { COLLAB_TYPES, NICHES } from '../../constant/options';

export default function Step2({ formData, toggleArrayItem, nextStep, prevStep }) {
  return (
    <div className="formStep">
      <div className='step-heading'>Formats & Niches</div>
      <div className="inputGroup">
        <label>Collaboration Types</label>
        <div className="chips">
          {COLLAB_TYPES.map(type => (
            <button type="button" key={type} onClick={() => toggleArrayItem('collabTypes', type)} className={`chip ${formData.collabTypes.includes(type) ? "chipActive" : ''}`}>
              {type}
            </button>
          ))}
        </div>
      </div>
      <div className="inputGroup">
        <label>Relevant Niches</label>
        <div className="chips">
          {NICHES.map(niche => (
            <button type="button" key={niche} onClick={() => toggleArrayItem('niches', niche)} className={`chip ${formData.niches.includes(niche) ? "chipActive" : ''}`}>
              {niche}
            </button>
          ))}
        </div>
      </div>
      <div className="actions">
        <button type="button" onClick={prevStep} className="btnSecondary"><FiChevronLeft /> Back</button>
        <button type="button" onClick={nextStep} className="btnPrimary">Next <FiChevronRight /></button>
      </div>
    </div>
  );
}
