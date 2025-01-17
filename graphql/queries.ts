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
      intro
      ...SiteSettingsShared
      avatar {
        url
        sys {
          id
          spaceId
          environmentId
        }
      }
    }
    posts(limit: 5) {
      title
      slug
      publishedDate
    }
  }
`;

export const QUERY_POSTS = gql`
  query PostsQuery {
    posts {
      title
      slug
      publishedDate
      metaDescription
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
        artist
        title
        spotifyUrl
        album
      }
    }
  }
`;
