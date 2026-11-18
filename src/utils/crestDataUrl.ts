import { crestUrl } from "../data/clubs";

const cache = new Map<number, string>();

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

/** Inline crest for canvas/html-to-image (avoids CORS taint). */
export async function getCrestDataUrl(crestId: number): Promise<string | null> {
  const cached = cache.get(crestId);
  if (cached) return cached;

  try {
    const res = await fetch(crestUrl(crestId), { mode: "cors" });
    if (!res.ok) return null;
    const dataUrl = await blobToDataUrl(await res.blob());
    cache.set(crestId, dataUrl);
    return dataUrl;
  } catch {
    return null;
  }
}

export function waitForImages(root: HTMLElement): Promise<void> {
  const images = Array.from(root.querySelectorAll("img"));
  if (images.length === 0) return Promise.resolve();

  return Promise.all(
    images.map(
      (img) =>
        new Promise<void>((resolve) => {
          if (img.complete && img.naturalWidth > 0) {
            resolve();
            return;
          }
          const done = () => resolve();
          img.addEventListener("load", done, { once: true });
          img.addEventListener("error", done, { once: true });
        })
    )
  ).then(() => undefined);
}