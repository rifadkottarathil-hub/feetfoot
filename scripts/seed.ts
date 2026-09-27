/**
 * One-time (safely re-runnable) seed: populates brands + products in Supabase,
 * and uploads the two real product photo sets to Supabase Storage.
 *
 * Run with: npm run seed
 * Requires .env.local to already have NEXT_PUBLIC_SUPABASE_URL and
 * SUPABASE_SERVICE_ROLE_KEY set (see .env.local.example).
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";

process.loadEnvFile(join(process.cwd(), ".env.local"));

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceRoleKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(url, serviceRoleKey);
const BUCKET = "product-images";

const brands = [
  {
    name: "Nike",
    slug: "nike",
    short_description:
      "Performance running, basketball and lifestyle silhouettes, sourced through authorised Nike channels.",
  },
  {
    name: "Adidas",
    slug: "adidas",
    short_description:
      "Three-stripe icons and current performance lines, from the Samba to Ultraboost.",
  },
  {
    name: "New Balance",
    slug: "new-balance",
    short_description:
      "Cult lifestyle numbers and cushioned run shoes, built on New Balance's engineering-first reputation.",
  },
  {
    name: "Puma",
    slug: "puma",
    short_description:
      "Fast running and hoop-ready basketball shoes with Puma's motorsport-inspired design language.",
  },
  {
    name: "Asics",
    slug: "asics",
    short_description:
      "Gel-cushioned stability and long-mileage comfort, trusted by everyday runners across India.",
  },
];

interface SeedProduct {
  name: string;
  slug: string;
  brandSlug: string;
  category: "Running" | "Lifestyle" | "Basketball" | "Training";
  price: number;
  salePrice?: number;
  colourway: string;
  description: string[];
  sizeFit: string[];
  availableSizes: string;
  soldOut?: boolean;
  newArrival?: boolean;
  bestSeller?: boolean;
  localImages?: string[]; // filenames in public/images/products/
}

const products: SeedProduct[] = [
  {
    name: "Air Zoom Pegasus 40",
    slug: "nike-air-zoom-pegasus-40",
    brandSlug: "nike",
    category: "Running",
    price: 12999,
    colourway: "Black / White / Volt",
    description: [
      "The Pegasus 40 is the do-everything daily trainer, tuned for tempo runs and easy miles alike.",
      "A responsive foam midsole and breathable mesh upper keep it light on the road, mile after mile.",
    ],
    sizeFit: [
      "Fits true to size. Runners between sizes are advised to size up half a size for a roomier toe box.",
      "Medium width fit. Not recommended for wide feet.",
    ],
    availableSizes: "UK 6, UK 7, UK 8, UK 9, UK 10, UK 11",
    newArrival: true,
    bestSeller: true,
  },
  {
    name: "Air Force 1 '07",
    slug: "nike-air-force-1-07",
    brandSlug: "nike",
    category: "Lifestyle",
    price: 8995,
    salePrice: 7495,
    colourway: "Triple White",
    description: [
      "The silhouette that never left. Crisp leather upper, Air-Sole cushioning and a look that goes with everything.",
      "A wardrobe staple since 1982, unchanged where it counts.",
    ],
    sizeFit: ["Fits true to size.", "Leather upper will mould slightly to your foot after the first few wears."],
    availableSizes: "UK 6, UK 7, UK 8, UK 9, UK 10, UK 11, UK 12",
    bestSeller: true,
    localImages: ["air-force-1-1.jpg", "air-force-1-2.jpg", "air-force-1-3.jpg"],
  },
  {
    name: "Air Jordan 1 Retro High OG",
    slug: "nike-air-jordan-1-retro-high-og",
    brandSlug: "nike",
    category: "Basketball",
    price: 16995,
    colourway: "Wolf Grey / Black",
    description: [
      "The shoe that started it all. Originally built for Michael Jordan in 1985, the Air Jordan 1 remains the most influential basketball silhouette ever made.",
      "Premium leather upper, a padded collar for on-court support, and the Wings logo on the ankle — unmistakably Jordan.",
    ],
    sizeFit: ["Fits true to size.", "High-top collar runs slightly snug — break in over the first few wears."],
    availableSizes: "UK 6, UK 7, UK 8, UK 9, UK 10, UK 11",
    newArrival: true,
    localImages: ["air-jordan-1-1.jpg", "air-jordan-1-2.jpg", "air-jordan-1-3.jpg"],
  },
  {
    name: "Precision 6",
    slug: "nike-precision-6",
    brandSlug: "nike",
    category: "Basketball",
    price: 6499,
    colourway: "University Red / Black",
    description: [
      "An entry-level hoop shoe with a supportive fit and durable rubber outsole built for indoor and outdoor courts.",
    ],
    sizeFit: ["Fits true to size.", "Wide width friendly."],
    availableSizes: "UK 7, UK 8, UK 9, UK 10, UK 11",
    newArrival: true,
  },
  {
    name: "Ultraboost Light",
    slug: "adidas-ultraboost-light",
    brandSlug: "adidas",
    category: "Running",
    price: 17999,
    colourway: "Core Black",
    description: [
      "The lightest Ultraboost yet. New Light BOOST midsole delivers the same energy return in a lower weight.",
      "A Primeknit upper wraps the foot for a sock-like feel over long distances.",
    ],
    sizeFit: ["Runs slightly narrow. Half size up recommended for wide feet."],
    availableSizes: "UK 6, UK 7, UK 8, UK 9, UK 10",
    newArrival: true,
  },
  {
    name: "Samba OG",
    slug: "adidas-samba-og",
    brandSlug: "adidas",
    category: "Lifestyle",
    price: 8499,
    colourway: "White / Black / Gum",
    description: [
      "Originally built for the indoor pitch, now a street-style constant. Smooth leather upper with the classic gum sole.",
    ],
    sizeFit: ["Fits true to size.", "Low-profile fit — sits close to the foot."],
    availableSizes: "UK 6, UK 7, UK 8, UK 9, UK 10, UK 11",
    newArrival: true,
    bestSeller: true,
  },
  {
    name: "Dame Certified 3",
    slug: "adidas-dame-certified-3",
    brandSlug: "adidas",
    category: "Basketball",
    price: 9999,
    colourway: "Team Navy / Solar Red",
    description: [
      "Damian Lillard's signature shoe, built for quick cuts and long-range pull-ups with a low-to-the-ground platform.",
    ],
    sizeFit: ["Fits true to size."],
    availableSizes: "UK 8, UK 9, UK 10",
    soldOut: true,
  },
  {
    name: "550",
    slug: "new-balance-550",
    brandSlug: "new-balance",
    category: "Lifestyle",
    price: 9999,
    colourway: "White / Green",
    description: [
      "A basketball court classic from the archives, rebuilt with premium leather and a chunky, retro silhouette.",
    ],
    sizeFit: ["Fits true to size.", "Slightly roomy toe box."],
    availableSizes: "UK 6, UK 7, UK 8, UK 9, UK 10, UK 11",
    newArrival: true,
  },
  {
    name: "Fresh Foam 1080v13",
    slug: "new-balance-fresh-foam-1080v13",
    brandSlug: "new-balance",
    category: "Running",
    price: 15999,
    colourway: "Grey / Blue",
    description: [
      "Maximum cushioning for long runs and recovery days, with a plush Fresh Foam X midsole underfoot.",
    ],
    sizeFit: ["Fits true to size.", "Roomy fit — true-to-size or half size down for a snugger feel."],
    availableSizes: "UK 7, UK 8, UK 9, UK 10, UK 11, UK 12",
  },
  {
    name: "4020v8 Trainer",
    slug: "new-balance-4020v8-trainer",
    brandSlug: "new-balance",
    category: "Training",
    price: 6999,
    colourway: "Black / White",
    description: [
      "A stable, wide-based trainer built for lifting days, HIIT circuits and everything in between.",
    ],
    sizeFit: ["Fits true to size.", "Firm, supportive fit — not designed for running."],
    availableSizes: "UK 6, UK 7, UK 8, UK 9, UK 10",
    newArrival: true,
  },
  {
    name: "Velocity Nitro 3",
    slug: "puma-velocity-nitro-3",
    brandSlug: "puma",
    category: "Running",
    price: 8999,
    colourway: "Blue / Yellow Alert",
    description: [
      "NITRO foam cushioning gives this daily trainer a springy, energetic ride at an accessible price point.",
    ],
    sizeFit: ["Fits true to size."],
    availableSizes: "UK 6, UK 7, UK 8, UK 9, UK 10, UK 11",
    newArrival: true,
    bestSeller: true,
  },
  {
    name: "Suede Classic XXI",
    slug: "puma-suede-classic-xxi",
    brandSlug: "puma",
    category: "Lifestyle",
    price: 3999,
    colourway: "Puma Black / White",
    description: [
      "The suede icon, unchanged since 1968. A low-cut silhouette with the signature Formstrip and gum sole.",
    ],
    sizeFit: ["Fits true to size.", "Suede upper — avoid wearing in wet weather."],
    availableSizes: "UK 6, UK 7, UK 8, UK 9, UK 10, UK 11, UK 12",
  },
  {
    name: "Gel-Kayano 30",
    slug: "asics-gel-kayano-30",
    brandSlug: "asics",
    category: "Running",
    price: 16999,
    colourway: "Deep Ocean / Pale Blue",
    description: [
      "A stability workhorse for overpronators, with a 4D Guidance System and plush GEL cushioning at the heel.",
    ],
    sizeFit: ["Fits true to size.", "Supportive, structured fit for stability runners."],
    availableSizes: "UK 7, UK 8, UK 9, UK 10, UK 11",
    newArrival: true,
  },
  {
    name: "Gel-Cross Trainer",
    slug: "asics-gel-cross-trainer",
    brandSlug: "asics",
    category: "Training",
    price: 5999,
    colourway: "Graphite Grey / Lime",
    description: [
      "A rugged, do-it-all trainer for circuit sessions and gym floors, with reinforced lateral support.",
    ],
    sizeFit: ["Fits true to size."],
    availableSizes: "UK 6, UK 7, UK 8, UK 9",
  },
];

async function uploadLocalImage(filename: string): Promise<string> {
  const filePath = join(process.cwd(), "public", "images", "products", filename);
  const file = readFileSync(filePath);
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(filename, file, { contentType: "image/jpeg", upsert: true });
  if (error) throw error;
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(filename);
  return data.publicUrl;
}

async function main() {
  console.log("Seeding brands...");
  const { data: brandRows, error: brandError } = await supabase
    .from("brands")
    .upsert(brands, { onConflict: "slug" })
    .select();
  if (brandError) throw brandError;

  const brandIdBySlug = new Map(brandRows!.map((b) => [b.slug, b.id]));
  console.log(`  ${brandRows!.length} brands ready.`);

  console.log("Uploading real product photos...");
  const imageUrlCache = new Map<string, string>();
  for (const product of products) {
    if (!product.localImages) continue;
    const urls: string[] = [];
    for (const filename of product.localImages) {
      if (!imageUrlCache.has(filename)) {
        imageUrlCache.set(filename, await uploadLocalImage(filename));
        console.log(`  uploaded ${filename}`);
      }
      urls.push(imageUrlCache.get(filename)!);
    }
    (product as SeedProduct & { _uploadedUrls?: string[] })._uploadedUrls = urls;
  }

  console.log("Seeding products...");
  const rows = products.map((p) => {
    const brandId = brandIdBySlug.get(p.brandSlug);
    if (!brandId) throw new Error(`Unknown brand slug: ${p.brandSlug}`);
    const uploaded = (p as SeedProduct & { _uploadedUrls?: string[] })._uploadedUrls;
    return {
      name: p.name,
      slug: p.slug,
      brand_id: brandId,
      category: p.category,
      price: p.price,
      sale_price: p.salePrice ?? null,
      colourway: p.colourway,
      description: p.description,
      size_fit: p.sizeFit,
      available_sizes: p.availableSizes,
      images: uploaded ?? [],
      sold_out: p.soldOut ?? false,
      new_arrival: p.newArrival ?? false,
      best_seller: p.bestSeller ?? false,
    };
  });

  const { error: productError } = await supabase.from("products").upsert(rows, { onConflict: "slug" });
  if (productError) throw productError;

  console.log(`  ${rows.length} products ready.`);
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
