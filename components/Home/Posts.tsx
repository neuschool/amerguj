import Link from "next/link";
import { formatDate } from "../../lib/formatDate";
import { useQuery } from "@apollo/client";
import { QUERY_PAGE_HOME } from "../../graphql/queries";

export default function Posts() {
  const { data } = useQuery(QUERY_PAGE_HOME);
  const posts = data?.posts || [];

  if (!posts.length) {
    return null;
  }

  return (
    <dl className="list-container">
      <dt className="list-title">
        <h3 className="text-neutral-500 dark:text-silver-dark">Latest Posts</h3>
      </dt>
      <dd className="list-content">
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/posts/${post.slug}`}
                className="block transition-colors hover:text-accent"
              >
                <time className="text-sm text-neutral-500">
                  {post.publishedDate ? formatDate(post.publishedDate) : "No date"}
                </time>
                <h4 className="mt-1">{post.title}</h4>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <Link href="/posts" className="text-accent hover:text-accent-dark">
            View all posts →
          </Link>
        </div>
      </dd>
    </dl>
  );
}
