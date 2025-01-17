import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { QUERY_PAGE_HOME } from '../../graphql/queries';

export default function Posts() {
  const { data } = useQuery(QUERY_PAGE_HOME);

  if (!data?.postCollection?.items?.length) {
    return null;
  }

  return (
    <dl className="list-container">
      <dt className="list-title border-t border-neutral-500/10 dark:border-neutral-900 pt-16 pb-2 leading-relaxed">
        Writing
      </dt>
      <dd className="list-content pt-8">
        <ul className="space-y-4">
          {data.postCollection.items.map((post) => (
            <li key={post.slug}>
              <Link href={`/posts/${post.slug}`} className="link-fade">
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <Link href="/posts" className="link-fade">
            View all
          </Link>
        </div>
      </dd>
    </dl>
  );
}
