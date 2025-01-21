import useSWR from 'swr';
import Link from 'next/link';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function RecentlyPlayed() {
  const { data } = useSWR('/api/spotify/recently-played', fetcher, {
    refreshInterval: 86400000, // 24 hours
  });

  if (!data?.tracks?.length) {
    return null;
  }

  return (
    <dl className="list-container section-border">
      <dt className="list-title">
        <div className="text-neutral-500">Listening</div>
      </dt>
      <dd className="list-content">
        <div className="space-y-4">
          {data.tracks.map((track: any) => (
            <div key={track.url} className="text-base">
              <Link
                href={track.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group no-underline"
              >
                <span className="link">{track.title}</span>
                <span className="text-neutral-500 no-underline"> ↗</span>
              </Link>
              <span className="text-neutral-500"> by {track.artist}</span>
            </div>
          ))}
        </div>
      </dd>
    </dl>
  );
} 