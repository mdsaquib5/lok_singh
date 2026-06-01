import dbConnect from '@/lib/mongoose';
import Lead from '@/models/Lead';
import Link from 'next/link';

export default async function LeadsPage({ searchParams }) {
  await dbConnect();
  // `searchParams` needs to be awaited in Next.js 15+ 
  const resolvedParams = await searchParams;
  const status = resolvedParams.status || 'all';

  const query = status !== 'all' ? { status } : {};
  const leads = await Lead.find(query).sort({ submittedAt: -1 }).lean();

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
    </div>
  );
}
