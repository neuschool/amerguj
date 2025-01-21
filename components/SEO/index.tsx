import Head from "next/head";
import Script from "next/script";
import { DefaultSeo } from "next-seo";

export const baseUrl = "https://amerguj.com";

export const defaultSEO = {
  title: "Amer Gujral",
  description: "Amer Gujral's Website",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    site_name: "Amer Gujral",
    images: [
      {
        url: `${baseUrl}/social.png`,
        alt: "Amer Gujral",
      },
    ],
  },
  twitter: {
    handle: "@amerguj",
    site: "@amerguj",
    cardType: "summary_large_image",
  },
};

export interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  path?: string;
}

export function SEO({ seo }: { seo?: SEOProps }) {
  return (
    <>
      <DefaultSeo
        {...{
          ...defaultSEO,
          openGraph: {
            ...defaultSEO.openGraph,
            images: [{ url: seo.image, alt: seo.title }],
          },
          ...seo,
        }}
      />
      <Head>
        <meta name="googlebot" content="index,follow" />
        <link rel="icon" href="/favicon.ico?v=3" sizes="any" />
        <link rel="icon" href="/favicon.svg?v=3" type="image/svg+xml" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=3" />
        {seo.path ? (
          <link
            rel="canonical"
            href={`${baseUrl}${seo.path === "/" ? "" : seo.path}`}
          />
        ) : null}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "http://schema.org",
              "@type": "WebSite",
              name: defaultSEO.title,
              url: baseUrl,
              image: defaultSEO.openGraph.images[0].url,
              author: {
                "@context": "http://schema.org",
                "@type": "Person",
                name: defaultSEO.title,
                url: baseUrl,
                jobTitle: "Human",
                alumniOf: "University of Southern California",
                gender: "male",
                image: defaultSEO.openGraph.images[0].url,
                sameAs: [
                  "https://x.com/amerguj",
                  "https://www.linkedin.com/in/amerguj/",
                ],
              },
            }),
          }}
        />

        <meta name="author" content="Amer Gujral" />
        <meta
          name="theme-color"
          content="#DFDFDE"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#000"
          media="(prefers-color-scheme: dark)"
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS feed"
          href={`${baseUrl}/posts/rss`}
        />
      </Head>
      <Script
        defer
        src="https://eu.umami.is/script.js"
        data-website-id="06795c3d-e407-438d-9ec4-1395a458e24f"
      />
    </>
  );
}
