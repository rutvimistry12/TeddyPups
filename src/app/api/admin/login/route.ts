import { NextResponse } from 'next/server';
import { createAdminSession } from '@/lib/auth';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { isPostgresEnabled } from '@/lib/data-store';
import { prisma } from '@/lib/db';

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(req: Request) {
  try {
    const credentials = credentialsSchema.safeParse(await req.json());
    if (!credentials.success) {
      return NextResponse.json({ success: false, message: 'Enter a valid email and password' }, { status: 400 });
    }

    const email = credentials.data.email.toLowerCase();
    let role = 'SUPER_ADMIN';

    if (isPostgresEnabled) {
      const admin = await prisma.adminUser.findUnique({ where: { email } });
      if (!admin || !(await bcrypt.compare(credentials.data.password, admin.passwordHash))) {
        return NextResponse.json({ success: false, message: 'Invalid concierge email or password' }, { status: 401 });
      }
      role = admin.role;
    } else {
      const expectedEmail = process.env.ADMIN_EMAIL?.toLowerCase();
      const expectedPassword = process.env.ADMIN_PASSWORD;
      if (!expectedEmail || !expectedPassword) {
        return NextResponse.json({ success: false, message: 'Admin login is not configured' }, { status: 503 });
      }
      if (email !== expectedEmail || credentials.data.password !== expectedPassword) {
        return NextResponse.json({ success: false, message: 'Invalid concierge email or password' }, { status: 401 });
      }
    }

    await createAdminSession({ email, role });
    return NextResponse.json({ success: true, email, role });
  } catch {
    return NextResponse.json({ success: false, message: 'Unable to sign in right now' }, { status: 500 });
  }
}

