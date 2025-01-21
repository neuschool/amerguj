import useSWR from 'swr';
import Link from 'next/link';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function RecentlyPlayed() {
  const { data } = useSWR('/api/spotify/recently-played', fetcher, {
    refreshInterval: 86400000, // 24 hours
  });

  return (
    <dl className="list-container">
      <dt className="list-title">
        <div className="text-neutral-500">Listening</div>
      </dt>
      <dd className="list-content">
        <div className="space-y-3">
          {data?.tracks?.map((track: any) => (
            <div key={track.url} className="flex justify-end items-center">
              <Link
                href={track.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center space-x-1 text-neutral-800 dark:text-silver hover:text-neutral-500 dark:hover:text-neutral-400"
              >
                <span>
                  <span className="underline decoration-1 underline-offset-4">{track.title}</span>
                  <span className="inline-block transform transition-transform group-hover:translate-x-0.5 mx-1">↗</span>
                  <span className="text-neutral-500">by {track.artist}</span>
                </span>
              </Link>
            </div>
          ))}
        </div>
      </dd>
    </dl>
  );
} 