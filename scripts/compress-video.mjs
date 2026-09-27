/**
 * Compresses a video into a smaller H.264 MP4 (universal fallback) and a
 * VP9 WebM (preferred — browsers use whichever <source> they support first).
 * Uses CRF-based encoding, not a flat low bitrate, so quality stays visually
 * intact while cutting file size. Strips audio by default since this is
 * built for muted background/hero videos — pass --keep-audio to preserve it.
 *
 * Usage:
 *   node scripts/compress-video.mjs <input> [outputBaseName] [--keep-audio]
 *
 * Examples:
 *   node scripts/compress-video.mjs assets-source/nike-original.mp4 nike
 *     -> writes public/images/nike.mp4 and public/images/nike.webm
 *
 *   node scripts/compress-video.mjs ~/Downloads/new-hero.mov hero-v2
 *     -> writes public/images/hero-v2.mp4 and public/images/hero-v2.webm
 */
import { execFileSync } from "node:child_process";
import { statSync, existsSync } from "node:fs";
import path from "node:path";
import ffmpeg from "ffmpeg-static";

const args = process.argv.slice(2).filter((a) => a !== "--keep-audio");
const keepAudio = process.argv.includes("--keep-audio");
const input = args[0];

if (!input) {
  console.error("Usage: node scripts/compress-video.mjs <input> [outputBaseName] [--keep-audio]");
  process.exit(1);
}

const root = process.cwd();
const inputPath = path.resolve(root, input);
if (!existsSync(inputPath)) {
  console.error(`Input file not found: ${inputPath}`);
  process.exit(1);
}

const outputBase = args[1] || path.basename(inputPath, path.extname(inputPath));
const outMp4 = path.join(root, "public", "images", `${outputBase}.mp4`);
const outWebm = path.join(root, "public", "images", `${outputBase}.webm`);
const audioFlag = keepAudio ? [] : ["-an"];

function mb(bytes) {
  return (bytes / 1024 / 1024).toFixed(2) + " MB";
}

const originalSize = statSync(inputPath).size;
console.log(`Input: ${mb(originalSize)} (${inputPath})`);

console.log("Encoding H.264 MP4 (CRF 26, faststart)...");
execFileSync(ffmpeg, [
  "-y",
  "-i",
  inputPath,
  ...audioFlag,
  "-c:v",
  "libx264",
  "-preset",
  "slow",
  "-crf",
  "26",
  "-pix_fmt",
  "yuv420p",
  "-movflags",
  "+faststart",
  outMp4,
]);

console.log("Encoding VP9 WebM (smaller, preferred where supported)...");
execFileSync(ffmpeg, [
  "-y",
  "-i",
  inputPath,
  ...audioFlag,
  "-c:v",
  "libvpx-vp9",
  "-crf",
  "32",
  "-b:v",
  "0",
  "-deadline",
  "good",
  "-cpu-used",
  "2",
  outWebm,
]);

const newMp4Size = statSync(outMp4).size;
const webmSize = statSync(outWebm).size;

console.log("\nDone.");
console.log(`  ${path.relative(root, outMp4)}:  ${mb(newMp4Size)} (${Math.round((1 - newMp4Size / originalSize) * 100)}% smaller than input)`);
console.log(`  ${path.relative(root, outWebm)}: ${mb(webmSize)} (${Math.round((1 - webmSize / originalSize) * 100)}% smaller than input)`);
console.log(`\nUse both in a <video> tag, webm listed first:`);
console.log(`  <source src="/images/${outputBase}.webm" type="video/webm" />`);
console.log(`  <source src="/images/${outputBase}.mp4" type="video/mp4" />`);
