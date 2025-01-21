import useSWR from 'swr';
import { useEffect } from 'react';
import Image from 'next/image';

async function fetcher(url: string) {
  const res = await fetch(url);
  return res.json();
}

export default function NowPlaying() {
  const { data } = useSWR('/api/spotify/now-playing', fetcher, {
    refreshInterval: 5000,
  });

  if (!data) {
    return null;
  }

  return (
    <div className="flex items-center gap-4 rounded-lg bg-neutral-100 p-4 dark:bg-neutral-900">
      {data.albumImageUrl && (
        <Image
          alt={data.album}
          src={data.albumImageUrl}
          width={60}
          height={60}
          className="rounded-md"
        />
      )}
      <div className="flex flex-col">
        {data.isPlaying ? (
          <>
            <a
              className="font-medium text-neutral-800 hover:underline dark:text-neutral-200"
              href={data.songUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {data.title}
            </a>
            <span className="text-neutral-600 dark:text-neutral-400">
              {data.artist}
            </span>
          </>
        ) : (
          <span className="text-neutral-600 dark:text-neutral-400">
            Not playing anything
          </span>
        )}
      </div>
    </div>
  );
} 