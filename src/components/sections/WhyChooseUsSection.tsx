import React from 'react';
import { useShowroom } from '../../context/ShowroomContext';
import { Reveal } from '../../lib/motion';

const FALLBACK_POINTS = [
  {
    title: 'فحص موثق على 150 نقطة',
    desc: 'كل سيارة تخرج من الصالة بتقرير فحص كامل: المحرك، الهيكل، الطلاء، والأنظمة الإلكترونية.'
  },
  {
    title: 'السعر المعلن هو السعر النهائي',
    desc: 'بدون رسوم إدارية خفية أو إضافات مفروضة. ما تراه في الإعلان هو ما ستدفعه.'
  },
  {
    title: 'تمويل بالتعاون مع بنوك مصرية',
    desc: 'خطط تقسيط مرنة وموافقة مبدئية خلال 48 ساعة، مع تقييم فوري لسيارتك الحالية.'
  },
  {
    title: 'تسليم مغلق لكامل المحافظات',
    desc: 'شاحنات مغلقة ومكيّفة مع تأمين شامل حتى باب منزلك — أو استلم من صالة العرض.'
  }
];

const FALLBACK_STATS = [
  { value: '1200+', label: 'سيارة تم تسليمها' },
  { value: '150', label: 'نقطة فحص لكل سيارة' },
  { value: '٪100', label: 'أسعار معلنة بدون رسوم خفية' }
];

export const WhyChooseUsSection: React.FC = () => {
  const { t, dealership, cmsList } = useShowroom();

  const points = cmsList<{ title: string; desc: string }[]>('lists.whyChoosePoints', FALLBACK_POINTS);
  const stats = dealership?.stats && dealership.stats.length
    ? dealership.stats.map(s => ({ value: s.value, label: s.description || s.label }))
    : FALLBACK_STATS;

  return (
    <section className="py-20 lg:py-28 bg-ink border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Editorial numeral + statement */}
          <div className="lg:col-span-5">
            <p className="eyebrow mb-4 text-base sm:text-lg lg:text-xl">لماذا الأصدقاء</p>
            <div className="flex items-start gap-5">
              <span className="font-display text-7xl sm:text-8xl font-semibold text-[#a98136] leading-none" dir="ltr">
                12<span className="text-3xl align-top">+</span>
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-medium text-neutral-900 leading-snug pt-2">
                {t.whyChooseTitle}
              </h2>
            </div>
            <p className="mt-6 text-sm text-neutral-500 leading-relaxed max-w-md">
              {t.whyChooseSubtitle}
            </p>

            {/* Supporting stats */}
            <dl className="mt-10 space-y-0">
              {stats.map((s, i) => (
                <Reveal key={s.label} delay={i * 0.08} y={16}>
                  <div className="flex items-baseline gap-4 py-3.5 border-t border-neutral-200">
                    <dt className="font-mono text-lg text-neutral-900 w-20 shrink-0" dir="ltr">
                      {s.value}
                    </dt>
                    <dd className="text-sm text-neutral-500">{s.label}</dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>

          {/* Points as typographic rows */}
          <div className="lg:col-span-7 lg:pt-16">
            {points.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.07} y={22}>
                <div className={`py-7 border-t border-neutral-200 ${i === points.length - 1 ? 'border-b' : ''}`}>
                  <div className="flex items-baseline gap-5">
                    <span className="font-mono text-xs text-[#a98136]/70 shrink-0" dir="ltr">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="text-base sm:text-lg font-medium text-neutral-900">{p.title}</h3>
                      <p className="mt-1.5 text-sm text-neutral-500 leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
