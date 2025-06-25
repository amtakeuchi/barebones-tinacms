'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './ThemeToggle';

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <div className="mobile-nav">
      {/* Desktop Navigation */}
      <div className="nav-links desktop-nav">
        <Link href="/" className="nav-link">Home</Link>
        <Link href="/about" className="nav-link">About</Link>
        <Link href="/blog" className="nav-link">Blog</Link>
        <Link href="/projects" className="nav-link">Projects</Link>
        <Link href="/contact" className="nav-link">Contact</Link>
        <ThemeToggle />
      </div>

      {/* Mobile Hamburger Button */}
      <button onClick={toggleMenu} className="mobile-nav-toggle" aria-label="Toggle navigation">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="24" height="24">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>
      
      {/* Mobile Navigation Menu */}
      <div className={`nav-links mobile-menu ${isOpen ? 'active' : ''}`}>
        <Link 
          href="/" 
          className={`nav-link ${isActive('/') ? 'active' : ''}`}
          onClick={closeMenu}
        >
          Home
        </Link>
        <Link 
          href="/about" 
          className={`nav-link ${isActive('/about') ? 'active' : ''}`}
          onClick={closeMenu}
        >
          About
        </Link>
        <Link 
          href="/blog" 
          className={`nav-link ${isActive('/blog') ? 'active' : ''}`}
          onClick={closeMenu}
        >
          Blog
        </Link>
        <Link 
          href="/projects" 
          className={`nav-link ${isActive('/projects') ? 'active' : ''}`}
          onClick={closeMenu}
        >
          Projects
        </Link>
        <Link 
          href="/contact" 
          className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
          onClick={closeMenu}
        >
          Contact
        </Link>
        <div className="mobile-theme-toggle">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
} 