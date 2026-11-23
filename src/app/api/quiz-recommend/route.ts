import { NextResponse } from 'next/server';
import { recommendPuppiesForQuiz } from '@/lib/data-store';
import { quizAnswerSchema } from '@/lib/validation';

export async function POST(req: Request) {
  try {
    const parsed = quizAnswerSchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json({ success: false, message: 'Invalid quiz answers.', issues: parsed.error.issues }, { status: 400 });
    }
    const puppies = await recommendPuppiesForQuiz(parsed.data);
    return NextResponse.json({ success: true, puppies });
  } catch {
    return NextResponse.json({ success: false, message: 'Unable to find recommendations right now.' }, { status: 500 });
  }
}

