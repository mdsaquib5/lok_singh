import dbConnect from '@/lib/mongoose';
import Blog from '@/models/Blog';
import Link from 'next/link';
import { FiPlus, FiEdit2, FiEye, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export const dynamic = 'force-dynamic';

export default async function AdminBlogsPage({ searchParams }) {
  await dbConnect();

  // Next.js >= 15 requires awaiting searchParams
  const params = await searchParams;
  const page = parseInt(params?.page || '1', 10);
  const limit = 10;
  const skip = (page - 1) * limit;

  const totalBlogs = await Blog.countDocuments();
  const totalPages = Math.ceil(totalBlogs / limit) || 1;

  const blogs = await Blog.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  return (
    <div>
      <div className="blog-header">
        <h1>Blogs</h1>
        <Link href="/admin/blogs/new" className="btnPrimary">
          <FiPlus /> Write New Post
        </Link>
      </div>

      <div className="tableWrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map(blog => (
              <tr key={blog._id.toString()}>
                <td>
                  <strong>{blog.title || 'Untitled Blog'}</strong>
                  <div className="slug">{blog.slug}</div>
                </td>
                <td><span className={`badge ${blog.status}`}>{blog.status}</span></td>
                <td>{new Date(blog.createdAt).toLocaleDateString()}</td>
                <td>
                  <div className="actions" style={{ marginTop: 0 }}>
                    <Link href={`/admin/blogs/${blog._id}`} className="editBtn" title="Edit">
                      <FiEdit2 />
                    </Link>
                    <Link href={`/articles/${blog.slug}`} className="viewBtn" title="View Live" target="_blank" rel="noopener noreferrer">
                      <FiEye />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
            {blogs.length === 0 && <tr><td colSpan="4" style={{ textAlign: 'center' }}>No blogs found.</td></tr>}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '2rem' }}>
          {page > 1 ? (
            <Link href={`/admin/blogs?page=${page - 1}`} className="btnSecondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: '#222', borderRadius: '4px' }}>
              <FiChevronLeft /> Previous
            </Link>
          ) : (
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: '#111', color: '#555', borderRadius: '4px', cursor: 'not-allowed' }}>
              <FiChevronLeft /> Previous
            </span>
          )}
          
          <span>Page {page} of {totalPages}</span>

          {page < totalPages ? (
            <Link href={`/admin/blogs?page=${page + 1}`} className="btnSecondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: '#222', borderRadius: '4px' }}>
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
