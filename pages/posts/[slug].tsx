import type { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import { Main } from "../../components/Layouts";
import { baseUrl, SEO } from "../../components/SEO";
import { initializeApollo } from "../../graphql/client";
import { QUERY_POST, QUERY_POST_SLUGS } from "../../graphql/queries";
import { formatDate } from "../../lib/formatDate";
import type { Post, SiteSettings } from "../../graphql/types/types.generated";
import { useRouter } from "next/router";
import React from "react";
import { LinkShare } from "../../components/Links";
import Link from "next/link";
import { mdxComponents } from "../../components/Prose";
import contentfulLoader from "../../lib/contentfulLoader";
import Image from "next/image";
import Badge from "../../components/Badge";
import { getClient } from "../../lib/apollo-client";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';

interface PostProps {
  post: Post;
  siteSettings: SiteSettings;
  body: any;
}

const calculateReadingTime = (content: any): string => {
  // Extract all text content from the JSON structure
  const getText = (node: any): string => {
    if (!node) return '';
    if (typeof node === 'string') return node;
    if (node.content) return node.content.map(getText).join(' ');
    if (node.value) return node.value;
    return '';
  };

  const text = getText(content);
  const words = text.trim().split(/\s+/).length;
  const wordsPerMinute = 200;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
};

export default function Post(props: PostProps) {
  const router = useRouter();
  const slug = router.query.slug;

  console.log('Post props:', {
    title: props.post?.title,
    hasBody: !!props.post?.body,
    bodyJson: props.post?.body?.json
  });

  console.log('Post body:', {
    hasJson: !!props.post?.body?.json,
    jsonContent: JSON.stringify(props.post?.body?.json, null, 2),
    nodeType: props.post?.body?.json?.nodeType,
    content: props.post?.body?.json?.content
  });

  if (!props.post) {
    return (
      <>
        <SEO
          seo={{
            title: "Not found",
          }}
        />
        <Main>
          <h1>Not found</h1>
        </Main>
      </>
    );
  }

  const { title, metaDescription, publishedDate } = props.post;
  const relativeUrl = `/posts/${slug}`;
  const url = `${baseUrl}${relativeUrl}`;
  const readingTime = calculateReadingTime(props.post.body?.json);

  const options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node: any, children: any) => <p className="mb-4">{children}</p>,
      [BLOCKS.HEADING_1]: (node: any, children: any) => <h1 className="text-3xl font-bold mb-4">{children}</h1>,
      [BLOCKS.HEADING_2]: (node: any, children: any) => <h2 className="text-2xl font-bold mb-3">{children}</h2>,
      [BLOCKS.HEADING_3]: (node: any, children: any) => <h3 className="text-xl font-bold mb-2">{children}</h3>,
      [BLOCKS.UL_LIST]: (node: any, children: any) => <ul className="list-disc pl-6 mb-4">{children}</ul>,
      [BLOCKS.OL_LIST]: (node: any, children: any) => <ol className="list-decimal pl-6 mb-4">{children}</ol>,
      [BLOCKS.LIST_ITEM]: (node: any, children: any) => <li className="mb-2">{children}</li>,
      [BLOCKS.QUOTE]: (node: any, children: any) => <blockquote className="border-l-4 border-gray-300 pl-4 mb-4 italic">{children}</blockquote>,
    },
    renderMark: {
      [MARKS.BOLD]: (text: any) => <strong>{text}</strong>,
      [MARKS.ITALIC]: (text: any) => <em>{text}</em>,
      [MARKS.CODE]: (text: any) => <code className="bg-gray-100 rounded px-1">{text}</code>,
      [MARKS.UNDERLINE]: (text: any) => <u>{text}</u>,
    },
  };

  return (
    <>
      <SEO
        seo={{
          title,
          description: metaDescription,
          path: relativeUrl,
        }}
      />
      <Main>
        <header className="mb-6 rounded-lg sm:mb-6">
          <h1 className="pb-2 text-2xl text-neutral-800 [font-variation-settings:'opsz'_32,_'wght'_500] dark:text-white sm:pb-3 sm:text-3xl">
            <Link href={relativeUrl}>{title}</Link>
          </h1>
          <div className="flex w-full flex-row justify-between">
            <div className="flex flex-row items-center gap-2">
              <Link
                href="/"
                className="flex flex-row items-center gap-2 [font-variation-settings:'wght'_450]"
              >
                {props.siteSettings.avatar?.url && (
                  <div>
                    <Image
                      alt={props.siteSettings.siteTitle}
                      title={props.siteSettings.siteTitle}
                      className="rounded-full bg-gray-200 dark:bg-neutral-600"
                      src={props.siteSettings.avatar.url}
                      width={20}
                      height={20}
                    />
                  </div>
                )}
              </Link>
              <time dateTime={publishedDate}>
                <Badge>{formatDate(publishedDate)}</Badge>
              </time>
              <Badge>{readingTime}</Badge>
            </div>
            <LinkShare title={title} url={url}>
              Share
            </LinkShare>
          </div>
        </header>

        <div className="rounded-lg p-0 sm:bg-gray-100 sm:p-8 sm:dark:bg-white/[.06]">
          <div className="prose-custom prose-quotefix text-justify">
            {props.post.body?.json ? (
              <div className="mt-4">
                {documentToReactComponents(props.post.body.json, {
                  renderNode: {
                    [BLOCKS.PARAGRAPH]: (node, children) => (
                      <p className="mb-4">{children}</p>
                    ),
                  },
                })}
              </div>
            ) : (
              <p>No content available</p>
            )}
          </div>
        </div>
      </Main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const client = getClient();
  const { data } = await client.query({
    query: QUERY_POST_SLUGS,
  });

  if (!data || !data.postCollection || !data.postCollection.items) {
    return {
      paths: [],
      fallback: true,
    };
  }

  return {
    paths: data.postCollection.items.map((post) => ({ params: { slug: post.slug } })),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const client = getClient();
  const { data } = await client.query({
    query: QUERY_POST,
    variables: { slug: params?.slug },
  });

  const post = data.postCollection.items[0];
  const siteSettings = data.siteSettingsCollection.items[0];
  
  if (!post) {
    return {
      notFound: true,
    };
  }

  console.log('Post body:', JSON.stringify(post.body, null, 2));

  return {
    props: {
      post,
      siteSettings,
      body: post.body
    },
    revalidate: 60,
  };
};
