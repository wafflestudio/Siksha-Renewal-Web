/**
 * 서버(Spring Boot)의 multipart 파일당 기본 제한이 1MB라서,
 * 업로드 전에 브라우저에서 이미지를 리사이즈/재인코딩해 용량을 맞춘다.
 * 압축이 불가능한 포맷(예: 브라우저가 디코딩하지 못하는 파일)은 원본을 그대로 돌려준다.
 */

const DEFAULT_MAX_BYTES = 900 * 1024; // 서버 제한(1MB)보다 여유 있게
const DEFAULT_MAX_DIMENSION = 1600;
const QUALITY_STEPS = [0.85, 0.75, 0.65, 0.5];
const MIN_DIMENSION = 400;

type CompressOptions = {
  maxBytes?: number;
  maxDimension?: number;
};

const loadImage = (file: File): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to decode image"));
    };
    img.src = url;
  });

const canvasToBlob = (canvas: HTMLCanvasElement, quality: number): Promise<Blob | null> =>
  new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", quality));

const drawScaled = (img: HTMLImageElement, maxDimension: number): HTMLCanvasElement => {
  const scale = Math.min(1, maxDimension / Math.max(img.naturalWidth, img.naturalHeight));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(img.naturalWidth * scale));
  canvas.height = Math.max(1, Math.round(img.naturalHeight * scale));
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D context unavailable");
  // 투명 PNG를 JPEG로 바꿀 때 검은 배경이 되지 않도록 흰색으로 채운다
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  return canvas;
};

const toJpegName = (name: string) => name.replace(/\.[^.]+$/, "") + ".jpg";

export async function compressImage(file: File, options: CompressOptions = {}): Promise<File> {
  const maxBytes = options.maxBytes ?? DEFAULT_MAX_BYTES;
  const maxDimension = options.maxDimension ?? DEFAULT_MAX_DIMENSION;

  if (file.size <= maxBytes) return file;

  let img: HTMLImageElement;
  try {
    img = await loadImage(file);
  } catch (e) {
    console.error("compressImage: decode failed, uploading original", e);
    return file;
  }

  let dimension = maxDimension;
  let best: Blob | null = null;

  while (dimension >= MIN_DIMENSION) {
    const canvas = drawScaled(img, dimension);
    for (const quality of QUALITY_STEPS) {
      const blob = await canvasToBlob(canvas, quality);
      if (!blob) continue;
      if (!best || blob.size < best.size) best = blob;
      if (blob.size <= maxBytes) {
        return new File([blob], toJpegName(file.name), { type: "image/jpeg" });
      }
    }
    dimension = Math.floor(dimension / 2);
  }

  // 목표 용량까지 못 줄였더라도 가장 작은 결과를 돌려준다
  if (best && best.size < file.size) {
    return new File([best], toJpegName(file.name), { type: "image/jpeg" });
  }
  return file;
}
