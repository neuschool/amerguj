import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { QUERY_POSTS } from '../../graphql/queries';

export default function Posts() {
  const { data, loading, error } = useQuery(QUERY_POSTS);

  if (!data?.postCollection?.items?.length) {
    return null;
  }

  const sortedPosts = [...data.postCollection.items].sort((a, b) => {
    return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
  });

  return (
    <div className="space-y-4">
      {sortedPosts.slice(0, 5).map((post) => (
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
