import { client } from "../../tina/__generated__/client";

export default async function TinaTestPage() {
  const buildTime = new Date().toISOString();
  
  // Check environment variables
  const envVars = {
    NEXT_PUBLIC_TINA_CLIENT_ID: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
    NEXT_PUBLIC_TINA_BRANCH: process.env.NEXT_PUBLIC_TINA_BRANCH,
    NEXT_PUBLIC_TINA_TOKEN: process.env.NEXT_PUBLIC_TINA_TOKEN ? "SET" : "NOT SET",
    TINA_TOKEN: process.env.TINA_TOKEN ? "SET" : "NOT SET",
    NODE_ENV: process.env.NODE_ENV,
    VERCEL_ENV: process.env.VERCEL_ENV,
  };

  // Get token preview
  const tokenPreview = process.env.NEXT_PUBLIC_TINA_TOKEN 
    ? `${process.env.NEXT_PUBLIC_TINA_TOKEN.substring(0, 8)}...`
    : "NOT SET";

  let connectionTest = "Not tested";
  let clientConfig: { token: string; queries: string[] } | string = "Not available";

  try {
    // Test connection
    const result = await client.queries.pageConnection();
    connectionTest = "✅ Success";
    clientConfig = {
      token: process.env.NEXT_PUBLIC_TINA_TOKEN ? "SET" : "NOT SET",
      queries: Object.keys(client.queries),
    };
  } catch (error: any) {
    connectionTest = `❌ Error: ${error.message}`;
    clientConfig = {
      token: process.env.NEXT_PUBLIC_TINA_TOKEN ? "SET" : "NOT SET",
      queries: Object.keys(client.queries),
    };
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1>TinaCMS Connection Test</h1>
      
      <div style={{ marginBottom: "2rem" }}>
        <h2>Connection Test:</h2>
        <p>{connectionTest}</p>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h2>Client Configuration:</h2>
        <pre style={{ background: "#f5f5f5", padding: "1rem", borderRadius: "4px" }}>
          {JSON.stringify(clientConfig, null, 2)}
        </pre>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h2>Environment Variables:</h2>
        <pre style={{ background: "#f5f5f5", padding: "1rem", borderRadius: "4px" }}>
          {JSON.stringify(envVars, null, 2)}
        </pre>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h2>Token Preview:</h2>
        <p><strong>NEXT_PUBLIC_TINA_TOKEN:</strong> {tokenPreview}</p>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h2>Build Time:</h2>
        <p>{buildTime}</p>
      </div>

      <div style={{ marginTop: "2rem", padding: "1rem", background: "#fff3cd", borderRadius: "4px" }}>
        <h3>Troubleshooting Tips:</h3>
        <ul>
          <li>If token shows "NOT SET", check your environment variables in Vercel</li>
          <li>Make sure NEXT_PUBLIC_TINA_TOKEN is set in Vercel environment variables</li>
          <li>Verify your TinaCMS project settings and allowed origins</li>
          <li>Check that your token is valid and has the correct permissions</li>
        </ul>
      </div>
    </div>
  );
} 