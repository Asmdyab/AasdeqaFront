import React, { useRef, useState } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { uploadImage, assetUrl } from '../adminApi';

export const ImagePicker: React.FC<{
  url?: string | null;
  onPicked: (url: string) => void;
  label?: string;
}> = ({ url, onPicked, label = 'الصورة' }) => {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const ref = useRef<HTMLInputElement>(null);

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setBusy(true);
    setErr(null);
    try {
      const u = await uploadImage(f);
      onPicked(u);
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'فشل الرفع');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <div className="w-20 h-14 bg-neutral-100 border border-neutral-200 overflow-hidden flex items-center justify-center shrink-0">
        {url ? (
          <img src={assetUrl(url)} alt="" className="w-full h-full object-cover" />
        ) : (
          <ImageIcon className="w-5 h-5 text-neutral-400" />
        )}
      </div>
      <div className="flex flex-col gap-1">
        <button
          type="button"
          onClick={() => ref.current?.click()}
          disabled={busy}
          className="text-xs px-2.5 py-1.5 border border-neutral-300 rounded hover:border-[#a98136] cursor-pointer text-neutral-700 flex items-center gap-1.5"
        >
          <Upload className="w-3.5 h-3.5" />
          {busy ? 'جارٍ الرفع...' : label}
        </button>
        <input ref={ref} type="file" accept="image/*" className="hidden" onChange={onFile} />
        {err && <span className="text-[11px] text-red-600">{err}</span>}
      </div>
    </div>
  );
};

export const Field: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <label className="block">
    <span className="block text-xs text-neutral-500 mb-1">{label}</span>
    {children}
  </label>
);

export const inputCls =
  'w-full border border-neutral-300 rounded px-3 py-2 text-sm text-neutral-900 focus:outline-none focus:border-[#a98136]';
