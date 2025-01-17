import { MDXRemote } from "next-mdx-remote";
import Link from "next/link";
import { mdxComponents } from "../Prose";
import { useQuery } from "@apollo/client";
import { QUERY_PAGE_HOME } from "../../graphql/queries";
import { PageHomeQueryQuery } from "../../graphql/types/types.generated";

export default function Intro({ content }) {
  const { data } = useQuery<PageHomeQueryQuery>(QUERY_PAGE_HOME);

  return (
    <dl className="list-container">
      <dt className="list-title border-none pb-4 pt-0 leading-relaxed sm:pb-0">
        <h1 className="flex items-center gap-1 text-neutral-800 dark:text-white">
          <Link href="/" className="[font-variation-settings:'wght'_550]">
            {data?.siteSettings?.siteTitle || "Loading..."}
          </Link>
        </h1>
        <div className="flex items-center gap-4">
          <h2 className="text-neutral-500 dark:text-silver-dark">
            Human
          </h2>
        </div>
      </dt>
      <dd className="list-content border-none pt-0">
        <MDXRemote {...content} components={mdxComponents} />
      </dd>
    </dl>
  );
}
