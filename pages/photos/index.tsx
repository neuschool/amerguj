import type { GetStaticProps } from "next";
import React from "react";
import { SEO } from "../../components/SEO";
import { initializeApollo } from "../../graphql/client";
import { QUERY_ALL_PHOTOS } from "../../graphql/queries";
import Footer from "../../components/Footer";
import Masonry from "../../components/Layouts/Masonry";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Lightbox from "../../components/Lightbox";
import LightboxPhoto from "../../components/Lightbox/Photo";
import { Photo } from "../../graphql/types/types.generated";

const Dialog = dynamic(() => import("../../components/Dialog"), {
  loading: () => null,
  ssr: false,
});

interface PhotosProps {
  photos: Photo[];
}

export default function Photos({ photos }: PhotosProps) {
  const router = useRouter();
  console.log('Component photos:', JSON.stringify(photos, null, 2));

  return (
    <>
      <SEO
        seo={{
          title: "Photos",
          path: "/photos",
        }}
      />

      <Lightbox
        isOpen={!!router.query.id}
        onDismiss={() => router.push("/photos", undefined, { scroll: false })}
      >
        <LightboxPhoto
          photo={photos?.find((photo) => photo.sys.id === router.query.id)}
        />
      </Lightbox>

      <div className="p-2">
        <Masonry photos={photos} />
      </div>

      <div className="flex justify-center px-4 pb-20 sm:pb-8">
        <div className="w-full max-w-main grow">
          <Footer />
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const apolloClient = initializeApollo();
  try {
    console.log('Fetching photos from Contentful...');
    const { data, error } = await apolloClient.query({
      query: QUERY_ALL_PHOTOS,
    });

    console.log('GraphQL response:', JSON.stringify(data, null, 2));

    if (error) {
      console.error('GraphQL error:', error);
      return {
        props: {
          photos: [],
        },
      };
    }

    if (!data) {
      console.error('No data returned from GraphQL query');
      return {
        props: {
          photos: [],
        },
      };
    }

    if (!data.photoCollection?.items) {
      console.error('No photos found in response. Available fields:', Object.keys(data));
      return {
        props: {
          photos: [],
        },
      };
    }

    const photos = data.photoCollection.items;
    console.log('Found photos:', photos.length);
    console.log('First photo (if any):', JSON.stringify(photos[0], null, 2));

    return {
      props: {
        photos,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error instanceof Error ? error.message : error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace available');
    return {
      props: {
        photos: [],
      },
    };
  }
}
