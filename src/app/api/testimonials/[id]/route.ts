import { NextResponse } from 'next/server';
import { updateTestimonial, deleteTestimonial } from '@/lib/data-store';
import { verifyAdminSession } from '@/lib/auth';
import { testimonialUpdateSchema } from '@/lib/validation';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await verifyAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const parsed = testimonialUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ success: false, message: 'Invalid testimonial details.', issues: parsed.error.issues }, { status: 400 });
    }
    const updated = await updateTestimonial(params.id, parsed.data);
    if (!updated) {
      return NextResponse.json({ success: false, message: 'Testimonial not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, testimonial: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const session = await verifyAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const deleted = await deleteTestimonial(params.id);
    return NextResponse.json({ success: deleted });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

