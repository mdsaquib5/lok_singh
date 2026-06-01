"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiArrowLeft, FiTrash2, FiCheck, FiX } from 'react-icons/fi';

export default function LeadDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [lead, setLead] = useState(null);
  const [adminNote, setAdminNote] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchLead();
  }, [params.id]);

  const fetchLead = async () => {
    try {
      const res = await fetch(`/api/leads/${params.id}`);
      if (res.ok) {
        const data = await res.json();
        setLead(data);
        setAdminNote(data.adminNote || '');
      } else {
        router.push('/admin/leads');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const updateLead = async (updates) => {
    setSaving(true);
    try {
      const res = await fetch(`/api/leads/${params.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      if (res.ok) {
        const data = await res.json();
        setLead(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const deleteLead = async () => {
    if (!confirm('Are you sure you want to delete this lead?')) return;
    try {
      await fetch(`/api/leads/${params.id}`, { method: 'DELETE' });
      router.push('/admin/leads');
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!lead) return <div>Lead not found</div>;

  return (
    <div>
      <Link href="/admin/leads" className="backLink">
        <FiArrowLeft /> Back to Leads
      </Link>

      <div className="lead-detail-header">
        <div>
          <h1>{lead.brand}</h1>
          <p>Reference: {lead.referenceId} | Status: <span className={`badge ${lead.status}`}>{lead.status}</span></p>
        </div>
        <div className="actions">
          {lead.status !== 'approved' && (
            <button className="btnApprove" onClick={() => updateLead({ status: 'approved' })} disabled={saving}>
              <FiCheck /> Approve
            </button>
          )}
          {lead.status !== 'declined' && (
            <button className="btnDecline" onClick={() => updateLead({ status: 'declined' })} disabled={saving}>
              <FiX /> Decline
            </button>
          )}
          <button className="btnDelete" onClick={deleteLead}>
            <FiTrash2 /> Delete
          </button>
        </div>
      </div>

      <div className="grid">
        <div className="mainCol">
          <div className="card">
            <h2>Contact Information</h2>
            <div className="infoGrid">
              <div><strong>Name:</strong> {lead.contactName}</div>
              <div><strong>Role:</strong> {lead.contactRole || 'N/A'}</div>
              <div><strong>Phone:</strong> {lead.contactPhone || 'N/A'}</div>
              <div><strong>Website:</strong> {lead.website ? <a href={lead.website} target="_blank">{lead.website}</a> : 'N/A'}</div>
            </div>
          </div>

          <div className="card">
            <h2>Campaign Details</h2>
            <div className="infoGrid">
              <div><strong>Budget:</strong> {lead.budget}</div>
              <div><strong>Timeline:</strong> {lead.timeline}</div>
            </div>

            <div className="section">
              <strong>Collab Types:</strong>
              <div className="tags">
                {lead.collabTypes.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
            </div>

            <div className="section">
              <strong>Niches:</strong>
              <div className="tags">
                {lead.niches.map(n => <span key={n} className="tag">{n}</span>)}
              </div>
            </div>

            <div className="section">
              <strong>Goals & Description:</strong>
              <p className="goalsText">{lead.goals}</p>
            </div>
          </div>
        </div>

        <div className="sideCol">
          <div className="card">
            <h2>Priority Score</h2>
            <div className="scoreCircleWrapper">
              <div className={`scoreCircle ${lead.score >= 70 ? 'scoreHigh' : lead.score >= 40 ? 'scoreMed' : 'scoreLow'}`}>
                {lead.score}
              </div>
              <span className="scoreLabel">Out of 100</span>
            </div>
            <ul className="scoreChecklist">
              <li>Budget: {lead.budget}</li>
              <li>Timeline: {lead.timeline}</li>
              <li>Niches Match: {lead.niches?.length > 0 ? 'Yes' : 'No'}</li>
            </ul>
          </div>

          <div className="card">
            <h2>Admin Notes</h2>
            <textarea
              className="textarea"
              rows="5"
              value={adminNote}
              onChange={e => setAdminNote(e.target.value)}
              placeholder="Add internal notes here..."
            />
            <button
              className="btnSaveNote"
              onClick={() => updateLead({ adminNote })}
              disabled={saving || adminNote === lead.adminNote}
            >
              Save Note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
