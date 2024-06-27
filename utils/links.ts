type NavLink = {
  href: string;
  label: string;
};

export const links: NavLink[] = [
  { href: '/', label: 'home' },
  { href: '/about', label: 'about' },
  { href: '/heroes', label: 'characters' },
  { href: '/admin/dashboard', label: 'dashboard' },
];

export const adminLinks: NavLink[] = [
  { href: '/admin/attributes', label: 'attributes' },
];
