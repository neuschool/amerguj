import Intro from "../components/Home/Intro";
import Resume from "../components/Home/Resume";
import { Main } from "../components/Layouts";
import { SEO } from "../components/SEO";
import { initializeApollo } from "../graphql/client";
import type { GetStaticProps } from "next";
import { QUERY_PAGE_HOME, QUERY_SPOTIFY_STATUS } from "../graphql/queries";
import {
  PageHomeQueryQuery,
  SpotifyStatusQueryQuery,
} from "../graphql/types/types.generated";
import { useQuery } from "@apollo/client";
import NowReading from "../components/Home/NowReading";
import { useEffect } from "react";
import NowPlaying from "../components/Home/NowPlaying";
import { serialize } from "next-mdx-remote/serialize";
import Posts from "../components/Home/Posts";

export default function Home({ intro }) {
  const { data } = useQuery<PageHomeQueryQuery>(QUERY_PAGE_HOME);

  const {
    data: liveData,
    startPolling,
    stopPolling,
    refetch,
    loading,
  } = useQuery<SpotifyStatusQueryQuery>(QUERY_SPOTIFY_STATUS, {
    ssr: false,
    fetchPolicy: "network-only",
  });

  // Refetch every 15 seconds for live data to be fresh.
  useEffect(() => {
    refetch();
    startPolling(15 * 1000);

    return () => stopPolling();
  }, []);

  return (
    <>
      <SEO
        seo={{
          title: data.siteSettings.siteTitle,
          description: data.siteSettings.metaDescription,
          path: "/",
        }}
      />
      <Main>
        <Intro content={intro} />
        <Resume />
        <Posts postCollection={data.postCollection} />
        <NowPlaying spotifyStatus={liveData?.spotifyStatus} loading={loading} />
        <NowReading books={data.books} />
      </Main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: QUERY_PAGE_HOME,
  });

  const cache = apolloClient.cache.extract();

  const data = apolloClient.readQuery({ query: QUERY_PAGE_HOME });
  console.log("Data from Apollo:", JSON.stringify(data, null, 2));
  console.log("Site settings:", JSON.stringify(data?.siteSettings, null, 2));

  // Convert Contentful rich text to markdown
  const richTextContent = data.siteSettings.introNew.json;
  const markdownContent = richTextContent.content
    .map(node => {
      if (node.nodeType === 'paragraph') {
        const text = node.content.map(content => {
          if (content.nodeType === 'text') {
            return content.value;
          } else if (content.nodeType === 'hyperlink') {
            return `[${content.content[0].value}](${content.data.uri})`;
          }
          return '';
        }).join('');
        return text;
      }
      return '';
    })
    .filter(text => text)
    .join('\n\n');

  const intro = await serialize(markdownContent);
  console.log("Serialized intro:", JSON.stringify(intro, null, 2));

  return {
    props: {
      initialApolloState: { ...cache },
      intro,
    },
  };
};
