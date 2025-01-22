import React from "react";
import { Main } from "../components/Layouts";
import { SEO } from "../components/SEO";

export default function Colophon() {
  return (
    <>
      <SEO
        seo={{
          title: "Colophon",
          path: "/colophon",
        }}
      />
      <Main>
        <h1 className="pb-6 text-2xl text-neutral-800 [font-variation-settings:'opsz'_32,_'wght'_500] dark:text-white sm:pb-12 sm:text-3xl">
          Colophon
        </h1>
        <dl className="list-container">
          <dt className="list-title">
            <h3 className="text-neutral-500 dark:text-silver-dark">
              Typography
            </h3>
          </dt>
          <dd className="list-content">
            <p>
              The site features the{" "}
              <a className="link" target="_blank" href="https://rsms.me/inter/">
                Inter
              </a>{" "}
              typeface, a variable font family carefully crafted & designed for
              computer screens, designed by{" "}
              <a className="link" target="_blank" href="https://rsms.me">
                Rasmus Andersson
              </a>
              .
            </p>
          </dd>
        </dl>
        <dl className="list-container">
          <dt className="list-title">
            <h3 className="text-neutral-500 dark:text-silver-dark">
              Technology
            </h3>
          </dt>
          <dd className="list-content">
            <p>
              Built with{" "}
              <a className="link" target="_blank" href="https://nextjs.org">
                Next.js
              </a>
              ,{" "}
              <a className="link" target="_blank" href="https://contentful.com">
                Contentful
              </a>
              , and{" "}
              <a
                className="link"
                target="_blank"
                href="https://tailwindcss.com"
              >
                Tailwind
              </a>
              . Hosted on{" "}
              <a className="link" target="_blank" href="https://vercel.com">
                Vercel
              </a>
              .
            </p>
            <p>
              The custom{" "}
              <a
                className="link"
                target="_blank"
                href="https://graphql.fabianschultz.com"
              >
                GraphQL API
              </a>{" "}
              used to fetch content and live data is built with{" "}
              <a
                className="link"
                target="_blank"
                href="https://apollographql.com"
              >
                Apollo
              </a>{" "}
              and cached by{" "}
              <a className="link" target="_blank" href="https://stellate.co">
                Stellate
              </a>
              .
            </p>
            <p>
              The ⌘K functionality is powered by the great{" "}
              <a className="link" target="_blank" href="https://cmdk.paco.me">
                cmdk
              </a>{" "}
              library from{" "}
              <a className="link" target="_blank" href="https://paco.me">
                Paco
              </a>
              .
            </p>
          </dd>
        </dl>
        <dl className="list-container">
          <dt className="list-title">
            <h3 className="text-neutral-500 dark:text-silver-dark">
              Source
            </h3>
          </dt>
          <dd className="list-content">
            <p>
              This website's code is forked from{" "}
              <a className="link" target="_blank" href="https://www.fabianschultz.com/">
                Fabian Schultz
              </a>
              , which is open source and available on{" "}
              <a className="link" target="_blank" href="https://github.com/fabe/site">
                Github
              </a>
              . I found this repository through{" "}
              <a className="link" target="_blank" href="https://hem.so/">
                Hemanth Soni's
              </a>
              {" "}website. I am not a software engineer so I also need to thank{" "}
              <a className="link" target="_blank" href="https://www.cursor.com/">
                Cursor
              </a>
              {" "}and{" "}
              <a className="link" target="_blank" href="https://claude.ai/new">
                Claude
              </a>
              {" "}to get this website up and running.
            </p>
          </dd>
        </dl>
      </Main>
    </>
  );
}
