import { SiteSettings, SpotifyStatus, PostWithoutBody } from "../types/types.generated";

export const mockSiteSettings: SiteSettings = {
  siteTitle: "My Website",
  intro: "Welcome to my website",
  flags: [],
  metaDescription: "A personal website",
  avatar: { 
    url: "https://via.placeholder.com/150",
    sys: {
      id: "mock-avatar",
      spaceId: "mock-space",
      environmentId: "master"
    },
    contentfulMetadata: {
      tags: []
    }
  }
};

export const mockSpotifyStatus: SpotifyStatus = {
  isPlaying: false,
  song: null
};

export const mockPosts: PostWithoutBody[] = [{
  title: "Hello World",
  slug: "hello-world",
  publishedDate: "2025-01-17",
  metaDescription: "My first post",
  coverUrl: null
}];
