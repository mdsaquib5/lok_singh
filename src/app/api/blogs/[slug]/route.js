import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Blog from '@/models/Blog';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(req, { params }) {
  await dbConnect();
  try {
    const { slug } = await params;
    let blog = await Blog.findOne({ slug });
    if (!blog && slug.match(/^[0-9a-fA-F]{24}$/)) {
      blog = await Blog.findById(slug);
    }
    
    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }
    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blog' }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  await dbConnect();
  try {
    const { slug } = await params;
    const body = await req.json();
    
    let blog = await Blog.findOne({ slug });
    if (!blog && slug.match(/^[0-9a-fA-F]{24}$/)) {
      blog = await Blog.findById(slug);
    }

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    Object.assign(blog, body);
    await blog.save();

    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update blog', details: error.message }, { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  await dbConnect();
  try {
    const { slug } = await params;
    let blog = await Blog.findOne({ slug });
    if (!blog && slug.match(/^[0-9a-fA-F]{24}$/)) {
      blog = await Blog.findById(slug);
    }

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    // Optional: Delete media from Cloudinary
    if (blog.coverImage?.publicId) {
      await cloudinary.uploader.destroy(blog.coverImage.publicId);
    }
    if (blog.media && blog.media.length > 0) {
      for (const m of blog.media) {
        if (m.publicId) {
          await cloudinary.uploader.destroy(m.publicId, { resource_type: m.resourceType === 'raw' ? 'raw' : m.resourceType === 'video' ? 'video' : 'image' });
        }
      }
    }

    await Blog.deleteOne({ _id: blog._id });

    return NextResponse.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 });
  }
}
