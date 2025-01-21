import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      console.log('Access Token:', session.accessToken);
      console.log('Refresh Token:', session.refreshToken);
      console.log('Full Session:', JSON.stringify(session, null, 2));
    }
  }, [session]);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      backgroundColor: '#f5f5f5'
    }}>
      <div style={{
        padding: '2rem',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        textAlign: 'center'
      }}>
        <h1 style={{ marginBottom: '1.5rem' }}>Spotify Login</h1>
        <button
          onClick={() => signIn('spotify', { callbackUrl: '/secret' })}
          style={{
            backgroundColor: '#1DB954',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '20px',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1ed760'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#1DB954'}
        >
          Sign in with Spotify
        </button>
      </div>
    </div>
  );
} 