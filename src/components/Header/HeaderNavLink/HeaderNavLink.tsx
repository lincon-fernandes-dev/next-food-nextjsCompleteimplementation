'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import classes from './headerNavLink.module.css';

export default function HeaderNavLinkComponent({ href, children }: { href: string; children: React.ReactNode }) {
  const path = usePathname();

  return (
    <Link
      href={href}
      className={
        path.startsWith(href)
          ? `${classes.link} ${classes.active}`
          : classes.link
      }
    >
      {children}
    </Link>
  );
}