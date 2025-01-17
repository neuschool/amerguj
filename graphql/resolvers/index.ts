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
    posts: async () => {
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
        return data.postCollection.items;
      } catch (error) {
        console.error("Error fetching posts:", error);
        return [];
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
                  tags
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
                  intro
                  metaDescription
                }
              }
            }
          `,
        });

        const settings = data.siteSettingsCollection.items[0];
        return {
          siteTitle: settings.siteTitle,
          intro: settings.intro,
          metaDescription: settings.metaDescription,
          flags: []
        };
      } catch (error) {
        console.error("Error fetching site settings:", error);
        return {
          siteTitle: "Default Title",
          intro: "Default Intro",
          metaDescription: "Default Description",
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
    })
  }
};
