import { NextResponse } from 'next/server';
import { getWebsiteSettings, updateWebsiteSettings } from '@/lib/data-store';
import { verifyAdminSession } from '@/lib/auth';
import { websiteSettingsSchema } from '@/lib/validation';

export async function GET() {
  const settings = await getWebsiteSettings();
  return NextResponse.json({ success: true, settings });
}

export async function PATCH(req: Request) {
  const session = await verifyAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const parsed = websiteSettingsSchema.partial().safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ success: false, message: 'Invalid website settings.', issues: parsed.error.issues }, { status: 400 });
    }
    const updated = await updateWebsiteSettings(parsed.data);
    return NextResponse.json({ success: true, settings: updated });
  } catch {
    return NextResponse.json({ success: false, message: 'Unable to update website settings.' }, { status: 500 });
  }
}

