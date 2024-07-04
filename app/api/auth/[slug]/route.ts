import { destroySession } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from 'next/navigation';

export async function GET(req: Request, { params }: { params: { slug: string } }) {
  const slug = params.slug;
  if (slug == '') redirect ('/');

  if (slug == 'sign-out') {
    await destroySession();
    revalidatePath('/auth/sign-in');
    redirect('/auth/sign-in');
  }
}