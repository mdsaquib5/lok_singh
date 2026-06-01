import Link from 'next/link';
import Image from 'next/image';
import { FiClock, FiUser } from 'react-icons/fi';
import dbConnect from '@/lib/mongoose';
import Blog from '@/models/Blog';
import "./blog.css";

export const metadata = {
  title: 'Articles - Premium Insights',
  description: 'Read the latest thoughts, tutorials, and insights.',
};

export const revalidate = 60; // Revalidate every 60 seconds

export default async function ArticlesPage() {
  await dbConnect();

  const blogs = await Blog.find({ status: 'published' }).sort({ publishedAt: -1 }).lean();

  return (
    <div className="container">
      <div className="header">
        <h1 className="title">Articles & Insights</h1>
        <p className="subtitle">Explore the latest thoughts and expertise</p>
      </div>

      {blogs.length === 0 ? (
        <div className="emptyState">
          <p>No articles published yet. Check back later.</p>
        </div>
      ) : (
        <div className="grid">
          {blogs.map((blog) => (
            <Link key={blog._id.toString()} href={`/articles/${blog.slug}`} className="card">
              <div className="imageWrapper">
                {blog.coverImage?.url ? (
                  <Image src={blog.coverImage.url} alt={blog.title} fill className="image" />
                ) : (
                  <div className="placeholderImage" />
                )}
              </div>
              <div className="content">
                <div className="tags">
                  {blog.tags?.map((tag, i) => (
                    <span key={i} className="tag">{tag}</span>
                  ))}
                </div>
                <h2 className="blogTitle">{blog.title}</h2>
                <p className="excerpt">{blog.excerpt}</p>
                <div className="meta">
                  <div className="author">
                    <FiUser className="icon" />
                    <span>{blog.author?.name || 'Admin'}</span>
                  </div>
                  <div className="date">
                    <FiClock className="icon" />
                    <span>{new Date(blog.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
