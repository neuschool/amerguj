// Debug all possible environment variables
console.log('All environment variables:', {
  CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
  CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
  NEXT_PUBLIC_CONTENTFUL_SPACE_ID: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

export const env = {
  CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
  CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
  NODE_ENV: process.env.NODE_ENV,
} as const;

// Validate environment variables
export function validateEnv() {
  const required = ['CONTENTFUL_SPACE_ID', 'CONTENTFUL_ACCESS_TOKEN'] as const;
  const missing = required.filter(key => !env[key]);
  
  console.log('Final environment state:', {
    env,
    missing,
  });
  
  if (missing.length > 0) {
    console.error('Environment validation failed:', {
      provided: Object.entries(env).reduce((acc, [key, value]) => ({
        ...acc,
        [key]: value ? 'set' : 'missing'
      }), {}),
      missing,
    });
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
  
  return env;
} 