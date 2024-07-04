type NavLink = {
  href: string;
  label: string;
};

export const publicLinks: NavLink[] = [
  { href: '/', label: 'home' },
  { href: '/about', label: 'about' },
];

export const privateLinks: NavLink[] = [
  { href: '/heroes', label: 'characters' },
  { href: '/admin/dashboard', label: 'dashboard' },
];

export const adminLinks: NavLink[] = [
  { href: '/admin/attributes', label: 'attributes' },
];
