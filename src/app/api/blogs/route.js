import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Blog from '@/models/Blog';

export async function GET(req) {
  await dbConnect();
  
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    
    const query = status ? { status } : {};
    
    // Sort by status (drafts first) then publishedAt/createdAt
    const blogs = await Blog.find(query).sort({ status: 1, createdAt: -1 });
    
    return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

export async function POST(req) {
  await dbConnect();
  
  try {
    const body = await req.json();
    const newBlog = await Blog.create(body);
    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create blog', details: error.message }, { status: 400 });
  }
}
