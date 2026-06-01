import { notFound } from 'next/navigation';
import Image from 'next/image';
import { FiClock, FiUser, FiArrowLeft } from 'react-icons/fi';
import Link from 'next/link';
import dbConnect from '@/lib/mongoose';
import Blog from '@/models/Blog';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  await dbConnect();
  let blog = await Blog.findOne({ slug, status: 'published' }).lean();
  if (!blog && slug.match(/^[0-9a-fA-F]{24}$/)) {
    blog = await Blog.findById(slug).lean();
  }

  if (!blog) return { title: 'Not Found' };

  return {
    title: `${blog.title} - Lok Portfolio`,
    description: blog.excerpt,
  };
}

export default async function BlogDetailsPage({ params }) {
  const { slug } = await params;
  await dbConnect();

  let blog = await Blog.findOne({ slug, status: 'published' }).lean();
  if (!blog && slug.match(/^[0-9a-fA-F]{24}$/)) {
    blog = await Blog.findById(slug).lean();
  }

  if (!blog) {
    notFound();
  }

  return (
    <article className="article">
      <div className="hero">
        <div className="heroOverlay"></div>
        {blog.coverImage?.url && (
          <Image src={blog.coverImage.url} alt={blog.title} fill className="heroImage" priority />
        )}
        <div className="heroContent">
          <Link href="/articles" className="backLink">
            <FiArrowLeft /> Back to Articles
          </Link>
          <div className="tags">
            {blog.tags?.map((tag, i) => (
              <span key={i} className="tag">{tag}</span>
            ))}
          </div>
          <h1 className="title">{blog.title}</h1>
          <div className="meta">
            <div className="author">
              {blog.author?.avatarUrl ? (
                <Image src={blog.author.avatarUrl} alt={blog.author.name} width={40} height={40} className="avatar" />
              ) : (
                <div className="avatarPlaceholder"><FiUser /></div>
              )}
              <span className="authorName">{blog.author?.name || 'Admin'}</span>
            </div>
            <div className="date">
              <FiClock />
              <span>{new Date(blog.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="contentWrapper">
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: blog.content || '<p>No content provided.</p>' }}
        />
      </div>
    </article>
  );
}
