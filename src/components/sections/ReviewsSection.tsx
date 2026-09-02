import React from 'react';
import { Reveal, WordReveal } from '../../lib/motion';
import { Star } from 'lucide-react';
import { useShowroom } from '../../context/ShowroomContext';
import { CUSTOMER_REVIEWS } from '../../data/dealership';

export const ReviewsSection: React.FC = () => {
  const { t, reviews, cmsText } = useShowroom();
  const data = reviews && reviews.length ? reviews : CUSTOMER_REVIEWS.map((r, i) => ({
    id: i + 1, name: r.name, role: r.role, location: r.location,
    vehiclePurchased: r.vehiclePurchased, rating: r.rating, dateLabel: r.date,
    reviewText: r.review, verified: r.verified, sortOrder: i, avatarUrl: r.avatar
  }));

  return (
    <section className="py-20 lg:py-28 bg-ink border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="max-w-xl mb-12">
          <Reveal><p className="eyebrow mb-4 text-base sm:text-lg lg:text-xl">آراء العملاء</p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-neutral-900">
            <WordReveal text={t.reviewsTitle} />
          </h2>
            </Reveal>
        </div>

        {/* Understated review ledger */}
        <div>
          {data.map((rev, i) => (
            <figure
              key={rev.id}
              className={`grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-8 border-t border-neutral-200 ${
                i === data.length - 1 ? 'border-b' : ''
              }`}
            >
              {/* Identity column */}
              <figcaption className="md:col-span-4 flex flex-col gap-1.5">
                <span className="text-sm font-medium text-neutral-900">{rev.name}</span>
                <span className="text-xs text-neutral-500">{rev.role} · {rev.location}</span>
                <span className="text-[11px] text-neutral-600 mt-1" dir="ltr">{rev.vehiclePurchased}</span>
              </figcaption>

              {/* Review column */}
              <blockquote className="md:col-span-7 text-sm text-neutral-700 leading-relaxed">
                {rev.reviewText}
              </blockquote>

              {/* Rating / date column */}
              <div className="md:col-span-1 flex md:flex-col items-center md:items-end gap-2 justify-self-start md:justify-self-end">
                <div className="flex items-center gap-0.5" aria-label={`تقييم ${rev.rating} من 5`}>
                  {[...Array(5)].map((_, s) => (
                    <Star
                      key={s}
                      className={`w-3 h-3 ${s < rev.rating ? 'fill-[#a98136] text-[#a98136]' : 'text-neutral-800'}`}
                    />
                  ))}
                </div>
                <time className="text-[11px] text-neutral-600 whitespace-nowrap">{rev.dateLabel}</time>
              </div>
            </figure>
          ))}
        </div>

        <p className="mt-6 text-xs text-neutral-600">
          {cmsText('home.reviewsFooterNote', 'تقييمات موثقة من عملاء أكملوا عملية الشراء عبر الأصدقاء موتورز.')}
        </p>
      </div>
    </section>
  );
};
