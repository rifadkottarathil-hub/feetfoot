import Link from "next/link";
import { placeholderSvg } from "@/lib/placeholder";
import SmartImage from "@/components/ui/SmartImage";

const TILES = [
  { label: "Running", href: "/shop?category=Running", seed: "promo-running" },
  { label: "Lifestyle", href: "/shop?category=Lifestyle", seed: "promo-lifestyle" },
];

export default function PromoTiles() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {TILES.map((tile) => (
        <Link
          key={tile.label}
          href={tile.href}
          className="group relative block aspect-[4/3] overflow-hidden bg-band"
        >
          <SmartImage
            src={placeholderSvg(tile.seed, 0, `${tile.label} sneakers`)}
            alt={`Shop ${tile.label} sneakers`}
            fill
            sizes="(min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
          />
          <span className="absolute bottom-5 left-5 bg-paper px-4 py-2 font-heading text-lg font-extrabold uppercase tracking-wide">
            {tile.label}
          </span>
        </Link>
      ))}
    </div>
  );
}
