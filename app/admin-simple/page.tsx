'use client';

import { useEffect, useState } from 'react';

export default function AdminSimplePage() {
  const [status, setStatus] = useState('Loading...');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testAdminAccess = async () => {
      try {
        setStatus('Testing admin access...');
        
        // Test if we can load the admin HTML
        const response = await fetch('/admin/index.html');
        
        if (!response.ok) {
          throw new Error(`Admin HTML not found: ${response.status}`);
        }
        
        setStatus('Admin HTML found, testing iframe...');
        
        // Try to create an iframe
        const iframe = document.createElement('iframe');
        iframe.src = '/admin/index.html';
        iframe.style.width = '100%';
        iframe.style.height = '100vh';
        iframe.style.border = 'none';
        
        iframe.onload = () => {
          setStatus('Admin interface loaded successfully!');
        };
        
        iframe.onerror = () => {
          setError('Failed to load admin interface in iframe');
        };
        
        // Add iframe to page
        const container = document.getElementById('admin-container');
        if (container) {
          container.appendChild(iframe);
        }
        
      } catch (err: any) {
        setError(err.message);
        setStatus('Failed');
      }
    };

    testAdminAccess();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Simple Admin Test</h1>
      
      <div style={{ marginBottom: "2rem" }}>
        <p><strong>Status:</strong> {status}</p>
        {error && (
          <div style={{ padding: "1rem", background: "#fee", border: "1px solid #fcc", borderRadius: "4px" }}>
            <strong>Error:</strong> {error}
          </div>
        )}
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h3>Direct Links:</h3>
        <p>
          <a href="/admin/index.html" target="_blank" rel="noopener noreferrer" 
             style={{ marginRight: "1rem", padding: "0.5rem 1rem", background: "#0070f3", color: "white", textDecoration: "none", borderRadius: "4px" }}>
            Open Admin in New Tab
          </a>
          <a href="/admin" 
             style={{ padding: "0.5rem 1rem", background: "#28a745", color: "white", textDecoration: "none", borderRadius: "4px" }}>
            Custom Admin Page
          </a>
        </p>
      </div>

      <div id="admin-container" style={{ border: "2px dashed #ccc", minHeight: "400px", padding: "1rem" }}>
        <p style={{ textAlign: "center", color: "#666" }}>
          Admin interface will load here...
        </p>
      </div>

      <div style={{ marginTop: "2rem", padding: "1rem", background: "#fff3cd", borderRadius: "4px" }}>
        <h3>Troubleshooting:</h3>
        <ul>
          <li>If you see CORS errors in the browser console, your domain needs to be added to Tina Cloud allowed origins</li>
          <li>If you see 401/403 errors, there might be a token or authentication issue</li>
          <li>Try opening the admin in a new tab to see the full error messages</li>
        </ul>
      </div>
    </div>
  );
} 