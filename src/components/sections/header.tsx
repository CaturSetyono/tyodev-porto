// components/Navbar.tsx
'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <nav className="flex items-center justify-between p-6 text-white">
      <div className="text-lg font-semibold">MAPPETPLACE</div>
      <ul className="flex space-x-6 text-sm">
        <li><Link href="#">Directory</Link></li>
        <li><Link href="#">Resources</Link></li>
        <li><Link href="#">Solutions</Link></li>
        <li><Link href="#">Blog</Link></li>
        <li><Link href="#">Careers</Link></li>
        <li><Link href="#"><span className="text-xl">🔍</span></Link></li>
      </ul>
    </nav>
  );
}
