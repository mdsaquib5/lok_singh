import dbConnect from '@/lib/mongoose';
import Lead from '@/models/Lead';
import Blog from '@/models/Blog';
import Link from 'next/link';
import { FiUsers, FiFileText, FiCheckCircle } from 'react-icons/fi';

export default async function AdminDashboard() {
  await dbConnect();

  const [totalLeads, newLeads, approvedLeads, totalBlogs, recentLeads, recentBlogs] = await Promise.all([
    Lead.countDocuments(),
    Lead.countDocuments({ status: 'new' }),
    Lead.countDocuments({ status: 'approved' }),
    Blog.countDocuments(),
    Lead.find().sort({ submittedAt: -1 }).limit(5).lean(),
    Blog.find().sort({ createdAt: -1 }).limit(5).lean(),
  ]);

  return (
    <div className="dashboard">
      <div className="dahboard-heading">Dashboard Overview</div>

      <div className="statsGrid">
        <div className="statCard">
          <div className="statIcon"><FiUsers /></div>
          <div className="statInfo">
            <h3>Total Leads</h3>
            <p>{totalLeads}</p>
          </div>
        </div>
        <div className="statCard">
          <div className="statIcon"><FiUsers /></div>
          <div className="statInfo">
            <h3>New Leads</h3>
            <p>{newLeads}</p>
          </div>
        </div>
        <div className="statCard">
          <div className="statIcon"><FiCheckCircle /></div>
          <div className="statInfo">
            <h3>Approved</h3>
            <p>{approvedLeads}</p>
          </div>
        </div>
        <div className="statCard">
          <div className="statIcon"><FiFileText /></div>
          <div className="statInfo">
            <h3>Total Blogs</h3>
            <p>{totalBlogs}</p>
          </div>
        </div>
      </div>

      <div className="tablesContainer">
        <div className="tableWrapper">
          <div className="tableHeader">
            <div className='dahboard-heading'>Recent Leads</div>
            <Link href="/admin/leads" className="viewAll">View All</Link>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Brand</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentLeads.map(lead => (
                <tr key={lead._id.toString()}>
                  <td><Link href={`/admin/leads/${lead._id}`} className="link">{lead.brand}</Link></td>
                  <td><span className={`badge ${lead.status}`}>{lead.status}</span></td>
                  <td>{new Date(lead.submittedAt).toLocaleDateString()}</td>
                </tr>
              ))}
              {recentLeads.length === 0 && <tr><td colSpan="3" style={{ textAlign: 'center' }}>No leads yet.</td></tr>}
            </tbody>
          </table>
        </div>

        <div className="tableWrapper">
          <div className="tableHeader">
            <div className='dahboard-heading'>Recent Blogs</div>
            <Link href="/admin/blogs" className="viewAll">View All</Link>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentBlogs.map(blog => (
                <tr key={blog._id.toString()}>
                  <td><Link href={`/admin/blogs/${blog._id}`} className="link">{blog.title}</Link></td>
                  <td><span className={`badge ${blog.status}`}>{blog.status}</span></td>
                  <td>{new Date(blog.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
              {recentBlogs.length === 0 && <tr><td colSpan="3" style={{ textAlign: 'center' }}>No blogs yet.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
