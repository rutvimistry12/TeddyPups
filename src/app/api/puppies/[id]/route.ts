import { NextResponse } from 'next/server';
import { getPuppyBySlug, updatePuppy, deletePuppy } from '@/lib/data-store';
import { verifyAdminSession } from '@/lib/auth';
import { puppyUpdateSchema } from '@/lib/validation';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const puppy = await getPuppyBySlug(params.id);
    if (!puppy) {
      return NextResponse.json({ success: false, message: 'Puppy not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, puppy });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await verifyAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const parsed = puppyUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ success: false, message: 'Invalid puppy details.', issues: parsed.error.issues }, { status: 400 });
    }
    const updated = await updatePuppy(params.id, parsed.data);
    if (!updated) {
      return NextResponse.json({ success: false, message: 'Puppy not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, puppy: updated });
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
    const deleted = await deletePuppy(params.id);
    return NextResponse.json({ success: deleted });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

