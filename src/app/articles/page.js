import dbConnect from '@/lib/mongoose';
import Blog from '@/models/Blog';
import MediaCard from '@/components/shared/MediaCard';
import Link from 'next/link';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export const metadata = {
  title: 'Articles - Premium Insights',
  description: 'Read the latest thoughts, tutorials, and insights.',
};

export const revalidate = 60; // Revalidate every 60 seconds

export default async function ArticlesPage({ searchParams }) {
  await dbConnect();

  const resolvedParams = await searchParams;
  const page = parseInt(resolvedParams?.page || '1', 10);
  const limit = 10;
  const skip = (page - 1) * limit;

  const query = { status: 'published' };
  const totalBlogs = await Blog.countDocuments(query);
  const totalPages = Math.ceil(totalBlogs / limit) || 1;

  const blogs = await Blog.find(query)
    .sort({ publishedAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  return (
    <section style={{ minHeight: '100vh', paddingBottom: '60px' }}>
      <div className="container">
        {blogs.length === 0 ? (
          <div className="emptyState">
            <p>No articles published yet. Check back later.</p>
          </div>
        ) : (
          <>
            <div className="media-grid">
              {blogs.map((blog) => {
                const item = {
                  title: blog.title,
                  description: blog.excerpt || (blog.content ? blog.content.replace(/<[^>]+>/g, '').slice(0, 150) + '...' : 'Read more about this article...'),
                  image: blog.coverImage?.url || '/hero-img-3.jpg',
                  alt: blog.title,
                  link: `/articles/${blog.slug}`,
                  authorImage: blog.author?.avatarUrl,
                  authorName: blog.author?.name || 'Lokbhadra Singh',
                  date: new Date(blog.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                  width: 640,
                  height: 984,
                };
                return <MediaCard key={blog._id.toString()} item={item} />;
              })}
            </div>
            
            {totalPages > 1 && (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '3rem' }}>
                {page > 1 ? (
                  <Link href={`/articles?page=${page - 1}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.2rem', background: 'var(--primary)', color: '#000', borderRadius: '4px', fontWeight: 'bold' }}>
                    <FiChevronLeft /> Previous
                  </Link>
                ) : (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.2rem', background: '#333', color: '#888', borderRadius: '4px', cursor: 'not-allowed', fontWeight: 'bold' }}>
                    <FiChevronLeft /> Previous
                  </span>
                )}
                
                <span style={{ color: '#aaa' }}>Page {page} of {totalPages}</span>

                {page < totalPages ? (
                  <Link href={`/articles?page=${page + 1}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.2rem', background: 'var(--primary)', color: '#000', borderRadius: '4px', fontWeight: 'bold' }}>
                    Next <FiChevronRight />
                  </Link>
                ) : (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.2rem', background: '#333', color: '#888', borderRadius: '4px', cursor: 'not-allowed', fontWeight: 'bold' }}>
                    Next <FiChevronRight />
                  </span>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
