import { useCallback, useRef, useState } from "react";
import { useBrandTheme } from "@/contexts/BrandThemeContext";
import { X, Upload, RotateCcw, Paintbrush, Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const BrandThemingPanel = () => {
  const { theme, uploadLogo, applyTheme, resetTheme, isExtracting, showPanel, setShowPanel } = useBrandTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = useCallback((file: File) => {
    uploadLogo(file);
  }, [uploadLogo]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  return (
    <AnimatePresence>
      {showPanel && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-x-0 top-14 z-40 max-w-lg mx-auto"
        >
          <div className="mx-3 rounded-xl border border-border bg-card shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <div className="flex items-center gap-2">
                <Paintbrush size={16} className="text-primary" />
                <span className="text-sm font-semibold text-foreground tracking-wide uppercase" style={{ fontFamily: 'var(--font-body)' }}>
                  Brand Theming
                </span>
              </div>
              <button onClick={() => setShowPanel(false)} className="p-1 rounded-lg hover:bg-secondary">
                <X size={16} className="text-muted-foreground" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              {/* Upload zone */}
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={() => setDragOver(false)}
                onClick={() => fileInputRef.current?.click()}
                className={`relative flex flex-col items-center justify-center gap-2 p-6 rounded-lg border-2 border-dashed cursor-pointer transition-all ${
                  dragOver
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/40 hover:bg-secondary/30'
                }`}
              >
                {isExtracting ? (
                  <Loader2 size={24} className="text-primary animate-spin" />
                ) : theme.logoUrl ? (
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-secondary flex items-center justify-center overflow-hidden border border-border">
                      <img src={theme.logoUrl} alt="Uploaded logo" className="w-14 h-14 object-contain" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-medium text-foreground">Logo uploaded</p>
                      <p className="text-xs text-muted-foreground">Tap to replace</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <Upload size={20} className="text-muted-foreground" />
                    <p className="text-xs text-muted-foreground text-center">
                      Drop your logo here or tap to upload
                      <br />
                      <span className="text-[10px]">PNG, JPG, SVG, WebP · Max 5MB</span>
                    </p>
                  </>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/svg+xml,image/webp"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFile(file);
                    e.target.value = '';
                  }}
                />
              </div>

              {/* Color swatches */}
              {theme.palette && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Extracted Palette</span>
                  </div>
                  <div className="flex gap-2">
                    {theme.palette.colors.map((color, i) => (
                      <div key={i} className="flex flex-col items-center gap-1.5">
                        <div
                          className={`w-10 h-10 rounded-lg border-2 shadow-sm ${
                            color === theme.palette!.primary
                              ? 'border-foreground'
                              : color === theme.palette!.accent
                              ? 'border-foreground/50'
                              : 'border-border'
                          }`}
                          style={{ backgroundColor: color }}
                        />
                        <span className="text-[9px] text-muted-foreground font-mono">{color}</span>
                        {color === theme.palette!.primary && (
                          <span className="text-[8px] font-bold text-primary uppercase">Primary</span>
                        )}
                        {color === theme.palette!.accent && (
                          <span className="text-[8px] font-bold text-accent uppercase">Accent</span>
                        )}
                        {color === theme.palette!.secondary && color !== theme.palette!.primary && color !== theme.palette!.accent && (
                          <span className="text-[8px] font-bold text-secondary-foreground uppercase">Secondary</span>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Live preview */}
                  <div className="p-3 rounded-lg border border-border bg-secondary/30 space-y-2">
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Preview</span>
                    <div className="flex gap-2 items-center">
                      <div
                        className="px-4 py-2 rounded-lg text-xs font-bold"
                        style={{ background: theme.palette.primary, color: getContrastText(theme.palette.primary) }}
                      >
                        Primary Button
                      </div>
                      <div
                        className="px-4 py-2 rounded-lg text-xs font-bold"
                        style={{ background: theme.palette.accent, color: getContrastText(theme.palette.accent) }}
                      >
                        Accent
                      </div>
                    </div>
                    <div
                      className="p-3 rounded-lg text-xs"
                      style={{
                        background: darken(theme.palette.primary, 0.85),
                        borderLeft: `3px solid ${theme.palette.primary}`,
                        color: '#ffffff',
                      }}
                    >
                      Sample card with brand colors
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  onClick={applyTheme}
                  disabled={!theme.palette}
                  className="flex-1 gap-1.5"
                  size="sm"
                >
                  <Check size={14} />
                  {theme.isApplied ? 'Reapply Theme' : 'Apply Theme'}
                </Button>
                <Button
                  onClick={resetTheme}
                  variant="outline"
                  size="sm"
                  className="gap-1.5"
                  disabled={!theme.isApplied && !theme.palette}
                >
                  <RotateCcw size={14} />
                  Reset
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

function getContrastText(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? '#000000' : '#ffffff';
}

function darken(hex: string, amount: number): string {
  const r = Math.round(parseInt(hex.slice(1, 3), 16) * (1 - amount));
  const g = Math.round(parseInt(hex.slice(3, 5), 16) * (1 - amount));
  const b = Math.round(parseInt(hex.slice(5, 7), 16) * (1 - amount));
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

export default BrandThemingPanel;
