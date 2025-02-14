"use client";
import Link from 'next/link';
import { PiShoppingCartSimpleFill } from 'react-icons/pi';
import { useCartStore } from '@/components/zustand-store/useCartStore';
import './Header.css';

const Header = () => {
  const { carts } = useCartStore();
  const cartsCount = carts.length;

  return (
    <div className="header-container">
      <div className="menu-items">
        <Link href="/" className="menu-item">Home</Link>
        <Link href="/about" className="menu-item">About</Link>

        <div className="cart-menu-item">
          <Link href="/cart" className="menu-item">Cart</Link>
          <PiShoppingCartSimpleFill style={{ color: '#E30613', marginLeft: '5px' }} />
          <span className="carts-count">{cartsCount}</span>
        </div>
      </div>

      <div className="right-section">
        <Link href="/" className="bosta-link">
          <span className="bosta-logo">BOSTA</span>
          <span className="bosta-products hidden-sm">products</span>
        </Link>
      </div>
    </div>
  );
};

export default Header;
