import React, { useState } from 'react';
import { Vehicle } from '../../types/vehicle';
import { useShowroom } from '../../context/ShowroomContext';
import { Maximize2, RotateCw, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { assetUrl } from '../../lib/api';

interface VehicleGalleryProps {
  vehicle: Vehicle;
}

export const VehicleGallery: React.FC<VehicleGalleryProps> = ({ vehicle }) => {
  const { t } = useShowroom();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [is360Mode, setIs360Mode] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);

  const images = vehicle.images;
  const currentImage = images[selectedIndex] || images[0];

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleDragRotate = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!is360Mode || e.buttons !== 1) return;
    setRotationAngle((prev) => (prev + e.movementX * 1.5) % 360);
    const step = Math.abs(Math.floor((rotationAngle % 360) / (360 / images.length)));
    setSelectedIndex(step % images.length);
  };

  return (
    <div className="select-none">
      {/* Full-bleed stage */}
      <div
        className="relative w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/10] overflow-hidden bg-black group cursor-pointer"
        onMouseMove={handleDragRotate}
        onClick={() => setIsFullscreen(true)}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={selectedIndex}
            src={assetUrl(currentImage.url)}
            alt={currentImage.caption}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </AnimatePresence>

        {/* Readability scrim */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

        {/* Top-right tools */}
        <div className="absolute top-5 end-5 flex items-center gap-2 opacity-90 group-hover:opacity-100 transition-opacity">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIs360Mode(!is360Mode);
            }}
            aria-pressed={is360Mode}
            title={t.view360}
            className={`p-2.5 border transition-colors ${
              is360Mode
                ? 'bg-[#a98136] text-white border-[#a98136]'
                : 'bg-black/55 text-white border-white/25 hover:bg-black/80'
            }`}
          >
            <RotateCw className="w-4 h-4" strokeWidth={1.75} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsFullscreen(true);
            }}
            title="عرض بالحجم الكامل"
            className="p-2.5 bg-black/55 text-white border border-white/25 hover:bg-black/80 transition-colors"
          >
            <Maximize2 className="w-4 h-4" strokeWidth={1.75} />
          </button>
        </div>

        {/* Caption / counter */}
        <div className="absolute bottom-4 start-5 flex items-baseline gap-3 text-xs">
          <span className="text-white">{currentImage.caption}</span>
          <span className="font-mono text-white/70" dir="ltr">
            {selectedIndex + 1} / {images.length}
          </span>
          {is360Mode && (
            <span className="text-white hidden sm:inline">اسحب أفقياً للتدوير</span>
          )}
        </div>

        {/* Prev / next */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="الصورة السابقة"
          className="absolute start-4 top-1/2 -translate-y-1/2 p-2.5 bg-black/55 text-white hover:bg-black/85 transition-all opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
        >
          <ChevronRight className="w-5 h-5" strokeWidth={1.75} />
        </button>
        <button
          type="button"
          onClick={handleNext}
          aria-label="الصورة التالية"
          className="absolute end-4 top-1/2 -translate-y-1/2 p-2.5 bg-black/55 text-white hover:bg-black/85 transition-all opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
        >
          <ChevronLeft className="w-5 h-5" strokeWidth={1.75} />
        </button>
      </div>

      {/* Thumbnails */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 mt-4">
        <div className="flex items-stretch gap-2 overflow-x-auto pb-1" role="tablist" aria-label="صور السيارة">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              role="tab"
              aria-selected={selectedIndex === idx}
              onClick={() => setSelectedIndex(idx)}
              className={`relative shrink-0 w-24 sm:w-32 aspect-[16/10] overflow-hidden transition-opacity duration-200 ${
                selectedIndex === idx ? 'ring-1 ring-[#a98136]' : 'opacity-50 hover:opacity-90'
              }`}
            >
              <img src={assetUrl(img.url)} alt="" loading="lazy" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Fullscreen viewer */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-label="عرض الصورة بالحجم الكامل"
            className="fixed inset-0 z-50 bg-black/97 backdrop-blur-sm flex flex-col p-4 sm:p-6"
          >
            <div className="flex items-center justify-between pb-4">
              <p className="text-sm text-white">
                {vehicle.brand} {vehicle.model}
                <span className="text-white/60 font-mono ms-3" dir="ltr">
                  {selectedIndex + 1}/{images.length}
                </span>
              </p>
              <button
                type="button"
                onClick={() => setIsFullscreen(false)}
                className="p-2 text-white/70 hover:text-white transition-colors"
                aria-label="إغلاق"
                autoFocus
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative flex-1 min-h-0">
              <img
                src={assetUrl(currentImage.url)}
                alt={currentImage.caption}
                className="absolute inset-0 w-full h-full object-contain"
              />
              <button
                type="button"
                onClick={handlePrev}
                aria-label="السابق"
                className="absolute start-3 top-1/2 -translate-y-1/2 p-3 bg-black/60 text-white hover:bg-black transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="التالي"
                className="absolute end-3 top-1/2 -translate-y-1/2 p-3 bg-black/60 text-white hover:bg-black transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            </div>

            <div className="flex justify-center gap-2 pt-4 overflow-x-auto">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedIndex(idx)}
                  aria-label={`صورة ${idx + 1}`}
                  className={`w-14 h-10 shrink-0 overflow-hidden transition-opacity ${
                    selectedIndex === idx ? 'ring-1 ring-[#a98136]' : 'opacity-40 hover:opacity-80'
                  }`}
                >
                  <img src={assetUrl(img.url)} alt="" loading="lazy" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
