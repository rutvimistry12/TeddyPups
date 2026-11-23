import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const TOKEN_NAME = 'teddypups_admin_token';

function getJwtSecret() {
  const secret = process.env.ADMIN_JWT_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error('ADMIN_JWT_SECRET must be configured with at least 32 characters');
  }
  return new TextEncoder().encode(secret);
}

export async function createAdminSession(adminPayload: { email: string; role: string }) {
  const token = await new SignJWT(adminPayload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(getJwtSecret());

  cookies().set(TOKEN_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24, // 24 hours
  });

  return token;
}

export async function verifyAdminSession() {
  const token = cookies().get(TOKEN_NAME)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, getJwtSecret());
    if (typeof payload.email !== 'string' || typeof payload.role !== 'string') return null;
    return { email: payload.email, role: payload.role };
  } catch {
    return null;
  }
}

export function clearAdminSession() {
  cookies().delete(TOKEN_NAME);
}

