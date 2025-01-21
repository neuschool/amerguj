import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { QUERY_POSTS } from '../../graphql/queries';
import { LinkExternal } from '../Links';

export default function Posts() {
  const { data, loading, error } = useQuery(QUERY_POSTS);

  if (!data?.postCollection?.items?.length) {
    return null;
  }

  return (
    <div className="space-y-4">
      {data.postCollection.items.slice(0, 5).map((post) => (
        <div key={post.slug} className="text-base">
          <Link href={`/posts/${post.slug}`} className="link">
            {post.title}
          </Link>
        </div>
      ))}
      <div className="mt-8">
        <Link href="/posts" className="link">
          View all
        </Link>
      </div>
    </div>
  );
}
