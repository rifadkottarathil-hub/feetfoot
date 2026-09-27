import Image from "next/image";

const IS_REMOTE = /^https?:\/\//;

interface SmartImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
  width?: number;
  height?: number;
  onClick?: React.MouseEventHandler;
}

/**
 * Serves real uploaded photos through Next.js's image pipeline (automatic
 * AVIF/WebP, responsive sizes, lazy loading) — but passes through data: URIs
 * (the illustrated SVG placeholders) and blob:/local previews untouched,
 * since there's nothing for the optimizer to do with those.
 */
export default function SmartImage({
  src,
  alt,
  className,
  sizes,
  priority,
  fill,
  width,
  height,
  onClick,
}: SmartImageProps) {
  if (!IS_REMOTE.test(src)) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} className={className} onClick={onClick} />;
  }

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes ?? "100vw"}
        quality={82}
        priority={priority}
        className={className}
        onClick={onClick}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width ?? 1600}
      height={height ?? 1600}
      sizes={sizes}
      quality={82}
      priority={priority}
      className={className}
      onClick={onClick}
    />
  );
}
