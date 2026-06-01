import dbConnect from '@/lib/mongoose';
import Blog from '@/models/Blog';
import BlogEditor from '@/components/blog/BlogEditor';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Edit Post - Admin Dashboard',
};

export default async function EditBlogPage({ params }) {
  await dbConnect();
  const { id } = await params;

  const blog = await Blog.findById(id).lean();

  if (!blog) {
    notFound();
  }

  // Convert ObjectIds to strings so they can be passed to the client component
  const initialData = {
    ...blog,
    _id: blog._id.toString(),
  };

  return (
    <div>
      <BlogEditor initialData={initialData} />
    </div>
  );
}
