import { FiChevronRight } from 'react-icons/fi';

export default function Step1({ formData, handleChange, nextStep }) {
  return (
    <div className="formStep">
      <div className='step-heading'>Contact Details</div>
      <div className="inputGroup">
        <label>Brand/Company Name *</label>
        <input type="text" name="brand" value={formData.brand} onChange={handleChange} required className="input" />
      </div>
      <div className="inputGroup">
        <label>Website</label>
        <input type="url" name="website" placeholder="https://" value={formData.website} onChange={handleChange} className="input" />
      </div>
      <div className="dual-col">
        <div className="inputGroup">
          <label>Contact Name</label>
          <input type="text" name="contactName" value={formData.contactName} onChange={handleChange} className="input" />
        </div>
        <div className="inputGroup">
          <label>Contact Role</label>
          <input type="text" name="contactRole" value={formData.contactRole} onChange={handleChange} className="input" />
        </div>
      </div>
      <div className="inputGroup">
        <label>Phone Number</label>
        <input type="tel" name="contactPhone" value={formData.contactPhone} onChange={handleChange} className="input" />
      </div>

      <input type="text" name="website_bot" value={formData.website_bot} onChange={handleChange} style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />

      <div className="actions">
        <div></div>
        <button type="button" onClick={nextStep} disabled={!formData.brand} className="btnPrimary">
          Next <FiChevronRight />
        </button>
      </div>
    </div>
  );
}
