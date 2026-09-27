export interface PixelCrop {
  x: number;
  y: number;
  width: number;
  height: number;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.addEventListener("load", () => resolve(img));
    img.addEventListener("error", (err) => reject(err));
    img.src = src;
  });
}

/** Crops `imageSrc` to the given pixel rect and returns a JPEG Blob at that exact size. */
export async function getCroppedImageBlob(
  imageSrc: string,
  crop: PixelCrop,
  outputSize = 1600
): Promise<Blob> {
  const image = await loadImage(imageSrc);
  // Never upscale — cap the output at the actual cropped resolution.
  const size = Math.round(Math.min(outputSize, crop.width, crop.height));
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas is not supported in this browser.");

  ctx.drawImage(image, crop.x, crop.y, crop.width, crop.height, 0, 0, size, size);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("Failed to export cropped image."))),
      "image/jpeg",
      0.9
    );
  });
}
