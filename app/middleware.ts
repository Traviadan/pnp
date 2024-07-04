import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { isAuthenticated, isAdminUser } from '@/lib/helper';
import { publicLinks, privateLinks, adminLinks } from '@/lib/links';

// Set the paths that don't require the user to be signed in
const publicPaths = publicLinks.map((item) => {
  const { href } = item;
  return href;
});
const privatePaths = privateLinks.map((item) => {
  const { href } = item;
  return href;
});
const adminPaths = adminLinks.map((item) => {
  const { href } = item;
  return href;
});
 
const isPublic = (path: string) => {
  return publicPaths.find((x) =>
    path.match(new RegExp(`^${x}$`.replace("*$", "($|/)")))
  );
};
const isPrivate = (path: string) => {
  return privatePaths.find((x) =>
    path.match(new RegExp(`^${x}$`.replace("*$", "($|/)")))
  );
};
const isAdmin = (path: string) => {
  return adminPaths.find((x) =>
    path.match(new RegExp(`^${x}$`.replace("*$", "($|/)")))
  );
};

export async function middleware(request: NextRequest) {
  if (isPublic(request.nextUrl.pathname)) {
    return NextResponse.next();
  } else if (isPrivate(request.nextUrl.pathname)) {
    if (await isAuthenticated()) {
      return NextResponse.next();
    }
  } else if (isAdmin(request.nextUrl.pathname)) {
    if (await isAdminUser()) {
      return NextResponse.next();
    }
  }
  return NextResponse.redirect('/');
}

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
