import dbConnect from "@/lib/mongoose";
import Blog from "@/models/Blog";
import MediaCard from "../shared/MediaCard";

const Media = async () => {
    await dbConnect();
    // Fetch up to 4 recent published blogs
    const blogs = await Blog.find({ status: 'published' }).sort({ publishedAt: -1 }).limit(4).lean();

    return (
        <section id="insights" style={{ paddingBottom: '60px' }}>
            <div className="container">
                <div className='bg-center-heading'>
                    <div className='center-sub-heading'>MEDIA INSIGHTS</div>
                    <div className='center-main-heading' style={{ color: '#1e293b' }}>Press & Media Coverage</div>
                </div>
                <div className="media-grid">
                    {blogs.length === 0 ? (
                        <p style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '40px 0', color: '#64748b' }}>No media insights published yet.</p>
                    ) : (
                        blogs.map((blog) => {
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
                        })
                    )}
                </div>
            </div>
        </section>
    )
}

export default Media;