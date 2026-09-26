import Image from "next/image";
import { site, type SiteImage } from "@/data/site";
import { cn } from "@/lib/cn";
import { MaterialSwatch } from "./MaterialSwatch";

type Props = {
  image: SiteImage;
  uid: string;
  /** Figure number shown in the placeholder caption, e.g. "01". */
  figure?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  captionPosition?: "top-left" | "bottom-left" | "bottom-right";
  /** Hide the placeholder caption (e.g. on small secondary images). */
  hideCaption?: boolean;
};

/**
 * Renders the real photo when `image.src` is set in data/site.ts,
 * otherwise an art-directed material placeholder.
 */
export function ProjectImage({ image, uid, figure, sizes = "100vw", priority, className, captionPosition = "bottom-left", hideCaption }: Props) {
  const positioned = /\b(absolute|fixed)\b/.test(className ?? "");
  return (
    <div className={cn("overflow-hidden bg-ink-3", !positioned && "relative", className)}>
      {image.src ? (
        <Image src={image.src} alt={image.alt} fill sizes={sizes} priority={priority} className="object-cover" />
      ) : (
        <>
          <MaterialSwatch kind={image.placeholder} uid={uid} />
          {site.showPlaceholderLabels && !hideCaption && (
            <span
              className={cn(
                "absolute z-10 flex items-center gap-2 bg-ink/85 px-2.5 py-1.5 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-concrete-200 backdrop-blur-sm",
                captionPosition === "top-left" && "left-3 top-3",
                captionPosition === "bottom-left" && "bottom-3 left-3",
                captionPosition === "bottom-right" && "bottom-3 right-3",
              )}
            >
              {figure && <span className="text-rust-300">Fig. {figure}</span>}
              <span>{site.hero.placeholderCaption}</span>
            </span>
          )}
        </>
      )}
    </div>
  );
}
