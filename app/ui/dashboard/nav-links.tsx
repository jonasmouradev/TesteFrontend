'use client';

import {
  UserGroupIcon,
  TvIcon,
  BookOpenIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
  { name: 'Personagens', href: '/dashboard', icon: UserGroupIcon },
  {
    name: 'Series',
    href: '/dashboard/series',
    icon: TvIcon,
  },
  { name: 'Quadrinhos', href: '/dashboard/comics', icon: BookOpenIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={{ pathname: link.href }}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-red-200 hover:text-red-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-red-100 text-red-500': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
