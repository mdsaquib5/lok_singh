import dbConnect from '@/lib/mongoose';
import Lead from '@/models/Lead';
import Link from 'next/link';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export const dynamic = 'force-dynamic';

export default async function LeadsPage({ searchParams }) {
  await dbConnect();
  // `searchParams` needs to be awaited in Next.js 15+ 
  const resolvedParams = await searchParams;
  const status = resolvedParams.status || 'all';
  const page = parseInt(resolvedParams.page || '1', 10);
  const limit = 10;
  const skip = (page - 1) * limit;

  const query = status !== 'all' ? { status } : {};
  
  const totalLeads = await Lead.countDocuments(query);
  const totalPages = Math.ceil(totalLeads / limit) || 1;

  const leads = await Lead.find(query)
    .sort({ submittedAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  return (
    <div>
      <div className="table-header">
        <div className='dahboard-heading'>Collaboration Leads</div>
      </div>

      <div className="tabs">
        <Link href="/admin/leads?status=all" className={`tab ${status === 'all' ? 'active' : ''}`}>All</Link>
        <Link href="/admin/leads?status=new" className={`tab ${status === 'new' ? 'active' : ''}`}>New</Link>
        <Link href="/admin/leads?status=approved" className={`tab ${status === 'approved' ? 'active' : ''}`}>Approved</Link>
        <Link href="/admin/leads?status=declined" className={`tab ${status === 'declined' ? 'active' : ''}`}>Declined</Link>
      </div>

      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Brand</th>
              <th>Score</th>
              <th>Budget</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.map(lead => (
              <tr key={lead._id.toString()}>
                <td>{lead.referenceId}</td>
                <td><strong>{lead.brand}</strong><br /><small>{lead.contactName}</small></td>
                <td>
                  <div className={`score ${lead.score >= 70 ? 'score-high' : lead.score >= 40 ? 'score-med' : 'score-low'}`}>
                    {lead.score}
                  </div>
                </td>
                <td>{lead.budget}</td>
                <td><span className={`badge ${lead.status}`}> {lead.status}</span></td>
                <td>{new Date(lead.submittedAt).toLocaleDateString()}</td>
                <td>
                  <Link href={`/admin/leads/${lead._id}`} className="view-btn">View</Link>
                </td>
              </tr>
            ))}
            {leads.length === 0 && <tr><td colSpan="7" style={{ textAlign: 'center' }}>No leads found.</td></tr>}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '2rem' }}>
          {page > 1 ? (
            <Link href={`/admin/leads?status=${status}&page=${page - 1}`} className="btnSecondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: '#222', borderRadius: '4px' }}>
              <FiChevronLeft /> Previous
            </Link>
          ) : (
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: '#111', color: '#555', borderRadius: '4px', cursor: 'not-allowed' }}>
              <FiChevronLeft /> Previous
            </span>
          )}
          
          <span>Page {page} of {totalPages}</span>

          {page < totalPages ? (
            <Link href={`/admin/leads?status=${status}&page=${page + 1}`} className="btnSecondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: '#222', borderRadius: '4px' }}>
              Next <FiChevronRight />
            </Link>
          ) : (
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: '#111', color: '#555', borderRadius: '4px', cursor: 'not-allowed' }}>
              Next <FiChevronRight />
            </span>
          )}
        </div>
      )}
    </div>
  );
}
