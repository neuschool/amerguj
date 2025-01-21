import Image from "next/image";
import { Photo } from "../../graphql/types/types.generated";
import contentfulLoader from "../../lib/contentfulLoader";
import { useState } from "react";
import { MapPinIcon, SpinnerIcon } from "../Icons";

interface LightboxPhotoProps {
  photo: Photo;
  className?: string;
}

export default function LightboxPhoto({ photo, className }: LightboxPhotoProps) {
  const [loading, setLoading] = useState(true);

  return (
    <div className={`flex flex-col sm:flex-row overflow-hidden h-full w-full bg-white dark:bg-neutral-950 ${className || ''}`}>
      <div className="relative flex grow-0 flex-auto">
        {loading && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <SpinnerIcon size={24} />
          </div>
        )}

        <Image
          src={photo.image.url}
          alt={photo.location || ""}
          sizes="(max-width: 768px) 100vw, 1024px"
          className="bg-gray-200 dark:bg-neutral-900 object-contain"
          width={photo.image.width}
          height={photo.image.height}
          onLoad={() => setLoading(false)}
          quality={90}
          loader={contentfulLoader}
        />
      </div>

      {photo.location && (
        <div className="sm:basis-[400px] bg-white dark:bg-neutral-950 shrink-0 p-6 flex flex-col justify-between small:flex-initial flex-auto">
          <ul className="text-neutral-500 dark:text-silver-dark flex flex-col gap-1">
            <li className="flex gap-2 items-center">
              <MapPinIcon size={16} />
              {photo.location}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
