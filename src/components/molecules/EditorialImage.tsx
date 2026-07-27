import * as React from "react";
import Image from "next/image";

export interface EditorialImageProps {
  imageId: string;
  alt: string;
  caption?: string | null;
  aspect?: string;
  className?: string;
  priority?: boolean;
}

/** A Directus-backed editorial image served through the public media guard. */
export function EditorialImage({
  imageId,
  alt,
  caption,
  aspect = "16/9",
  className,
  priority = false,
}: EditorialImageProps) {
  return (
    <figure className={className}>
      <div
        className="relative overflow-hidden rounded-lg border border-hair bg-sunk shadow-md"
        style={{ aspectRatio: aspect }}
      >
        <Image
          src={`/media/${imageId}`}
          alt={alt}
          fill
          priority={priority}
          unoptimized
          sizes="(max-width: 800px) 100vw, 760px"
          className="object-cover"
        />
      </div>
      {caption && (
        <figcaption className="mt-2 font-ui text-xs italic text-muted">{caption}</figcaption>
      )}
    </figure>
  );
}
