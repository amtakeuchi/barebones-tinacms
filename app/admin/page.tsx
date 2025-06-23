'use client';

import { useEffect, useState } from 'react';

export default function AdminPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if we can access the admin interface
    const checkAdminAccess = async () => {
      try {
        const response = await fetch('/admin/index.html');
        if (response.ok) {
          setIsLoading(false);
        } else {
          setError('Admin interface not found');
        }
      } catch (err) {
        setError('Failed to load admin interface');
        setIsLoading(false);
      }
    };

    checkAdminAccess();
  }, []);

  if (isLoading) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h1>Loading Admin Interface...</h1>
        <p>Please wait...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h1>Admin Access Error</h1>
        <p>{error}</p>
        <div style={{ marginTop: "2rem", padding: "1rem", background: "#f8f9fa", borderRadius: "8px" }}>
          <h3>Alternative Solutions:</h3>
          <ol style={{ textAlign: "left", maxWidth: "600px", margin: "0 auto" }}>
            <li>
              <strong>Add your domain to TinaCMS allowed origins:</strong>
              <br />
              Go to <a href="https://app.tina.io" target="_blank" rel="noopener noreferrer">https://app.tina.io</a> → Your Project → Settings → Allowed Origins → Add: <code>https://barebones-tinacms.vercel.app</code>
            </li>
            <li>
              <strong>Try direct access:</strong>
              <br />
              <a href="/admin/index.html" target="_blank" rel="noopener noreferrer">Open Admin Interface in New Tab</a>
            </li>
            <li>
              <strong>Use local development:</strong>
              <br />
              Run <code>npm run dev</code> locally and access admin at <code>http://localhost:3000/admin</code>
            </li>
          </ol>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <iframe
        src="/admin/index.html"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          margin: 0,
          padding: 0
        }}
        title="TinaCMS Admin"
      />
    </div>
  );
} 