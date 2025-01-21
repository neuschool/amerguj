import React, { useState, useEffect } from "react";
import { Photo } from "../../graphql/types/types.generated";
import Image from "next/image";
import contentfulLoader from "../../lib/contentfulLoader";
import Link from "next/link";

interface MasonryProps {
  photos: Photo[];
}

const getNumColumns = (width) => {
  if (width < 768) return 1;
  if (width < 1280) return 2;
  return Math.min(Math.floor(width / 320), 3);
};

const Masonry = ({ photos }: MasonryProps) => {
  const [hasInitializedColumns, setHasInitializedColumns] = useState(false);
  const [numColumns, setNumColumns] = useState<number>(3);

  const updateColumns = () => {
    setNumColumns(getNumColumns(window.innerWidth));
  };

  useEffect(() => {
    updateColumns();
    setHasInitializedColumns(true);
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  const distributePhotos = (photos: Photo[], numColumns: number) => {
    const columns = Array.from({ length: numColumns }, () => []);
    photos.forEach((photo, i) => columns[i % numColumns].push(photo));
    return columns;
  };

  const columns = distributePhotos(photos, numColumns);

  return (
    <>
      <div
        className={`flex gap-2 ${
          hasInitializedColumns ? "opacity-100" : "opacity-0"
        }`}
      >
        {columns.map((column, i) => (
          <div key={i} className="flex flex-1 gap-2 flex-col">
            {column.map((photo: Photo) => (
              <Link
                key={photo.sys.id}
                href={{ pathname: "/photos", query: { id: photo.sys.id } }}
                as={`/photos/${photo.sys.id}`}
                passHref
                shallow
                scroll={false}
              >
                <div
                  className="group relative flex overflow-hidden"
                  style={{ aspectRatio: `${photo.image.width} / ${photo.image.height}` }}
                >
                  <Image
                    src={photo.image.url}
                    alt={photo.location || ""}
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="w-full h-auto bg-gray-200 dark:bg-neutral-900"
                    width={photo.image.width}
                    height={photo.image.height}
                    quality={90}
                    loader={contentfulLoader}
                  />
                  {photo.location && (
                    <div className="absolute bottom-0 left-0 right-0 top-0 flex flex-col justify-end gap-1 bg-gradient-to-b from-transparent via-transparent via-50% to-black/60 px-4 pb-5 pt-0 text-white group-hover:opacity-100 opacity-0 transition-opacity">
                      <div className="text-sm">{photo.location}</div>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default Masonry;
