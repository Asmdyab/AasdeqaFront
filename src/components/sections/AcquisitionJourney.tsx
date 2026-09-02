import React, { useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useMotionValueEvent,
  AnimatePresence,
  useReducedMotion
} from 'motion/react';
import { Reveal, EASE } from '../../lib/motion';
import { useShowroom } from '../../context/ShowroomContext';

interface JourneyStep {
  title: string;
  desc: string;
  detail: string;
}

const FALLBACK_STEPS: JourneyStep[] = [
  {
    title: 'اختر سيارتك',
    desc: 'تصفح المخزون كاملاً بأسعار معلنة نهائية، وقارن المواصفات جنباً إلى جنب، واحفظ اختياراتك في الجراج.',
    detail: 'أكثر من 40 سيارة متوفرة للمعاينة الفورية'
  },
  {
    title: 'احجز معاينة وتجربة قيادة',
    desc: 'موعد خاص في صالة التجمع الخامس — أو ابدأ بفيديو معاينة مباشر على واتساب قبل ما تتحرك.',
    detail: 'مواعيد مسائية متاحة حتى 10 مساءً'
  },
  {
    title: 'افحص ووثّق',
    desc: 'تقرير فحص على 150 نقطة وسجل صيانة كامل أمامك قبل أي دفعة. الشفافية هنا ليست ميزة — هي السياسة.',
    detail: 'تقرير الفحص يُسلَّم لك نسخة ورقية ورقمية'
  },
  {
    title: 'موّل واستلم',
    desc: 'موافقة تمويل مبدئية خلال 48 ساعة بالتعاون مع بنوك مصرية، وتقييم فوري لسيارتك الحالية كدفعة أولى.',
    detail: 'تسليم مغلق مكيّف لأي محافظة مع تأمين شامل'
  }
];

/** Sticky scroll-scrubbed acquisition journey — desktop scrub, mobile reveal */
export const AcquisitionJourney: React.FC = () => {
  const reduce = useReducedMotion();
  const { cmsList, cmsText } = useShowroom();
  const steps = cmsList<JourneyStep[]>('lists.acquisitionSteps', FALLBACK_STEPS);
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end']
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });
  const lineScale = useSpring(scrollYProgress, { stiffness: 120, damping: 26 });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const idx = Math.min(steps.length - 1, Math.floor(v * steps.length + 0.15));
    setActive(idx < 0 ? 0 : idx);
  });

  return (
    <section className="bg-ink border-t border-neutral-200">
      {/* ---------- Desktop: sticky scrub ---------- */}
      <div
        ref={sectionRef as React.RefObject<HTMLDivElement>}
        className="hidden lg:block relative"
        style={{ height: `${steps.length * 80}vh` }}
      >
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full grid grid-cols-12 gap-16 items-center">
            {/* Header + progress rail (start side) */}
            <div className="col-span-5">
               <p className="eyebrow mb-4 text-base sm:text-lg lg:text-xl">{cmsText('home.acquisitionEyebrow', 'رحلة الشراء')}</p>
              <h2 className="font-display text-4xl xl:text-5xl font-medium text-neutral-900 leading-snug">
                {cmsText('home.acquisitionTitle1', 'من أول نظرة')}
                <span className="block text-[#a98136]">{cmsText('home.acquisitionTitle2', 'لمفتاح في إيدك')}</span>
              </h2>

              {/* Vertical progress line */}
              <div className="relative mt-10 h-32 w-px bg-neutral-200 ms-1" aria-hidden>
                <motion.span
                  className="absolute top-0 inset-x-0 h-full bg-[#a98136] origin-top"
                  style={{ scaleY: reduce ? 1 : lineScale }}
                />
              </div>

              {/* Step markers */}
              <ol className="mt-8 space-y-4">
                {steps.map((s, i) => (
                  <li key={s.title} className="flex items-center gap-3">
                    <motion.span
                      animate={{
                        width: active === i ? 22 : 8,
                        backgroundColor: active >= i ? '#a98136' : 'rgba(9,9,11,0.15)'
                      }}
                      transition={{ type: 'spring', stiffness: 250, damping: 25 }}
                      className="h-1 shrink-0 rounded-full"
                      aria-hidden
                    />
                    <motion.span
                      animate={{ color: active === i ? '#ffffff' : 'rgba(161,161,170,0.6)' }}
                      className="text-sm font-medium"
                    >
                      {s.title}
                    </motion.span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Swapping step panel */}
            <div className="col-span-7 [perspective:1200px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 36, rotateX: -10 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, y: -24, rotateX: 8, transition: { duration: 0.25 } }}
                  transition={{ duration: 0.55, ease: EASE }}
                  className="border border-neutral-200 bg-surface p-10 xl:p-14"
                >
                  <span className="font-mono text-sm text-[#a98136]" dir="ltr">
                    {String(active + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}
                  </span>
                  <h3 className="mt-5 font-display text-2xl xl:text-3xl font-medium text-neutral-900">
                    {steps[active].title}
                  </h3>
                  <p className="mt-4 text-base text-neutral-500 leading-relaxed max-w-lg">
                    {steps[active].desc}
                  </p>
                  <div className="mt-8 pt-6 border-t border-neutral-200 flex items-center gap-3">
                    <span className="w-1 h-1 bg-[#a98136] rotate-45 shrink-0" aria-hidden />
                    <p className="text-xs text-neutral-500">{steps[active].detail}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Mobile / reduced-motion: simple reveals ---------- */}
      <div className="lg:hidden py-20">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <p className="eyebrow mb-4 text-base sm:text-lg lg:text-xl">{cmsText('home.acquisitionEyebrow', 'رحلة الشراء')}</p>
            <h2 className="font-display text-4xl font-medium text-neutral-900 leading-snug">
              {cmsText('home.acquisitionTitle1', 'من أول نظرة')} <span className="text-[#a98136]">{cmsText('home.acquisitionTitle2', 'لمفتاح في إيدك')}</span>
            </h2>
          </Reveal>
          <ol className="mt-12 space-y-0">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08}>
                <li className={`py-7 border-t border-neutral-200 ${i === steps.length - 1 ? 'border-b' : ''}`}>
                  <span className="font-mono text-xs text-[#a98136]/70" dir="ltr">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-2 text-lg font-medium text-neutral-900">{s.title}</h3>
                  <p className="mt-1.5 text-sm text-neutral-500 leading-relaxed">{s.desc}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};
