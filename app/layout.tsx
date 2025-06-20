import Link from "next/link";
import React from "react";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>My Portfolio</title>
        <meta name="description" content="Personal portfolio and blog showcasing my work and thoughts" />
      </head>
      <body>
        <header className="header">
          <div className="container">
            <nav className="nav">
              <Link href="/" className="nav-brand">
                Securi-Tee
              </Link>
              
              <div className="nav-links">
                <Link href="/" className="nav-link">Home</Link>
                <Link href="/blog" className="nav-link">Blog</Link>
                <Link href="/about" className="nav-link">About</Link>
              </div>
            </nav>
          </div>
        </header>
        
        <main className="container">
          {children}
        </main>
        
        <footer className="footer">
          <div className="footer-content">
            <p>© 2025 Securi-Tee.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}

// Add hover effect with CSS-in-JS alternative
// You can add proper CSS later for better hover effects
