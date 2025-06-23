'use client';

import { useEffect, useState } from 'react';

export default function AdminPage() {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Redirect to the TinaCMS admin interface
    const redirectToTinaAdmin = () => {
      try {
        // Check if we're in development mode
        if (process.env.NODE_ENV === 'development') {
          window.location.href = '/admin/index.html';
        } else {
          // In production, try to use the API proxy
          window.location.href = '/admin/index.html';
        }
      } catch (err) {
        setError('Failed to load admin interface');
      }
    };

    redirectToTinaAdmin();
  }, []);

  if (error) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h1>Admin Access Error</h1>
        <p>{error}</p>
        <p>
          <strong>Troubleshooting:</strong>
        </p>
        <ul style={{ textAlign: "left", maxWidth: "600px", margin: "0 auto" }}>
          <li>Make sure your TinaCMS project has your domain in allowed origins</li>
          <li>Check that your environment variables are set correctly</li>
          <li>Try accessing the admin at: <code>/admin/index.html</code></li>
        </ul>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Loading Admin Interface...</h1>
      <p>Redirecting to TinaCMS admin...</p>
    </div>
  );
} 