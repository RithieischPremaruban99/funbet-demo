// Canvas-based color extraction with median-cut clustering
// All client-side, no external APIs

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface HSL {
  h: number;
  s: number;
  l: number;
}

export interface ExtractedPalette {
  colors: string[]; // hex values
  primary: string;
  secondary: string;
  accent: string;
  isDark: boolean;
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
}

function hexToRgb(hex: string): RGB {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

export function rgbToHsl(r: number, g: number, b: number): HSL {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

export function hslToString(h: number, s: number, l: number): string {
  return `${h} ${s}% ${l}%`;
}

function colorDistance(a: RGB, b: RGB): number {
  return Math.sqrt((a.r - b.r) ** 2 + (a.g - b.g) ** 2 + (a.b - b.b) ** 2);
}

function hueDistance(h1: number, h2: number): number {
  const d = Math.abs(h1 - h2);
  return Math.min(d, 360 - d);
}

function isNearWhite(r: number, g: number, b: number): boolean {
  return r > 240 && g > 240 && b > 240;
}

function isNearBlack(r: number, g: number, b: number): boolean {
  return r < 26 && g < 26 && b < 26;
}

function isTransparent(a: number): boolean {
  return a < 128;
}

// Median cut algorithm for color quantization
function medianCut(pixels: RGB[], depth: number): RGB[] {
  if (depth === 0 || pixels.length <= 1) {
    if (pixels.length === 0) return [];
    const avg: RGB = {
      r: Math.round(pixels.reduce((s, p) => s + p.r, 0) / pixels.length),
      g: Math.round(pixels.reduce((s, p) => s + p.g, 0) / pixels.length),
      b: Math.round(pixels.reduce((s, p) => s + p.b, 0) / pixels.length),
    };
    return [avg];
  }

  // Find channel with greatest range
  let rMin = 255, rMax = 0, gMin = 255, gMax = 0, bMin = 255, bMax = 0;
  for (const p of pixels) {
    rMin = Math.min(rMin, p.r); rMax = Math.max(rMax, p.r);
    gMin = Math.min(gMin, p.g); gMax = Math.max(gMax, p.g);
    bMin = Math.min(bMin, p.b); bMax = Math.max(bMax, p.b);
  }

  const rRange = rMax - rMin;
  const gRange = gMax - gMin;
  const bRange = bMax - bMin;

  let sortKey: keyof RGB;
  if (rRange >= gRange && rRange >= bRange) sortKey = 'r';
  else if (gRange >= bRange) sortKey = 'g';
  else sortKey = 'b';

  pixels.sort((a, b) => a[sortKey] - b[sortKey]);
  const mid = Math.floor(pixels.length / 2);

  return [
    ...medianCut(pixels.slice(0, mid), depth - 1),
    ...medianCut(pixels.slice(mid), depth - 1),
  ];
}

export function extractColorsFromImage(imageUrl: string): Promise<ExtractedPalette> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const size = 100; // downsample for performance
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0, size, size);
        const imageData = ctx.getImageData(0, 0, size, size);
        const data = imageData.data;

        // Sample pixels, skip transparent/near-white/near-black
        const pixels: RGB[] = [];
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
          if (isTransparent(a)) continue;
          if (isNearWhite(r, g, b) || isNearBlack(r, g, b)) continue;
          pixels.push({ r, g, b });
        }

        let palette: RGB[];
        let isMonochrome = false;

        if (pixels.length < 10) {
          // Monochrome or mostly transparent — resample including whites/blacks
          const allPixels: RGB[] = [];
          for (let i = 0; i < data.length; i += 4) {
            if (!isTransparent(data[i + 3])) {
              allPixels.push({ r: data[i], g: data[i + 1], b: data[i + 2] });
            }
          }
          palette = medianCut(allPixels.length > 0 ? allPixels : [{ r: 128, g: 128, b: 128 }], 2);
          isMonochrome = true;
        } else {
          // Run median cut to get ~8 colors, then pick top 5 by uniqueness
          palette = medianCut(pixels, 3); // 2^3 = 8 buckets
        }

        // Sort by saturation (most saturated first)
        const withHsl = palette.map(p => ({
          ...p,
          hex: rgbToHex(p.r, p.g, p.b),
          hsl: rgbToHsl(p.r, p.g, p.b),
        }));
        withHsl.sort((a, b) => b.hsl.s - a.hsl.s);

        // Deduplicate similar colors
        const unique = [withHsl[0]];
        for (let i = 1; i < withHsl.length; i++) {
          const tooClose = unique.some(u => colorDistance(u, withHsl[i]) < 40);
          if (!tooClose) unique.push(withHsl[i]);
          if (unique.length >= 5) break;
        }

        // Fill to at least 3 colors
        while (unique.length < 3) {
          const base = unique[0].hsl;
          const rotated = (base.h + 30 * unique.length) % 360;
          unique.push({
            r: 0, g: 0, b: 0,
            hex: '', // will be recalculated
            hsl: { h: rotated, s: Math.max(base.s, 50), l: Math.max(base.l, 40) },
          });
        }

        // Recalculate hex for generated colors
        for (const c of unique) {
          if (!c.hex) {
            const rgb = hslToRgb(c.hsl.h, c.hsl.s, c.hsl.l);
            c.r = rgb.r; c.g = rgb.g; c.b = rgb.b;
            c.hex = rgbToHex(rgb.r, rgb.g, rgb.b);
          }
        }

        // If monochrome, generate a complementary accent
        if (isMonochrome) {
          unique[0].hsl = { h: 210, s: 60, l: 50 }; // cool blue as primary
          const rgb = hslToRgb(210, 60, 50);
          unique[0] = { ...unique[0], ...rgb, hex: rgbToHex(rgb.r, rgb.g, rgb.b) };
        }

        const primary = unique[0];
        // Find most hue-distant for accent
        let maxDist = 0, accentIdx = 1;
        for (let i = 1; i < unique.length; i++) {
          const d = hueDistance(primary.hsl.h, unique[i].hsl.h);
          if (d > maxDist) { maxDist = d; accentIdx = i; }
        }
        const secondaryIdx = accentIdx === 1 ? (unique.length > 2 ? 2 : 1) : 1;

        const colors = unique.slice(0, 5).map(c => c.hex);

        console.log('[BrandTheme] Extracted palette:', colors);
        console.log('[BrandTheme] Primary:', primary.hex, 'Secondary:', unique[secondaryIdx].hex, 'Accent:', unique[accentIdx].hex);

        resolve({
          colors,
          primary: primary.hex,
          secondary: unique[secondaryIdx].hex,
          accent: unique[accentIdx].hex,
          isDark: primary.hsl.l < 50,
        });
      } catch (e) {
        reject(e);
      }
    };
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = imageUrl;
  });
}

function hslToRgb(h: number, s: number, l: number): RGB {
  s /= 100; l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return {
    r: Math.round(f(0) * 255),
    g: Math.round(f(8) * 255),
    b: Math.round(f(4) * 255),
  };
}

// Contrast ratio calculation (WCAG)
export function getContrastRatio(hex1: string, hex2: string): number {
  const lum = (hex: string) => {
    const { r, g, b } = hexToRgb(hex);
    const [rs, gs, bs] = [r, g, b].map(v => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };
  const l1 = lum(hex1), l2 = lum(hex2);
  const lighter = Math.max(l1, l2), darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

export function ensureContrast(foreground: string, background: string, minRatio = 4.5): string {
  if (getContrastRatio(foreground, background) >= minRatio) return foreground;
  // Try white or near-black
  const whiteRatio = getContrastRatio('#ffffff', background);
  const blackRatio = getContrastRatio('#111111', background);
  return whiteRatio >= blackRatio ? '#ffffff' : '#111111';
}
