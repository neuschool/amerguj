import Intro from "../components/Home/Intro";
import Resume from "../components/Home/Resume";
import { Main } from "../components/Layouts";
import { SEO } from "../components/SEO";
import { initializeApollo } from "../graphql/client";
import type { GetStaticProps } from "next";
import { QUERY_PAGE_HOME, QUERY_SPOTIFY_STATUS, QUERY_RESUME } from "../graphql/queries";
import type { SpotifyStatusQueryQuery } from "../graphql/types/types.generated";
import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import NowPlaying from "../components/Home/NowPlaying";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document, BLOCKS, INLINES } from "@contentful/rich-text-types";
import Posts from "../components/Home/Posts";
import RecentlyPlayed from '../components/RecentlyPlayed';
import { gql } from '@apollo/client';

interface HomeProps {
  initialApolloState: any;
}

interface PageHomeQuery {
  siteSettingsCollection: {
    items: Array<{
      siteTitle: string;
      metaDescription: string;
      introNew: {
        json: Document;
      };
      avatar: {
        url: string;
        width: number;
        height: number;
      };
    }>;
  };
  postCollection: {
    items: Array<{
      title: string;
      slug: string;
      publishedDate: string;
      metaDescription: string;
    }>;
  };
}

const QUERY = gql`
  query GetHomePageData {
    siteSettingsCollection(limit: 1) {
      items {
        siteTitle
        metaDescription
        introNew {
          json
        }
        avatar {
          url
          width
          height
        }
      }
    }
  }
`;

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo();

  try {
    await apolloClient.query({
      query: QUERY,
    });

    return {
      props: {
        initialApolloState: apolloClient.cache.extract(),
      },
      revalidate: 1,
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        initialApolloState: {},
      },
      revalidate: 1,
    };
  }
};

export default function Home({ initialApolloState }: HomeProps) {
  const { data } = useQuery<PageHomeQuery>(QUERY_PAGE_HOME);
  const settings = data?.siteSettingsCollection?.items?.[0];

  const options = {
    renderNode: {
      [INLINES.HYPERLINK]: (node: any, children: any) => (
        <a href={node.data.uri} className="link">
          {children}
        </a>
      ),
    },
  };

  if (!settings) {
    return <div>Loading...</div>;
  }

  return (
    <Main>
      <SEO
        seo={{
          title: settings.siteTitle,
          description: settings.metaDescription,
          path: "/"
        }}
      />
      <div className="space-y-16 sm:space-y-20">
        <dl className="list-container">
          <dt className="list-title">
            <div className="space-y-1">
              <div className="text-base font-bold">{settings.siteTitle}</div>
              <div className="text-neutral-500">Human</div>
            </div>
          </dt>
          <dd className="list-content">
            <div className="text-base text-neutral-800 dark:text-silver">
              {documentToReactComponents(settings.introNew.json, options)}
            </div>
          </dd>
        </dl>
        <Resume />
        <dl className="list-container section-border">
          <dt className="list-title">
            <div className="text-neutral-500">Writing</div>
          </dt>
          <dd className="list-content">
            <Posts />
          </dd>
        </dl>
        <RecentlyPlayed />
      </div>
    </Main>
  );
}
