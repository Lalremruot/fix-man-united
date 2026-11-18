import { renderShareCardPng } from "./shareCardCanvas";

export async function exportShareCard(
  position: number,
  reaction: string
): Promise<string | null> {
  return renderShareCardPng(position, reaction);
}

export function downloadDataUrl(dataUrl: string, filename: string): void {
  const link = document.createElement("a");
  link.download = filename;
  link.href = dataUrl;
  link.rel = "noopener";
  document.body.appendChild(link);
  link.click();
  link.remove();
}