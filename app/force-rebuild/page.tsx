export default function ForceRebuildPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-4">Force Rebuild Test</h1>
      <div className="bg-gray-100 p-4 rounded-lg">
        <p><strong>Build Time:</strong> {new Date().toISOString()}</p>
        <p><strong>NEXT_PUBLIC_TINA_TOKEN:</strong> {process.env.NEXT_PUBLIC_TINA_TOKEN ? "SET" : "NOT SET"}</p>
        <p><strong>Token Preview:</strong> {process.env.NEXT_PUBLIC_TINA_TOKEN ? process.env.NEXT_PUBLIC_TINA_TOKEN.substring(0, 10) + "..." : "NOT SET"}</p>
      </div>
    </div>
  );
} 