import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../graphql/client";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';

const Archipelago = dynamic(
  () => import("../components/Navigation/Archipelago"),
  { ssr: false } // Disable SSR for this component to prevent hydration issues
);

interface CustomPageProps {
  initialApolloState?: any;
  session?: any;
}

type CustomAppProps = AppProps<CustomPageProps>;

export default function MyApp({ Component, pageProps }: CustomAppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <SessionProvider session={pageProps.session}>
      <Head>
        <link rel="preconnect" href="https://rsms.me/" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>
      <ApolloProvider client={apolloClient}>
        <main>
          <Component {...pageProps} />
          <Archipelago />
        </main>
      </ApolloProvider>
    </SessionProvider>
  );
}
