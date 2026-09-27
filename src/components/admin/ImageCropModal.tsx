"use client";

import { useCallback, useState } from "react";
import Cropper, { type Area } from "react-easy-crop";
import { getCroppedImageBlob } from "@/lib/cropImage";

export default function ImageCropModal({
  imageSrc,
  fileName,
  onConfirm,
  onCancel,
}: {
  imageSrc: string;
  fileName: string;
  onConfirm: (blob: Blob) => void;
  onCancel: () => void;
}) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [busy, setBusy] = useState(false);

  const onCropComplete = useCallback((_croppedArea: Area, pixels: Area) => {
    setCroppedAreaPixels(pixels);
  }, []);

  const handleConfirm = async () => {
    if (!croppedAreaPixels) return;
    setBusy(true);
    try {
      const blob = await getCroppedImageBlob(imageSrc, croppedAreaPixels);
      onConfirm(blob);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-5">
      <div className="flex w-full max-w-lg flex-col bg-paper">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <p className="font-heading text-sm font-bold uppercase tracking-wide">
            Crop &quot;{fileName}&quot;
          </p>
          <button
            type="button"
            onClick={onCancel}
            aria-label="Cancel"
            className="cursor-pointer p-1 text-2xl leading-none"
          >
            &times;
          </button>
        </div>

        <div className="relative h-80 w-full bg-band">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>

        <div className="flex flex-col gap-4 border-t border-line px-5 py-4">
          <label className="flex items-center gap-3 text-xs">
            <span className="font-bold uppercase tracking-wide text-ink/50">Zoom</span>
            <input
              type="range"
              min={1}
              max={3}
              step={0.01}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="flex-1 accent-accent"
            />
          </label>
          <p className="text-xs text-ink/50">Drag to reposition. Every product photo is cropped to a square.</p>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="cursor-pointer border border-line px-5 py-2 text-sm font-bold uppercase tracking-wide hover:border-ink"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={busy}
              className="cursor-pointer bg-accent px-5 py-2 text-sm font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {busy ? "Cropping..." : "Use this crop"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
