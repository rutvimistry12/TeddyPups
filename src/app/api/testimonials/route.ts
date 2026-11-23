import { NextResponse } from 'next/server';
import { getTestimonials, createTestimonial } from '@/lib/data-store';
import { verifyAdminSession } from '@/lib/auth';
import { testimonialSchema } from '@/lib/validation';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const all = searchParams.get('all') === 'true';
    if (all && !(await verifyAdminSession())) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }
    const list = await getTestimonials(!all);
    return NextResponse.json({ success: true, testimonials: list });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await verifyAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const parsed = testimonialSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ success: false, message: 'Invalid testimonial details.', issues: parsed.error.issues }, { status: 400 });
    }
    const created = await createTestimonial(parsed.data);
    return NextResponse.json({ success: true, testimonial: created });
  } catch {
    return NextResponse.json({ success: false, message: 'Unable to save testimonial.' }, { status: 500 });
  }
}

