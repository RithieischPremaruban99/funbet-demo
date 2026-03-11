import { createContext, useContext, useState, useCallback, ReactNode, useRef } from "react";
import { extractColorsFromImage, rgbToHsl, hslToString, ensureContrast, getContrastRatio, type ExtractedPalette } from "@/lib/colorExtraction";
import { toast } from "@/hooks/use-toast";

interface BrandTheme {
  logoUrl: string | null;
  palette: ExtractedPalette | null;
  isApplied: boolean;
}

interface BrandThemeContextType {
  theme: BrandTheme;
  uploadLogo: (file: File) => Promise<void>;
  applyTheme: () => void;
  resetTheme: () => void;
  isExtracting: boolean;
  showPanel: boolean;
  setShowPanel: (v: boolean) => void;
}

const BrandThemeContext = createContext<BrandThemeContextType | null>(null);

// Store original CSS variable values for reset
const ORIGINAL_VARS: Record<string, string> = {};
const THEME_VARS = [
  '--background', '--foreground', '--card', '--card-foreground', '--card-elevated',
  '--popover', '--popover-foreground', '--primary', '--primary-foreground',
  '--secondary', '--secondary-foreground', '--muted', '--muted-foreground',
  '--accent', '--accent-foreground', '--border', '--input', '--ring',
  '--highlight', '--highlight-foreground',
  '--sidebar-background', '--sidebar-foreground', '--sidebar-primary',
  '--sidebar-primary-foreground', '--sidebar-accent', '--sidebar-accent-foreground',
  '--sidebar-border', '--sidebar-ring',
  '--gold-gradient', '--gold-gradient-hover', '--gold-gradient-subtle',
  '--card-gradient', '--card-gradient-warm', '--glass',
];

function captureOriginalVars() {
  if (Object.keys(ORIGINAL_VARS).length > 0) return;
  const root = document.documentElement;
  const computed = getComputedStyle(root);
  for (const v of THEME_VARS) {
    ORIGINAL_VARS[v] = computed.getPropertyValue(v).trim();
  }
}

function hexToHslValues(hex: string): { h: number; s: number; l: number } {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return rgbToHsl(r, g, b);
}

function setVar(name: string, value: string) {
  document.documentElement.style.setProperty(name, value);
}

