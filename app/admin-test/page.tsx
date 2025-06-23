export default async function AdminTestPage() {
  const buildTime = new Date().toISOString();
  
  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Admin Files Test</h1>
      
      <div style={{ marginBottom: "2rem" }}>
        <h2>Build Time:</h2>
        <p>{buildTime}</p>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h2>Admin File Links:</h2>
        <ul>
          <li>
            <a href="/admin/index.html" target="_blank" rel="noopener noreferrer">
              Admin Index HTML
            </a>
          </li>
          <li>
            <a href="/admin/assets/" target="_blank" rel="noopener noreferrer">
              Admin Assets Directory
            </a>
          </li>
        </ul>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h2>Direct Admin Access:</h2>
        <p>
          <a href="/admin/index.html" target="_blank" rel="noopener noreferrer" 
             style={{ 
               display: "inline-block", 
               padding: "1rem 2rem", 
               background: "#0070f3", 
               color: "white", 
               textDecoration: "none", 
               borderRadius: "8px" 
             }}>
            Open Admin Interface
          </a>
        </p>
      </div>

      <div style={{ marginTop: "2rem", padding: "1rem", background: "#fff3cd", borderRadius: "4px" }}>
        <h3>If you still get CORS errors:</h3>
        <ol>
          <li>Go to <a href="https://app.tina.io" target="_blank" rel="noopener noreferrer">TinaCMS Dashboard</a></li>
          <li>Find your project (Client ID: faf7ec7a-b6d8-413c-b757-bcc24523072c)</li>
          <li>Go to Settings → Allowed Origins</li>
          <li>Add: <code>https://barebones-tinacms.vercel.app</code></li>
          <li>Save and try again</li>
        </ol>
      </div>
    </div>
  );
} 