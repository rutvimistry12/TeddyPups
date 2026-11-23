import { NextResponse } from 'next/server';
import { getPuppies, createPuppy } from '@/lib/data-store';
import { verifyAdminSession } from '@/lib/auth';
import { puppySchema } from '@/lib/validation';
import { z } from 'zod';

const filtersSchema = z.object({
  breed: z.string().max(100).optional(),
  gender: z.enum(['MALE', 'FEMALE']).optional(),
  status: z.enum(['AVAILABLE', 'RESERVED', 'PENDING', 'GONE_HOME']).optional(),
  origin: z.enum(['LOCAL_DUBAI', 'IMPORTED']).optional(),
  search: z.string().trim().max(100).optional(),
  minPrice: z.coerce.number().finite().min(0).optional(),
  maxPrice: z.coerce.number().finite().min(0).optional(),
  featured: z.enum(['true', 'false']).optional(),
  sortBy: z.enum(['price_asc', 'price_desc', 'age_asc', 'newest']).optional(),
}).refine(
  (filters) => filters.minPrice === undefined || filters.maxPrice === undefined || filters.minPrice <= filters.maxPrice,
  { message: 'Minimum price cannot exceed maximum price.' }
);

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const parsedFilters = filtersSchema.safeParse(Object.fromEntries(searchParams.entries()));
    if (!parsedFilters.success) {
      return NextResponse.json({ success: false, message: 'Invalid puppy filters.', issues: parsedFilters.error.issues }, { status: 400 });
    }
    const filters = parsedFilters.data;

    const puppies = await getPuppies({
      breed: filters.breed,
      gender: filters.gender,
      status: filters.status,
      origin: filters.origin,
      search: filters.search,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      featuredOnly: filters.featured === 'true',
      sortBy: filters.sortBy,
    });

    return NextResponse.json({ success: true, count: puppies.length, puppies });
  } catch {
    return NextResponse.json({ success: false, message: 'Unable to load puppies right now.' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await verifyAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const parsed = puppySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ success: false, message: 'Invalid puppy details.', issues: parsed.error.issues }, { status: 400 });
    }
    const newPuppy = await createPuppy(parsed.data);
    return NextResponse.json({ success: true, puppy: newPuppy });
  } catch {
    return NextResponse.json({ success: false, message: 'Unable to create puppy profile.' }, { status: 500 });
  }
}

