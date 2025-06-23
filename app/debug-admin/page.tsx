'use client';

import { useEffect, useState } from 'react';

export default function DebugAdminPage() {
  const [debugInfo, setDebugInfo] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const gatherDebugInfo = async () => {
      const info: any = {
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        location: window.location.href,
        origin: window.location.origin,
        protocol: window.location.protocol,
        hostname: window.location.hostname,
        port: window.location.port,
        pathname: window.location.pathname,
      };

      // Test various endpoints
      const endpoints = [
        '/admin/index.html',
        '/admin/assets/',
        '/api/tina/test',
        '/tina-test',
        '/force-rebuild'
      ];

      for (const endpoint of endpoints) {
        try {
          const response = await fetch(endpoint);
          info[endpoint] = {
            status: response.status,
            statusText: response.statusText,
            ok: response.ok,
            headers: Object.fromEntries(response.headers.entries())
          };
        } catch (error: any) {
          info[endpoint] = {
            error: error.message,
            type: error.name
          };
        }
      }

      // Test TinaCMS identity endpoints
      const tinaEndpoints = [
        'https://identity.tinajs.io/v2/apps/faf7ec7a-b6d8-413c-b757-bcc24523072c',
        'https://identity.tinajs.io/v2/apps/faf7ec7a-b6d8-413c-b757-bcc24523072c/currentUser',
        'https://identity.tinajs.io/v2/apps/faf7ec7a-b6d8-413c-b757-bcc24523072c/billing/state'
      ];

      for (const endpoint of tinaEndpoints) {
        try {
          const response = await fetch(endpoint, {
            method: 'OPTIONS',
            mode: 'cors'
          });
          info[`tina_${endpoint.split('/').pop()}`] = {
            status: response.status,
            statusText: response.statusText,
            cors: response.headers.get('access-control-allow-origin'),
            headers: Object.fromEntries(response.headers.entries())
          };
        } catch (error: any) {
          info[`tina_${endpoint.split('/').pop()}`] = {
            error: error.message,
            type: error.name
          };
        }
      }

      setDebugInfo(info);
      setIsLoading(false);
    };

    gatherDebugInfo();
  }, []);

  if (isLoading) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h1>Gathering Debug Information...</h1>
        <p>Please wait while we test various endpoints...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <h1>Admin Debug Information</h1>
      
      <div style={{ marginBottom: "2rem" }}>
        <h2>Environment Info:</h2>
        <pre style={{ background: "#f5f5f5", padding: "1rem", borderRadius: "4px", overflow: "auto" }}>
          {JSON.stringify({
            timestamp: debugInfo.timestamp,
            userAgent: debugInfo.userAgent,
            location: debugInfo.location,
            origin: debugInfo.origin,
            protocol: debugInfo.protocol,
            hostname: debugInfo.hostname,
            port: debugInfo.port,
            pathname: debugInfo.pathname,
          }, null, 2)}
        </pre>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h2>Local Endpoints Test:</h2>
        <pre style={{ background: "#f5f5f5", padding: "1rem", borderRadius: "4px", overflow: "auto" }}>
          {JSON.stringify({
            '/admin/index.html': debugInfo['/admin/index.html'],
            '/admin/assets/': debugInfo['/admin/assets/'],
            '/api/tina/test': debugInfo['/api/tina/test'],
            '/tina-test': debugInfo['/tina-test'],
            '/force-rebuild': debugInfo['/force-rebuild']
          }, null, 2)}
        </pre>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h2>TinaCMS Identity Endpoints Test:</h2>
        <pre style={{ background: "#f5f5f5", padding: "1rem", borderRadius: "4px", overflow: "auto" }}>
          {JSON.stringify({
            'tina_project': debugInfo['tina_faf7ec7a-b6d8-413c-b757-bcc24523072c'],
            'tina_currentUser': debugInfo['tina_currentUser'],
            'tina_billing/state': debugInfo['tina_billing/state']
          }, null, 2)}
        </pre>
      </div>

      <div style={{ marginTop: "2rem", padding: "1rem", background: "#fff3cd", borderRadius: "4px" }}>
        <h3>Key Things to Check:</h3>
        <ul>
          <li><strong>CORS Headers:</strong> Look for &apos;access-control-allow-origin&apos; in TinaCMS responses</li>
          <li><strong>Status Codes:</strong> Check if endpoints return 200, 401, or CORS errors</li>
          <li><strong>Environment:</strong> Compare local vs production behavior</li>
          <li><strong>Domain:</strong> Verify the exact domain being used matches allowed origins</li>
        </ul>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <h3>Quick Tests:</h3>
        <p>
          <a href="/admin/index.html" target="_blank" rel="noopener noreferrer" 
             style={{ marginRight: "1rem", padding: "0.5rem 1rem", background: "#0070f3", color: "white", textDecoration: "none", borderRadius: "4px" }}>
            Test Admin Direct
          </a>
          <a href="/admin" 
             style={{ marginRight: "1rem", padding: "0.5rem 1rem", background: "#28a745", color: "white", textDecoration: "none", borderRadius: "4px" }}>
            Test Admin Page
          </a>
          <a href="/tina-test" 
             style={{ padding: "0.5rem 1rem", background: "#ffc107", color: "black", textDecoration: "none", borderRadius: "4px" }}>
            Test TinaCMS
          </a>
        </p>
      </div>
    </div>
  );
} 