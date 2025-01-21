import { NextApiRequest, NextApiResponse } from 'next';
import { getRecentlyPlayed } from '../../../lib/spotify';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await getRecentlyPlayed();

    if (response.status === 204 || response.status > 400) {
      console.log('No content or error from Spotify API:', response.status);
      return res.status(200).json({ tracks: [] });
    }

    const data = await response.json();
    console.log('Spotify API response:', data);

    if (!data.items || !Array.isArray(data.items)) {
      console.error('Invalid response format from Spotify API');
      return res.status(200).json({ tracks: [] });
    }

    const tracks = data.items.map((item: any) => ({
      title: item.track.name,
      artist: item.track.artists.map((_artist: any) => _artist.name).join(', '),
      url: item.track.external_urls.spotify,
    }));

    return res.status(200).json({ tracks });
  } catch (error) {
    console.error('Error in recently-played API route:', error);
    return res.status(500).json({ error: 'Failed to fetch recently played tracks' });
  }
} 