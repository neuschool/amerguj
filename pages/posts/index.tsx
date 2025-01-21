import type { GetStaticProps } from "next";
import Link from "next/link";
import React from "react";
import { Main } from "../../components/Layouts";
import { SEO } from "../../components/SEO";
import { initializeApollo } from "../../graphql/client";
import { QUERY_POSTS } from "../../graphql/queries";
import { formatDate } from "../../lib/formatDate";

interface Post {
  slug: string;
  title: string;
  publishedDate: string;
  metaDescription?: string;
}

interface PostsProps {
  posts: Post[];
  settings: {
    siteTitle: string;
    metaDescription: string;
  };
}

export default function Posts({ posts, settings }: PostsProps) {
  const sortedPosts = [...posts].sort((a, b) => {
    return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
  });

  return (
    <>
      <SEO
        seo={{
          title: "Posts",
          description: settings.metaDescription,
          path: "/posts",
        }}
      />
      <Main>
        <dl className="list-container items-center gap-2">
          {sortedPosts.map(({ slug, title, publishedDate }) => (
            <React.Fragment key={slug}>
              <dt className="list-title border-none pt-0">
                <time className="time time-lg" dateTime={publishedDate}>
                  {formatDate(publishedDate, true)}
                </time>
              </dt>
              <dd className="list-content border-none pb-4 pt-0 sm:pb-0">
                <div>
                  <Link href={`/posts/${slug}`} className="link">
                    {title}
                  </Link>
                </div>
              </dd>
            </React.Fragment>
          ))}
        </dl>
      </Main>
    </>
  );
}

export const getStaticProps: GetStaticProps<PostsProps> = async () => {
  try {
    const client = initializeApollo();
    const { data } = await client.query({
      query: QUERY_POSTS,
    });

    if (!data?.postCollection?.items || !data?.siteSettingsCollection?.items?.[0]) {
      return {
        notFound: true,
      };
    }

    const posts = [...data.postCollection.items].sort((a, b) => {
      return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
    });

    return {
      props: {
        posts,
        settings: data.siteSettingsCollection.items[0],
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return {
      notFound: true,
    };
  }
};
