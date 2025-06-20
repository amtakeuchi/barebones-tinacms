export default async function TinaTestPage() {
  let testResult = "Testing TinaCMS connection...";
  let clientConfig = "Loading...";
  let importError: string | null = null;

  try {
    // Try to import the client
    const { client } = await import("../../tina/__generated__/client");
    
    // Test the client configuration
    clientConfig = JSON.stringify({
      url: (client as any).url,
      token: (client as any).token ? "SET" : "NOT SET",
      queries: Object.keys((client as any).queries || {})
    }, null, 2);

    // Try a simple query
    const result = await client.queries.pageConnection();
    testResult = `✅ Success! Found ${result.data.pageConnection.edges?.length || 0} pages`;
  } catch (error) {
    if (error instanceof Error && error.message.includes('Cannot find module')) {
      importError = `Import Error: ${error.message}`;
      testResult = "❌ Failed to import TinaCMS client";
    } else {
      testResult = `❌ Error: ${error instanceof Error ? error.message : String(error)}`;
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-4">TinaCMS Connection Test</h1>
      
      {importError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <strong>Import Error:</strong> {importError}
        </div>
      )}
      
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h2 className="text-lg font-semibold mb-2">Connection Test:</h2>
        <p className="font-mono text-sm">{testResult}</p>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Client Configuration:</h2>
        <pre className="text-xs overflow-auto bg-white p-2 rounded border">
          {clientConfig}
        </pre>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg mt-6">
        <h2 className="text-lg font-semibold mb-2">Environment Variables:</h2>
        <pre className="text-xs overflow-auto bg-white p-2 rounded border">
          {JSON.stringify({
            NEXT_PUBLIC_TINA_CLIENT_ID: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
            NEXT_PUBLIC_TINA_BRANCH: process.env.NEXT_PUBLIC_TINA_BRANCH,
            TINA_TOKEN: process.env.TINA_TOKEN ? "SET" : "NOT SET",
            NODE_ENV: process.env.NODE_ENV,
            VERCEL_ENV: process.env.VERCEL_ENV
          }, null, 2)}
        </pre>
      </div>
    </div>
  );
} 