import { NextResponse } from 'next/server';
import { getDashboardStats } from '@/lib/data-store';
import { verifyAdminSession } from '@/lib/auth';

export async function GET() {
  const session = await verifyAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const stats = await getDashboardStats();
    return NextResponse.json({ success: true, stats });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

