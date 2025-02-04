import { gql } from "@apollo/client";

export const SHARED_FRAGMENTS = gql`
  fragment SiteSettingsShared on SiteSettings {
    siteTitle
    metaDescription
  }
`;

export const QUERY_RESUME = gql`
  query GetResumeEntries {
    resumeEntryCollection(order: [priority_DESC]) {
      items {
        sys {
          id
        }
        startYear
        endYear
        jobTitle
        companyName
        companyUrl
        location
        priority
      }
    }
  }
`;

export const QUERY_PAGE_HOME = gql`
  query PageHomeQuery {
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
    postCollection(limit: 5) {
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
  query Post($slug: String!) {
    siteSettingsCollection(limit: 1) {
      items {
        siteTitle
        metaDescription
        avatar {
          url
          width
          height
        }
      }
    }
    postCollection(where: { slug: $slug }, limit: 1) {
      items {
        title
        slug
        publishedDate
        metaDescription
        tags
        body {
          json
          links {
            entries {
              inline {
                sys {
                  id
                }
                __typename
              }
              block {
                sys {
                  id
                }
                __typename
              }
            }
            assets {
              block {
                sys {
                  id
                }
                title
                description
                url
                width
                height
                contentType
              }
            }
          }
        }
      }
    }
  }
`;

export const QUERY_POST_SLUGS = gql`
  query PostSlugs {
    postCollection {
      items {
        slug
      }
    }
  }
`;

export const QUERY_POSTS = gql`
  query GetPosts {
    siteSettingsCollection(limit: 1) {
      items {
        siteTitle
        metaDescription
      }
    }
    postCollection(order: [publishedDate_DESC]) {
      items {
        title
        slug
        publishedDate
        metaDescription
      }
    }
  }
`;

export const QUERY_POSTS_FEED = gql`
  query PostsFeed {
    siteSettingsCollection(limit: 1) {
      items {
        siteTitle
        metaDescription
      }
    }
    postCollection(limit: 5, order: [publishedDate_DESC]) {
      items {
        title
        slug
        publishedDate
        metaDescription
      }
    }
  }
`;

export const QUERY_SPOTIFY_STATUS = gql`
  query SpotifyStatus {
    spotifyStatus {
      isPlaying
      song {
        title
        artist
        album
        albumImageUrl
        spotifyUrl
      }
      timestamp
    }
  }
`;

export const QUERY_ALL_PHOTOS = gql`
  query Photos {
    photoCollection {
      items {
        sys {
          id
        }
        location
        image {
          sys {
            id
          }
          title
          description
          url
          width
          height
        }
      }
    }
  }
`;

export const QUERY_PLACES = gql`
  query Places {
    placeCollection {
      items {
        sys {
          id
        }
        name
        location {
          latitude
          longitude
        }
      }
    }
  }
`;

export const QUERY_PHOTO = gql`
  query Photo($id: String!) {
    photo: photoCollection(where: { sys: { id: $id } }, limit: 1) {
      items {
        sys {
          id
        }
        location
        image {
          sys {
            id
          }
          title
          description
          url
          width
          height
        }
      }
    }
  }
`;

export const QUERY_PHOTO_IDS = gql`
  query PhotoIds {
    photoCollection {
      items {
        sys {
          id
        }
      }
    }
  }
`;

