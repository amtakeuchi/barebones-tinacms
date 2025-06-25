import Link from "next/link";
import React from "react";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import { MobileNav } from "./components/MobileNav";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Securi-Tee</title>
        <meta name="description" content="Cybersecurity professional portfolio and blog showcasing threat analysis, incident response, and security projects" />
      </head>
      <body>
        <ThemeProvider>
          <header className="header">
            <div className="container">
              <nav className="nav">
                <Link href="/" className="nav-brand">
                  Securi-Tee
                </Link>
                
                {/* Navigation (handles both desktop and mobile) */}
                <MobileNav />
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
        </ThemeProvider>
      </body>
    </html>
  );
}

// Add hover effect with CSS-in-JS alternative
// You can add proper CSS later for better hover effects
