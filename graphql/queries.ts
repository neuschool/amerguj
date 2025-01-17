import { gql } from "@apollo/client";

export const SHARED_FRAGMENTS = gql`
  fragment SiteSettingsShared on SiteSettings {
    siteTitle
    metaDescription
  }
`;

export const QUERY_PAGE_HOME = gql`
  ${SHARED_FRAGMENTS}
  query PageHomeQuery {
    siteSettings {
      introNew {
        json
        links {
          assets {
            block {
              sys {
                id
              }
              url
              title
              width
              height
              description
            }
          }
        }
      }
      ...SiteSettingsShared
    }
    postCollection(limit: 5, order: "publishedDate_DESC") {
      items {
        title
        slug
      }
    }
  }
`;

export const QUERY_POSTS = gql`
  query PostsQuery {
    postCollection {
      items {
        title
        slug
        publishedDate
        metaDescription
      }
    }
  }
`;

export const QUERY_POST = gql`
  query PostQuery($slug: String!) {
    postCollection(where: { slug: $slug }, limit: 1) {
      items {
        title
        slug
        publishedDate
        metaDescription
        body
        coverUrl
        coverAlt
      }
    }
  }
`;

export const QUERY_POST_SLUGS = gql`
  query PostSlugsQuery {
    postCollection {
      items {
        slug
      }
    }
  }
`;

export const QUERY_SPOTIFY_STATUS = gql`
  query SpotifyStatusQuery {
    spotifyStatus {
      timestamp
      isPlaying
      song {
        albumImageUrl
        name
        artist
        url
      }
    }
  }
`;
