import Link from "next/link";
import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Your Website</title>
      </head>
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif" }}>
        <header style={{
          background: "#f8f9fa",
          padding: "1rem 2rem",
          borderBottom: "1px solid #e9ecef",
          position: "sticky",
          top: 0,
          zIndex: 100
        }}>
          <nav style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            maxWidth: "1200px",
            margin: "0 auto"
          }}>
            <Link href="/" style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              textDecoration: "none",
              color: "#333"
            }}>
              Your Name
            </Link>
            
            <div style={{ display: "flex", gap: "2rem" }}>
              <Link href="/" style={linkStyle}>Home</Link>
              <Link href="/about" style={linkStyle}>About</Link>
              <Link href="/blog" style={linkStyle}>Blog</Link>
              <Link href="/projects" style={linkStyle}>Projects</Link>
              <Link href="/contact" style={linkStyle}>Contact</Link>
            </div>
          </nav>
        </header>
        
        <main style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "2rem"
        }}>
          {children}
        </main>
        
        <footer style={{
          background: "#f8f9fa",
          padding: "2rem",
          marginTop: "4rem",
          borderTop: "1px solid #e9ecef",
          textAlign: "center" as const
        }}>
          <p style={{ margin: 0, color: "#666" }}>
            © 2025 Your Name. Built with Next.js and TinaCMS.
          </p>
        </footer>
      </body>
    </html>
  );
}

const linkStyle = {
  textDecoration: "none",
  color: "#333",
  fontWeight: "500" as const,
  padding: "0.5rem 1rem",
  borderRadius: "4px",
  transition: "background-color 0.2s",
};

// Add hover effect with CSS-in-JS alternative
// You can add proper CSS later for better hover effects
