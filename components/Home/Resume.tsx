import { useQuery } from "@apollo/client";
import { QUERY_RESUME } from "../../graphql/queries";

export default function Resume() {
  const { data, loading, error } = useQuery(QUERY_RESUME);

  console.log('Resume data (detailed):', JSON.stringify(data, null, 2));
  if (error) console.error('Resume error:', error);

  if (!data?.resumeEntryCollection?.items?.length) {
    console.log('No resume entries found');
    return null;
  }

  return (
    <dl className="list-container section-border">
      <dt className="list-title">
        <div className="hidden sm:flex sm:flex-col sm:justify-start">
          {data.resumeEntryCollection.items.map((entry) => (
            <div key={`date-${entry.sys.id}`} className="text-base text-neutral-500 flex items-start h-24 pt-1">
              {entry.startYear} <span className="mx-2">{entry.endYear ? entry.endYear : (
                <span className="inline-flex items-center rounded-full bg-neutral-200 dark:bg-neutral-800 px-2 py-0.5 text-sm text-neutral-600 dark:text-neutral-400">
                  Present
                </span>
              )}</span>
            </div>
          ))}
        </div>
      </dt>
      <dd className="list-content pt-8 sm:pt-0">
        <div className="flex flex-col justify-start">
          {data.resumeEntryCollection.items.map((entry) => (
            <div key={entry.sys.id} className="text-base flex flex-col mb-8 sm:mb-0 sm:h-24">
              <div className="flex flex-col gap-0.5">
                <div className="sm:hidden text-neutral-500 mb-1">
                  {entry.startYear} <span className="mx-2">{entry.endYear ? entry.endYear : (
                    <span className="inline-flex items-center rounded-full bg-neutral-200 dark:bg-neutral-800 px-2 py-0.5 text-sm text-neutral-600 dark:text-neutral-400">
                      Present
                    </span>
                  )}</span>
                </div>
                <div className="pt-1">{entry.jobTitle}</div>
                {entry.companyName && (
                  <div>
                    <a href={entry.companyUrl} className="inline-flex items-center gap-1">
                      <span className="link">{entry.companyName}</span>
                      <span className="text-neutral-500">↗</span>
                    </a>
                  </div>
                )}
                {entry.location && (
                  <div className="text-sm text-neutral-500">{entry.location}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </dd>
    </dl>
  );
}
