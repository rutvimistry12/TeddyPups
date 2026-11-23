import { NextResponse } from 'next/server';
import { getInquiries, createInquiry } from '@/lib/data-store';
import { verifyAdminSession } from '@/lib/auth';
import { inquirySchema } from '@/lib/validation';

export async function GET() {
  const session = await verifyAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const list = await getInquiries();
    return NextResponse.json({ success: true, count: list.length, inquiries: list });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = inquirySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ success: false, message: 'Please check the inquiry details.', issues: parsed.error.issues }, { status: 400 });
    }
    const inq = await createInquiry(parsed.data);
    return NextResponse.json({ success: true, inquiry: inq });
  } catch {
    return NextResponse.json({ success: false, message: 'Unable to submit your inquiry right now.' }, { status: 400 });
  }
}

