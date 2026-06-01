import dbConnect from '@/lib/mongoose';
import Blog from '@/models/Blog';
import Link from 'next/link';
import { FiPlus, FiEdit2, FiEye } from 'react-icons/fi';

export default async function AdminBlogsPage() {
  await dbConnect();

  const blogs = await Blog.find().sort({ createdAt: -1 }).lean();

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
                  <strong>{blog.title}</strong>
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
    </div>
  );
}
