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
      {/* Desktop Navigation - Single Line */}
      <nav className="nav-links desktop-nav" role="navigation" aria-label="Main navigation">
        <Link href="/" className={`nav-link ${isActive('/') ? 'active' : ''}`} aria-current={isActive('/') ? 'page' : undefined}>Home</Link>
        <Link href="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`} aria-current={isActive('/about') ? 'page' : undefined}>About</Link>
        <Link href="/blog" className={`nav-link ${isActive('/blog') ? 'active' : ''}`} aria-current={isActive('/blog') ? 'page' : undefined}>Blog</Link>
        <Link href="/projects" className={`nav-link ${isActive('/projects') ? 'active' : ''}`} aria-current={isActive('/projects') ? 'page' : undefined}>Projects</Link>
        <Link href="/contact" className={`nav-link ${isActive('/contact') ? 'active' : ''}`} aria-current={isActive('/contact') ? 'page' : undefined}>Contact</Link>
        <div className="theme-toggle-wrapper">
          <ThemeToggle />
        </div>
      </nav>

      {/* Mobile Hamburger Button */}
      <button 
        onClick={toggleMenu} 
        className="mobile-nav-toggle" 
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>
      
      {/* Mobile Navigation Menu */}
      <nav 
        id="mobile-menu"
        className={`nav-links mobile-menu ${isOpen ? 'active' : ''}`} 
        role="navigation" 
        aria-label="Mobile navigation"
        aria-hidden={!isOpen}
      >
        <Link 
          href="/" 
          className={`nav-link ${isActive('/') ? 'active' : ''}`}
          onClick={closeMenu}
          aria-current={isActive('/') ? 'page' : undefined}
        >
          Home
        </Link>
        <Link 
          href="/about" 
          className={`nav-link ${isActive('/about') ? 'active' : ''}`}
          onClick={closeMenu}
          aria-current={isActive('/about') ? 'page' : undefined}
        >
          About
        </Link>
        <Link 
          href="/blog" 
          className={`nav-link ${isActive('/blog') ? 'active' : ''}`}
          onClick={closeMenu}
          aria-current={isActive('/blog') ? 'page' : undefined}
        >
          Blog
        </Link>
        <Link 
          href="/projects" 
          className={`nav-link ${isActive('/projects') ? 'active' : ''}`}
          onClick={closeMenu}
          aria-current={isActive('/projects') ? 'page' : undefined}
        >
          Projects
        </Link>
        <Link 
          href="/contact" 
          className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
          onClick={closeMenu}
          aria-current={isActive('/contact') ? 'page' : undefined}
        >
          Contact
        </Link>
        <div className="mobile-theme-toggle">
          <ThemeToggle />
        </div>
      </nav>
    </div>
  );
} 