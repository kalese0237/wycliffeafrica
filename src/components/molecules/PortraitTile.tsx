import * as React from "react";
import Image from "next/image";
import { PhotoPlaceholder } from "@/components/molecules/PhotoPlaceholder";
import { cn } from "@/lib/cn";

export interface PortraitTileProps {
  /** Portrait file id (4:5). Falls back to a generated placeholder when absent. */
  image?: string | null;
  name: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}

/**
 * The tipped-in portrait tile: rounded, bordered, shadowed — the same object wherever it appears,
 * whether that's the masthead's own grid column or floated over a household photograph. Falls back
 * to a generated placeholder rather than leaving the column empty when there's no file yet.
 */
export function PortraitTile({ image, name, sizes, priority, className }: PortraitTileProps) {
  return (
    <div className={cn("w-full max-w-45 sm:max-w-51 lg:max-w-none", className)}>
      {image ? (
        <div className="relative aspect-4/5 overflow-hidden rounded-md border border-terra-300/30 bg-terra-800 shadow-lg">
          <Image
            src={`/media/${image}`}
            alt={`${name}, portrait`}
            fill
            priority={priority}
            sizes={sizes}
            className="object-cover"
          />
        </div>
      ) : (
        <PhotoPlaceholder
          caption={`${name}, portrait`}
          person={name}
          aspect="4/5"
          className="rounded-md border-terra-300/30"
        />
      )}
    </div>
  );
}