export function BrandThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<BrandTheme>({ logoUrl: null, palette: null, isApplied: false });
  const [isExtracting, setIsExtracting] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const hasTransition = useRef(false);

  const enableTransition = useCallback(() => {
    if (hasTransition.current) return;
    hasTransition.current = true;
    const style = document.createElement('style');
    style.id = 'brand-theme-transition';
    style.textContent = '*, *::before, *::after { transition: background-color 300ms ease, color 300ms ease, border-color 300ms ease, box-shadow 300ms ease !important; }';
    document.head.appendChild(style);
    setTimeout(() => {
      style.remove();
      hasTransition.current = false;
    }, 400);
  }, []);

  const uploadLogo = useCallback(async (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "File too large", description: "Please upload an image under 5MB.", variant: "destructive" });
      return;
    }

    const validTypes = ['image/png', 'image/jpeg', 'image/svg+xml', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast({ title: "Invalid format", description: "Please upload PNG, JPG, SVG, or WebP.", variant: "destructive" });
      return;
    }

    setIsExtracting(true);
    const url = URL.createObjectURL(file);

    try {
      // Check image dimensions
      const img = new Image();
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = url;
      });

      if (img.width < 50 || img.height < 50) {
        toast({ title: "Small image", description: "Image is very small — color results may vary.", variant: "default" });
      }

      const palette = await extractColorsFromImage(url);
      setTheme({ logoUrl: url, palette, isApplied: false });

      console.log('[BrandTheme] Palette extracted:', palette);
    } catch {
      toast({ title: "Extraction failed", description: "Could not extract colors from this image.", variant: "destructive" });
      URL.revokeObjectURL(url);
    } finally {
      setIsExtracting(false);
    }
  }, []);

  const applyTheme = useCallback(() => {
    if (!theme.palette) return;
    captureOriginalVars();
    enableTransition();

    const { primary, secondary, accent } = theme.palette;
    const pHsl = hexToHslValues(primary);
    const sHsl = hexToHslValues(secondary);
    const aHsl = hexToHslValues(accent);

    // Determine background: dark variant of primary
    const bgL = Math.min(pHsl.l, 12);
    const bgS = Math.max(Math.round(pHsl.s * 0.15), 0);
    const cardL = bgL + 5;
    const cardElevatedL = bgL + 8;
    const surfaceL = bgL + 3;
    const borderL = Math.min(bgL + 10, 20);

    // Foreground / text colors with contrast checks
    const bgHex = hslToHex(pHsl.h, bgS, bgL);
    const textPrimary = ensureContrast('#ffffff', bgHex);
    const textMuted = ensureContrast('#888888', bgHex, 3);
    const buttonText = ensureContrast('#000000', primary);

    // Apply all CSS vars
    setVar('--background', hslToString(pHsl.h, bgS, bgL));
    setVar('--foreground', textPrimary === '#ffffff' ? '0 0% 100%' : '0 0% 7%');
    setVar('--card', hslToString(pHsl.h, bgS, cardL));
    setVar('--card-foreground', textPrimary === '#ffffff' ? '0 0% 100%' : '0 0% 7%');
    setVar('--card-elevated', hslToString(pHsl.h, bgS, cardElevatedL));
    setVar('--popover', hslToString(pHsl.h, bgS, cardL));
    setVar('--popover-foreground', textPrimary === '#ffffff' ? '0 0% 100%' : '0 0% 7%');
    setVar('--primary', hslToString(pHsl.h, pHsl.s, pHsl.l));
    setVar('--primary-foreground', buttonText === '#ffffff' ? '0 0% 100%' : '0 0% 0%');
    setVar('--secondary', hslToString(sHsl.h, Math.round(sHsl.s * 0.3), cardElevatedL));
    setVar('--secondary-foreground', hslToString(sHsl.h, Math.round(sHsl.s * 0.4), 50));
    setVar('--muted', hslToString(pHsl.h, bgS, cardElevatedL));
    setVar('--muted-foreground', hslToString(pHsl.h, bgS, 55));
    setVar('--accent', hslToString(aHsl.h, aHsl.s, aHsl.l));
    setVar('--accent-foreground', ensureContrast('#000000', accent) === '#ffffff' ? '0 0% 100%' : '0 0% 0%');
    setVar('--border', hslToString(pHsl.h, Math.round(pHsl.s * 0.25), borderL));
    setVar('--input', hslToString(pHsl.h, Math.round(pHsl.s * 0.25), borderL));
    setVar('--ring', hslToString(pHsl.h, pHsl.s, pHsl.l));
    setVar('--highlight', hslToString(aHsl.h, aHsl.s, aHsl.l));
    setVar('--highlight-foreground', ensureContrast('#000000', accent) === '#ffffff' ? '0 0% 100%' : '0 0% 0%');

    // Sidebar
    setVar('--sidebar-background', hslToString(pHsl.h, bgS, bgL));
    setVar('--sidebar-foreground', textPrimary === '#ffffff' ? '0 0% 100%' : '0 0% 7%');
    setVar('--sidebar-primary', hslToString(pHsl.h, pHsl.s, pHsl.l));
    setVar('--sidebar-primary-foreground', buttonText === '#ffffff' ? '0 0% 100%' : '0 0% 0%');
    setVar('--sidebar-accent', hslToString(pHsl.h, bgS, cardElevatedL));
    setVar('--sidebar-accent-foreground', textPrimary === '#ffffff' ? '0 0% 100%' : '0 0% 7%');
    setVar('--sidebar-border', hslToString(pHsl.h, Math.round(pHsl.s * 0.25), borderL));
    setVar('--sidebar-ring', hslToString(pHsl.h, pHsl.s, pHsl.l));

    // Gradients
    const pHover = Math.min(pHsl.l + 8, 90);
    const pDark = Math.max(pHsl.l - 12, 10);
    const pLight = Math.min(pHsl.l + 16, 85);
    setVar('--gold-gradient', `linear-gradient(135deg, hsl(${pHsl.h},${pHsl.s}%,${pDark}%) 0%, hsl(${pHsl.h},${pHsl.s}%,${pHsl.l}%) 30%, hsl(${pHsl.h},${pHsl.s}%,${pLight}%) 50%, hsl(${pHsl.h},${pHsl.s}%,${pHsl.l}%) 70%, hsl(${pHsl.h},${pHsl.s}%,${pDark}%) 100%)`);
    setVar('--gold-gradient-hover', `linear-gradient(135deg, hsl(${pHsl.h},${pHsl.s}%,${pDark + 4}%) 0%, hsl(${pHsl.h},${pHsl.s}%,${pHover}%) 30%, hsl(${pHsl.h},${pHsl.s}%,${pLight + 4}%) 50%, hsl(${pHsl.h},${pHsl.s}%,${pHover}%) 70%, hsl(${pHsl.h},${pHsl.s}%,${pDark + 4}%) 100%)`);
    setVar('--gold-gradient-subtle', `linear-gradient(135deg, hsl(${pHsl.h},${pHsl.s}%,${pHsl.l}%), hsl(${pHsl.h},${pHsl.s}%,${pDark}%))`);
    setVar('--card-gradient', `linear-gradient(180deg, hsl(${pHsl.h},${bgS}%,${cardL}%) 0%, hsl(${pHsl.h},${bgS}%,${bgL}%) 100%)`);
    setVar('--card-gradient-warm', `linear-gradient(180deg, hsla(${pHsl.h},15%,${cardL + 1}%,0.5), hsla(${pHsl.h},${bgS}%,${bgL}%,0.95))`);
    setVar('--glass', `hsla(${pHsl.h}, ${bgS}%, ${bgL}%, 0.92)`);

    // Verify contrast
    const bgFinal = hslToHex(pHsl.h, bgS, bgL);
    const bodyContrast = getContrastRatio(textPrimary, bgFinal);
    const btnContrast = getContrastRatio(buttonText, primary);
    console.log(`[BrandTheme] Body text contrast: ${bodyContrast.toFixed(2)}, Button text contrast: ${btnContrast.toFixed(2)}`);
    if (bodyContrast < 4.5) console.warn('[BrandTheme] Body text contrast below 4.5:1, auto-adjusted');
    if (btnContrast < 4.5) console.warn('[BrandTheme] Button text contrast below 4.5:1, auto-adjusted');

    setTheme(prev => ({ ...prev, isApplied: true }));
    toast({ title: "Theme applied", description: "Brand colors updated across the entire app." });
  }, [theme.palette, enableTransition]);

  const resetTheme = useCallback(() => {
    enableTransition();
    for (const [key, val] of Object.entries(ORIGINAL_VARS)) {
      document.documentElement.style.setProperty(key, val);
    }
    // Clear inline styles to fall back to stylesheet
    for (const v of THEME_VARS) {
      document.documentElement.style.removeProperty(v);
    }
    if (theme.logoUrl) URL.revokeObjectURL(theme.logoUrl);
    setTheme({ logoUrl: null, palette: null, isApplied: false });
    toast({ title: "Theme reset", description: "Restored original brand colors." });
  }, [theme.logoUrl, enableTransition]);

  return (
    <BrandThemeContext.Provider value={{ theme, uploadLogo, applyTheme, resetTheme, isExtracting, showPanel, setShowPanel }}>
      {children}
    </BrandThemeContext.Provider>
  );
}

export function useBrandTheme() {
  const ctx = useContext(BrandThemeContext);
  if (!ctx) throw new Error('useBrandTheme must be used within BrandThemeProvider');
  return ctx;
}

function hslToHex(h: number, s: number, l: number): string {
  s /= 100; l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  const toHex = (v: number) => Math.round(v * 255).toString(16).padStart(2, '0');
  return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`;
}
