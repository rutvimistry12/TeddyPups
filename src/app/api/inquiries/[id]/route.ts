import { NextResponse } from 'next/server';
import { updateInquiryStatus, deleteInquiry } from '@/lib/data-store';
import { verifyAdminSession } from '@/lib/auth';
import { inquiryUpdateSchema } from '@/lib/validation';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await verifyAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const parsed = inquiryUpdateSchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json({ success: false, message: 'Invalid inquiry update.', issues: parsed.error.issues }, { status: 400 });
    }
    const updated = await updateInquiryStatus(params.id, parsed.data.status, parsed.data.internalNotes);
    if (!updated) {
      return NextResponse.json({ success: false, message: 'Inquiry not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, inquiry: updated });
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
    const deleted = await deleteInquiry(params.id);
    return NextResponse.json({ success: deleted });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

