export default function AdminTestPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-4">Environment Variables Test</h1>
      <div className="bg-gray-100 p-4 rounded-lg">
        <p><strong>NEXT_PUBLIC_TINA_CLIENT_ID:</strong> {process.env.NEXT_PUBLIC_TINA_CLIENT_ID || 'NOT SET'}</p>
        <p><strong>NEXT_PUBLIC_TINA_BRANCH:</strong> {process.env.NEXT_PUBLIC_TINA_BRANCH || 'NOT SET'}</p>
        <p><strong>NODE_ENV:</strong> {process.env.NODE_ENV}</p>
        <p><strong>VERCEL_ENV:</strong> {process.env.VERCEL_ENV || 'NOT SET'}</p>
      </div>
    </div>
  );
} 