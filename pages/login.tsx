import { signIn, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const { data: session, status } = useSession();
  const [debugInfo, setDebugInfo] = useState<any>(null);

  useEffect(() => {
    if (session) {
      setDebugInfo(session);
    }
  }, [session]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-4">
      <button
        onClick={() => signIn('spotify', { 
          callbackUrl: '/login',
          redirect: true
        })}
        className="rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600"
      >
        Sign in with Spotify
      </button>
      
      {status === 'authenticated' && (
        <div className="mt-4 max-w-xl overflow-auto rounded bg-gray-100 p-4">
          <p>Authentication successful! Check the browser console for the refresh token.</p>
          <pre className="text-xs">
            {JSON.stringify(debugInfo, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
