const getEnvVar = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

export const config = {
  contentful: {
    spaceId: getEnvVar('CONTENTFUL_SPACE_ID'),
    accessToken: getEnvVar('CONTENTFUL_ACCESS_TOKEN'),
  },
  nextAuth: {
    url: getEnvVar('NEXTAUTH_URL'),
    secret: getEnvVar('NEXTAUTH_SECRET'),
  },
  spotify: {
    clientId: getEnvVar('SPOTIFY_CLIENT_ID'),
    clientSecret: getEnvVar('SPOTIFY_CLIENT_SECRET'),
    refreshToken: getEnvVar('SPOTIFY_REFRESH_TOKEN'),
  },
  mapbox: {
    publicKey: getEnvVar('NEXT_PUBLIC_MAPBOX_KEY'),
  },
} as const; 