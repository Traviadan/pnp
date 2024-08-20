
import { redirect } from 'next/navigation';
import { destroySession } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function GET() {
  await destroySession();
  revalidatePath('/');
  redirect('/');
}