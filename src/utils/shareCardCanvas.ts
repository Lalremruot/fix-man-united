import { TAGLINE } from "../data/reactions";
import { SITE_URL } from "../data/site";

const W = 400;
const PAD = 24;
const PURPLE = "#37003c";
const MU_RED = "#DA291C";

function crestAssetUrl(): string {
  const base = import.meta.env.BASE_URL ?? "/";
  const path = `${base}mu-crest.png`.replace(/\/{2,}/g, "/");
  if (typeof window !== "undefined") {
    return new URL(path, window.location.origin).href;
  }
  return path;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("crest load failed"));
    img.src = src;
  });
}

function ordinalSuffix(n: number): string {
  const v = n % 100;
  if (v >= 11 && v <= 13) return "TH";
  if (n % 10 === 1) return "ST";
  if (n % 10 === 2) return "ND";
  if (n % 10 === 3) return "RD";
  return "TH";
}

function wrapLines(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  maxLines = 6
): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = "";

  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
      if (lines.length >= maxLines) break;
    } else {
      line = test;
    }
  }
  if (line && lines.length < maxLines) lines.push(line);
  return lines;
}

export async function renderShareCardPng(
  position: number,
  reaction: string
): Promise<string | null> {
  const crest = await loadImage(crestAssetUrl()).catch(() => null);
  const suffix = ordinalSuffix(position);

  const measureCanvas = document.createElement("canvas");
  const mctx = measureCanvas.getContext("2d");
  if (!mctx) return null;
  mctx.font = "14px Inter, system-ui, sans-serif";
  const reactionLines = wrapLines(mctx, reaction, W - PAD * 2);

  const headerH = 92;
  const bodyTop = headerH;
  const crestBlock = 80;
  const reactionBlock = reactionLines.length * 20 + 16;
  const footerBlock = 56;
  const H = bodyTop + PAD + crestBlock + 12 + reactionBlock + footerBlock + PAD;

  const scale = 2;
  const canvas = document.createElement("canvas");
  canvas.width = W * scale;
  canvas.height = H * scale;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.scale(scale, scale);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, W, H);

  ctx.fillStyle = PURPLE;
  ctx.fillRect(0, 0, W, headerH);

  const headerCrest = 48;
  if (crest) {
    ctx.drawImage(crest, PAD, (headerH - headerCrest) / 2, headerCrest, headerCrest);
  }

  const textX = PAD + (crest ? headerCrest + 12 : 0);
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 18px Inter, system-ui, sans-serif";
  ctx.fillText("FIX MAN UNITED", textX, 36);

  ctx.font = "italic bold 11px Inter, system-ui, sans-serif";
  const taglineLines = wrapLines(ctx, TAGLINE, W - textX - PAD, 2);
  taglineLines.forEach((line, i) => {
    ctx.fillText(line, textX, 54 + i * 14);
  });

  let y = bodyTop + PAD;

  const bigCrest = 72;
  if (crest) {
    ctx.drawImage(crest, PAD, y, bigCrest, bigCrest);
  }

  const posX = PAD + bigCrest + 16;
  ctx.fillStyle = MU_RED;
  ctx.font = "bold 40px Roboto Condensed, Inter, system-ui, sans-serif";
  ctx.fillText(`${position}`, posX, y + 38);
  const posNumW = ctx.measureText(`${position}`).width;
  ctx.fillStyle = "#18181b";
  ctx.font = "bold 28px Roboto Condensed, Inter, system-ui, sans-serif";
  ctx.fillText(suffix, posX + posNumW + 2, y + 38);

  ctx.fillStyle = "#71717a";
  ctx.font = "600 10px Inter, system-ui, sans-serif";
  ctx.fillText("PREMIER LEAGUE TABLE POSITION", posX, y + 58);

  y += crestBlock + 8;

  ctx.fillStyle = "#27272a";
  ctx.font = "14px Inter, system-ui, sans-serif";
  for (const line of reactionLines) {
    ctx.fillText(line, PAD, y);
    y += 20;
  }

  y += 8;
  ctx.strokeStyle = "#e4e4e7";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(PAD, y);
  ctx.lineTo(W - PAD, y);
  ctx.stroke();

  y += 16;
  ctx.fillStyle = "#a1a1aa";
  ctx.font = "600 10px Inter, system-ui, sans-serif";
  ctx.fillText("SOURCE", PAD, y);

  ctx.fillStyle = PURPLE;
  ctx.font = "600 14px Inter, system-ui, sans-serif";
  ctx.fillText(SITE_URL, PAD, y + 18);

  const dataUrl = canvas.toDataURL("image/png");
  return dataUrl.length > 500 ? dataUrl : null;
}