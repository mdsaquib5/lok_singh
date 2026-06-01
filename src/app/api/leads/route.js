import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Lead from '@/models/Lead';

export async function GET(req) {
  await dbConnect();
  
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    
    const query = status && status !== 'all' ? { status } : {};
    
    const leads = await Lead.find(query).sort({ submittedAt: -1 });
    
    return NextResponse.json(leads);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
  }
}

export async function POST(req) {
  await dbConnect();
  
  try {
    const body = await req.json();
    
    // Honeypot Check
    if (body.website_bot) {
      // Silently return true for bot submissions
      return NextResponse.json({ ok: true, message: 'Submission successful' }, { status: 200 });
    }

    const newLead = await Lead.create(body);
    return NextResponse.json(newLead, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to submit lead', details: error.message }, { status: 400 });
  }
}
