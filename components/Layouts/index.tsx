import Footer from "../Footer";
import Archipelago from "../Navigation/Archipelago";
import { useQuery } from "@apollo/client";
import { QUERY_PAGE_HOME } from "../../graphql/queries";

interface MainProps {
  children: React.ReactNode;
}

export function Main({ children }: MainProps) {
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-sm">
        <nav className="mx-auto flex max-w-container justify-end gap-8 px-6 py-4">
        </nav>
      </header>
      <main className="m:px-0 flex justify-center px-6 pb-24 pt-8 sm:pb-28 sm:pt-32">
        <article className="w-full max-w-main grow">
          {children}
          <Footer />
        </article>
      </main>
      <Archipelago />
    </>
  );
}

export function Container({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="m:px-0 flex justify-center px-6 pt-8 sm:pt-32">
        <article className="w-full max-w-main grow">{children}</article>
      </main>
    </>
  );
}
