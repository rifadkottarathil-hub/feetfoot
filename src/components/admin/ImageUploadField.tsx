"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import ImageCropModal from "@/components/admin/ImageCropModal";

interface PendingImage {
  id: string;
  file: File;
  previewUrl: string;
}

export default function ImageUploadField({ name = "images" }: { name?: string }) {
  const pickerInputRef = useRef<HTMLInputElement>(null);
  const hiddenSubmitInputRef = useRef<HTMLInputElement>(null);

  const [queue, setQueue] = useState<File[]>([]);
  const [pending, setPending] = useState<PendingImage[]>([]);
  const activeFile = queue[0] ?? null;
  const activeSrc = useMemo(() => (activeFile ? URL.createObjectURL(activeFile) : null), [activeFile]);

  // Sync the cropped set onto the real file input the form auto-submits —
  // safe now that the crop modal's buttons are correctly type="button", so
  // this always finishes running before any submit can happen.
  useEffect(() => {
    const input = hiddenSubmitInputRef.current;
    if (!input) return;
    const transfer = new DataTransfer();
    pending.forEach((p) => transfer.items.add(p.file));
    input.files = transfer.files;
  }, [pending]);

  // Release the previous crop-source object URL once it's no longer the active one.
  useEffect(() => {
    return () => {
      if (activeSrc) URL.revokeObjectURL(activeSrc);
    };
  }, [activeSrc]);

  function handlePick(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";
    if (files.length > 0) setQueue((prev) => [...prev, ...files]);
  }

  function advanceQueue() {
    setQueue((prev) => prev.slice(1));
  }

  function handleCropConfirm(blob: Blob) {
    if (!activeFile) return;
    const croppedFile = new File([blob], activeFile.name.replace(/\.[^.]+$/, ".jpg"), {
      type: "image/jpeg",
    });
    setPending((prev) => [
      ...prev,
      { id: crypto.randomUUID(), file: croppedFile, previewUrl: URL.createObjectURL(croppedFile) },
    ]);
    advanceQueue();
  }

  function removePending(id: string) {
    setPending((prev) => {
      const target = prev.find((p) => p.id === id);
      if (target) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((p) => p.id !== id);
    });
  }

  return (
    <div>
      {pending.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-3">
          {pending.map((p) => (
            <div key={p.id} className="relative h-20 w-20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.previewUrl} alt="" className="h-full w-full border border-line object-cover" />
              <button
                type="button"
                onClick={() => removePending(p.id)}
                aria-label="Remove image"
                className="absolute -right-2 -top-2 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-ink text-xs text-paper"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      )}

      <input
        ref={pickerInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handlePick}
        className="hidden"
      />
      {/* The real field the form submits — populated from `pending` via DataTransfer above. */}
      <input ref={hiddenSubmitInputRef} type="file" name={name} multiple className="hidden" />

      <button
        type="button"
        onClick={() => pickerInputRef.current?.click()}
        className="cursor-pointer border border-line bg-paper px-4 py-2 text-sm font-bold uppercase tracking-wide hover:border-ink"
      >
        Add images
      </button>
      <p className="mt-1 text-xs text-ink/50">
        Each image is cropped to a square before upload, so every product photo lines up the same way.
      </p>

      {activeFile && activeSrc && (
        <ImageCropModal
          imageSrc={activeSrc}
          fileName={activeFile.name}
          onConfirm={handleCropConfirm}
          onCancel={advanceQueue}
        />
      )}
    </div>
  );
}
