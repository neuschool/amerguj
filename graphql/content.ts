const CONTENTFUL_SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const CONTENTFUL_ACCESS_TOKEN = process.env.CONTENTFUL_DELIVERY;

export async function fetchFromContentful(query: string) {
  if (!CONTENTFUL_SPACE_ID || !CONTENTFUL_ACCESS_TOKEN) {
    throw new Error('Required Contentful environment variables are not set');
  }

  const response = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${CONTENTFUL_SPACE_ID}/environments/master`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CONTENTFUL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ query }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    console.error('Contentful API error:', error);
    throw new Error(`Failed to fetch from Contentful: ${response.statusText}`);
  }

  return response.json();
} 