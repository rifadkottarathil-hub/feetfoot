function hashString(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

const SHADES = ["#D9D9D9", "#CFCFCF", "#C4C4C4", "#DCD6CE", "#D2D6D4", "#D6D0DC"];

/**
 * Deterministic, neutral placeholder artwork: a plain grey band with an
 * abstract sneaker silhouette. Not a stand-in for any brand's product
 * photography — swap for real photos before launch.
 */
export function placeholderSvg(seed: string, variant: number, label: string): string {
  const h = hashString(`${seed}-${variant}`);
  const shade = SHADES[h % SHADES.length];
  const flip = variant % 2 === 1;
  const tilt = flip ? -6 : 6;

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" role="img" aria-label="${escapeXml(
    label
  )}">
  <rect width="800" height="800" fill="#171717"/>
  <g transform="translate(400 430) rotate(${tilt}) ${flip ? "scale(-1,1)" : ""}">
    <path d="M -260 40
      C -260 0 -230 -20 -190 -30
      L -60 -70
      C -10 -86 40 -90 100 -70
      L 200 -34
      C 250 -16 270 20 270 55
      C 270 85 245 100 210 100
      L -220 100
      C -245 100 -260 70 -260 40 Z"
      fill="${shade}" stroke="#111111" stroke-width="4" stroke-opacity="0.15"/>
    <path d="M -190 -30 L -150 -95 L -70 -95 L -60 -70 Z" fill="${shade}" stroke="#111111" stroke-width="4" stroke-opacity="0.15"/>
    <line x1="-210" y1="20" x2="180" y2="20" stroke="#111111" stroke-opacity="0.12" stroke-width="6"/>
    <line x1="-200" y1="55" x2="190" y2="55" stroke="#111111" stroke-opacity="0.1" stroke-width="10"/>
  </g>
  <text x="400" y="700" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" fill="#F2F2F2" fill-opacity="0.4">${escapeXml(
    label
  )}</text>
</svg>`.trim();

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function escapeXml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
