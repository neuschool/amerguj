import { gql } from "@apollo/client";
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

const contentfulClient = new ApolloClient({
  ssrMode: true,
  link: createHttpLink({
    uri: `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master`,
    headers: {
      Authorization: `Bearer ${process.env.CONTENTFUL_DELIVERY}`,
    },
  }),
  cache: new InMemoryCache(),
});

export const resolvers = {
  Query: {
    books: () => [],
    photo: () => null,
    photos: () => [],
    playlists: () => [],
    postCollection: async () => {
      try {
        const { data } = await contentfulClient.query({
          query: gql`
            query GetPosts {
              postCollection {
                items {
                  title
                  slug
                  publishedDate
                  metaDescription
                }
              }
            }
          `,
        });
        return data.postCollection;
      } catch (error) {
        console.error("Error fetching posts:", error);
        return { items: [] };
      }
    },
    post: async (_, { slug }) => {
      try {
        const { data } = await contentfulClient.query({
          query: gql`
            query GetPost($slug: String!) {
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
          `,
          variables: { slug },
        });
        return data.postCollection.items[0];
      } catch (error) {
        console.error("Error fetching post:", error);
        return null;
      }
    },
    places: () => [],
    siteSettings: async () => {
      try {
        const { data } = await contentfulClient.query({
          query: gql`
            query GetSiteSettings {
              siteSettingsCollection(limit: 1) {
                items {
                  siteTitle
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
                  metaDescription
                }
              }
            }
          `,
        });

        console.log("Contentful response:", JSON.stringify(data, null, 2));

        const settings = data.siteSettingsCollection.items[0];
        console.log("Settings object:", JSON.stringify(settings, null, 2));

        return {
          siteTitle: settings.siteTitle,
          introNew: settings.introNew,
          metaDescription: settings.metaDescription,
          flags: []
        };
      } catch (error) {
        console.error("Error fetching site settings:", error);
        return {
          siteTitle: "Default Title",
          introNew: "Default Intro",
          metaDescription: "Amer Gujral's Website",
          flags: []
        };
      }
    },
    spotifyStatus: () => ({
      timestamp: null,
      isPlaying: false,
      song: null
    }),
    spotifyPlaylist: () => ({
      name: "Mock Playlist",
      coverUrl: "https://via.placeholder.com/150",
      trackCount: 0,
      followerCount: 0,
      spotifyUrl: "#"
    }),
    resumeEntries: async () => {
      try {
        const { data } = await contentfulClient.query({
          query: gql`
            query GetResumeEntries {
              resumeEntryCollection {
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
          `,
        });

        if (!data?.resumeEntryCollection?.items) {
          console.error('No resume entries found');
          return [];
        }

        // Sort by year (descending) and then by priority (descending)
        const entries = [...data.resumeEntryCollection.items];
        entries.sort((a, b) => {
          if (a.startYear !== b.startYear) {
            return b.startYear - a.startYear;
          }
          // For same year, sort by priority (higher priority first)
          const priorityA = a.priority || 0;
          const priorityB = b.priority || 0;
          return priorityB - priorityA;
        });

        return entries;
      } catch (error) {
        console.error('Error fetching resume entries:', error);
        return [];
      }
    },
  }
};
