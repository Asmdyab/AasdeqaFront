import React from 'react';
import { Reveal, WordReveal } from '../../lib/motion';
import { useShowroom } from '../../context/ShowroomContext';
import { assetUrl } from '../../lib/api';

export const AboutShowroomSection: React.FC = () => {
  const { navigateTo, t, cmsText, cmsImage } = useShowroom();
  const aboutImage = cmsImage(
    'img.aboutShowroom',
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=85'
  );

  return (
    <section className="bg-ink border-t border-neutral-200">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Full-bleed image half */}
        <div className="relative min-h-[320px] lg:min-h-[560px]">
          <img
            src={assetUrl(aboutImage)}
            alt="صالة عرض الأصدقاء موتورز"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Story half */}
        <div className="flex items-center">
          <div className="px-6 lg:px-14 py-16 lg:py-24 max-w-xl">
            <Reveal><p className="eyebrow mb-4 text-base sm:text-lg lg:text-xl">صالة العرض</p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-neutral-900 leading-snug">
              <WordReveal text={t.aboutHeritageTitle} />
              <span className="block text-neutral-500 text-xl sm:text-2xl font-normal mt-2 leading-relaxed">
                {t.aboutHeritageSubtitle}
              </span>
            </h2>
            </Reveal>

            <p className="mt-6 text-sm text-neutral-500 leading-relaxed">
              {cmsText(
                'home.aboutParagraph',
                'من قلب القاهرة الجديدة، نستورد ونبيع السيارات الفاخرة والرياضية بمعايير واضحة: فحص موثق، سعر معلن، وتسليم في الموعد. لا مفاوضات مرهقة ولا مفاجآت في العقد.'
              )}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => navigateTo('cars')} className="btn btn-gold btn-sm">
                {cmsText('home.aboutBtn', 'استعرض المعرض')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
