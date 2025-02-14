"use client";

import Link from 'next/link';
import "./MenuItem.css";
interface MenuItemProps {
  title: string;
  address: string;
}

function MenuItem({ title, address }: MenuItemProps) {
    return (
      <Link href={address}>
        <p className='menu-title'>{title}</p>
      </Link>
    );
}

export default MenuItem;
