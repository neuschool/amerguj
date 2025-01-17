import { gql, useQuery } from "@apollo/client";
import Badge from "../Badge";
import { LinkExternal } from "../Links";

const QUERY_RESUME = gql`
  query GetResumeEntries {
    resumeEntries {
      sys {
        id
      }
      startYear
      endYear
      jobTitle
      companyName
      companyUrl
      location
      priority
    }
  }
`;

export default function Resume() {
  const { data, loading, error } = useQuery(QUERY_RESUME);
  const currentYear = new Date().getFullYear();

  if (loading) return <div>Loading resume entries...</div>;
  if (error) {
    console.error('Resume entries error:', error);
    return <div>Error loading resume entries</div>;
  }
  if (!data?.resumeEntries?.length) {
    console.error('No resume entries found');
    return <div>No experience entries found</div>;
  }

  return (
    <dl className="list-container">
      <dt className="list-title">
      </dt>
      <dd className="list-content">
        <div className="space-y-8">
          {data.resumeEntries.map((entry) => (
            <div key={entry.sys.id} className="grid grid-cols-[45%,55%] pr-[25%]">
              <div className="flex items-center gap-2">
                <span className="text-neutral-500 dark:text-silver-dark">
                  {entry.startYear}
                </span>
                {(!entry.endYear || entry.endYear === currentYear) ? (
                  <Badge>Present</Badge>
                ) : (
                  <Badge>{entry.endYear}</Badge>
                )}
              </div>
              <div>
                <h3 className="leading-snug">{entry.jobTitle}</h3>
                <div className="leading-snug">
                  <LinkExternal href={entry.companyUrl}>{entry.companyName}</LinkExternal>
                </div>
                <div className="mt-1 text-sm text-neutral-500 dark:text-silver-dark">
                  {entry.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </dd>
    </dl>
  );
}
