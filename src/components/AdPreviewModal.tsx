import { useEffect, useState } from 'react';
import { X, ImageOff } from 'lucide-react';

interface AdPreviewModalProps {
  open: boolean;
  onClose: () => void;
}

export function AdPreviewModal({ open, onClose }: AdPreviewModalProps) {
  const [imgFailed, setImgFailed] = useState(false);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label="Original Kiralyte Campaign Ad Banner"
      onClick={onClose}
    >
      <div
        className="relative max-w-md w-full bg-white rounded-2xl border border-[#E4E7EC] p-4 sm:p-5 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 pb-3 border-b border-[#E4E7EC]">
          <div>
            <p className="text-sm font-semibold text-[#111315]">
              Campaign Ad Creative
            </p>
            <p className="text-xs text-[#525866]">
              Kiralyte Technology Solutions · Local Growth Offer
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close campaign creative preview"
            className="w-9 h-9 rounded-lg flex items-center justify-center text-[#525866] hover:text-[#111315] hover:bg-[#F2F4F7] transition-colors"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-4 rounded-xl overflow-hidden bg-[#F2F4F7] border border-[#E4E7EC]">
          {imgFailed ? (
            <div className="aspect-[3/4] flex flex-col items-center justify-center p-6 text-center text-[#525866]">
              <ImageOff className="w-8 h-8 mb-2" aria-hidden="true" />
              <p className="text-sm font-medium text-[#111315]">
                Kiralyte Campaign Banner
              </p>
              <p className="text-xs mt-1">
                Dancing on Social Media Is NOT a Marketing Strategy.
              </p>
            </div>
          ) : (
            <img
              src="/assets/aistudio/image_b441c121.png"
              alt="Kiralyte Technology Solutions campaign ad: Dancing on Social Media Is NOT a Marketing Strategy"
              referrerPolicy="no-referrer"
              onError={() => setImgFailed(true)}
              className="w-full h-auto max-h-[70vh] object-contain mx-auto block"
            />
          )}
        </div>
      </div>
    </div>
  );
}
