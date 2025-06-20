import { client } from "../../tina/__generated__/client";

export default async function TinaTestPage() {
  let testResult = "Testing TinaCMS connection...";
  let clientConfig = "Loading...";

  try {
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
    testResult = `❌ Error: ${error instanceof Error ? error.message : String(error)}`;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-4">TinaCMS Connection Test</h1>
      
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
    </div>
  );
} 