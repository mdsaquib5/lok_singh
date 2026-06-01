import BlogEditor from '@/components/blog/BlogEditor';

export const metadata = {
  title: 'Write New Post - Admin Dashboard',
};

export default function NewBlogPage() {
  return (
    <div>
      <BlogEditor />
    </div>
  );
}
