import Link from "next/link";

export default function NowReading({ books = [] }) {
  if (!books || books.length === 0) {
    return null;
  }

  return (
    <section>
      <h3 className="mb-4 text-lg font-medium">Now Reading</h3>
      <ul className="space-y-4">
        {books.map((book) => (
          <li key={book.url}>
            <Link href={book.url} className="block">
              <div className="group transition-colors duration-100">
                <h4 className="mt-1 group-hover:text-accent">
                  {book.title}
                </h4>
                <p className="text-sm text-neutral-500">
                  by {book.author}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
