import dbConnect from '@/lib/mongoose';
import Blog from '@/models/Blog';
import MediaCard from '@/components/shared/MediaCard';

export const metadata = {
  title: 'Articles - Premium Insights',
  description: 'Read the latest thoughts, tutorials, and insights.',
};

export const revalidate = 60; // Revalidate every 60 seconds

export default async function ArticlesPage() {
  await dbConnect();

  const blogs = await Blog.find({ status: 'published' }).sort({ publishedAt: -1 }).lean();

  return (
    <section style={{ height: '100vh' }}>
      <div className="container">
        {blogs.length === 0 ? (
          <div className="emptyState">
            <p>No articles published yet. Check back later.</p>
          </div>
        ) : (
          <div className="media-grid">
            {blogs.map((blog) => {
              const item = {
                title: blog.title,
                description: blog.excerpt,
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
        )}
      </div>
    </section>
  );
}
