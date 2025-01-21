import { gql } from "@apollo/client";

export const typeDefs = gql`
  scalar JSON
  scalar Freeform

  type Query {
    books(limit: Int, collection: CollectionType): [Book]!
    photo(id: String!): Photo
    photoCollection(limit: Int): PhotoCollection!
    playlists(limit: Int): [Playlist]!
    post(slug: String!): Post
    postCollection(limit: Int, order: String): PostCollection!
    places: [Place]!
    siteSettings: SiteSettings!
    spotifyStatus: SpotifyStatus!
    spotifyPlaylist(id: String!): SpotifyPlaylist!
    resumeEntries: [ResumeEntry!]!
  }

  type PostCollection {
    items: [Post!]!
  }

  type SiteSettingsCollection {
    items: [SiteSettings!]!
  }

  type SiteSettingsIntroNew {
    json: JSON!
    links: SiteSettingsIntroNewLinks!
  }

  type SiteSettingsIntroNewLinks {
    assets: SiteSettingsIntroNewAssets!
  }

  type SiteSettingsIntroNewAssets {
    block: [Asset!]!
  }

  type Asset {
    sys: Sys!
    url: String
    title: String
    width: Int
    height: Int
    description: String
  }

  enum CollectionType {
    READING
  }

  type SpotifyStatus {
    timestamp: String
    isPlaying: Boolean!
    song: Song
  }

  type SpotifyPlaylist {
    name: String!
    coverUrl: String!
    trackCount: Int!
    followerCount: Int!
    spotifyUrl: String!
  }

  type Song {
    name: String
    artist: String
    albumImageUrl: String
    url: String
  }

  type Playlist {
    title: String!
    coverUrl: String!
    spotifyUrl: String!
  }

  type Book {
    title: String!
    author: String!
    readingDate: String
    url: String!
    coverUrl: String
    fallbackColors: [String]
  }

  type Post {
    title: String!
    slug: String!
    publishedDate: String!
    metaDescription: String
    coverUrl: String
    coverAlt: String
    tags: [String]
    body: Freeform
  }

  type Place {
    name: String!
    locationType: String!
    location: Location!
  }

  type Photo {
    sys: Sys!
    location: String
    image: Asset!
  }

  type PhotoCollection {
    items: [Photo!]!
  }

  type SiteSettings {
    siteTitle: String!
    introNew: SiteSettingsIntroNew!
    metaDescription: String!
  }

  type Location {
    lat: Float!
    lng: Float!
  }

  type ResumeEntry {
    sys: Sys!
    startYear: Int!
    endYear: Int
    jobTitle: String!
    companyName: String!
    companyUrl: String!
    location: String!
    priority: Int
  }

  type Sys {
    id: String!
    spaceId: String!
    environmentId: String!
  }
`;
