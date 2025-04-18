import Link from "next/link";

export default function Footer() {
  return (
    <footer className="m:px-0 flex w-full justify-center pt-10 sm:pt-20">
      <div className="max-w-main flex-1">
        <div className="flex h-full w-full items-end justify-between border-t border-solid border-neutral-500/10 pt-8 dark:border-neutral-900">
          <div className="flex-1">
            <ul className="flex gap-4 pb-6">
              <li>
                <Link href="/" className="link-fade">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/posts" className="link-fade">
                  Posts
                </Link>
              </li>
              <li>
                <Link href="/photos" className="link-fade">
                  Photography
                </Link>
              </li>
              <li>
                <Link href="/colophon" className="link-fade">
                  Colophon
                </Link>
              </li>
            </ul>
            <div className="flex gap-1.5 text-xs text-neutral-500 [font-variation-settings:'opsz'_12] dark:text-silver-dark">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="7"
                height="16"
                fill="none"
                viewBox="0 0 7 16"
                className="fill-neutral-500 dark:fill-silver-dark"
              >
                <path d="M3 6.5h1v6l-.5 1-.5-1v-6z"></path>
                <path
                  fillRule="evenodd"
                  d="M3.5 6a2.5 2.5 0 100-5 2.5 2.5 0 000 5zm-1-3a.5.5 0 100-1 .5.5 0 000 1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Made in Germany
            </div>
          </div>
          <div className="flex h-full flex-col items-end justify-end sm:justify-between">
            <div
              className="hidden flex-1 select-none text-sm text-neutral-900/30 dark:text-neutral-700 sm:block"
              aria-hidden="true"
              role="img"
            >
              It's all a relative bilanz — a composition
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
