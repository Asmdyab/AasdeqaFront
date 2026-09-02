import React from 'react';

export const CURRENCY = 'جم';

export const formatAmount = (amount: number): string => {
  if (typeof amount !== 'number' || isNaN(amount)) return '0';
  return amount.toLocaleString('en-US');
};

/* Currency lives in its OWN span, always rendered first (left of the
   amount). Styles are inherited from the parent/container. */
export const PriceTag: React.FC<{
  amount: number;
  className?: string;
  currencyClassName?: string;
}> = ({ amount, className, currencyClassName }) => (
  <span dir="ltr" className={`inline-flex items-baseline gap-1 ${className ?? ''}`}>
    <span className={currencyClassName}>{CURRENCY}</span>
    <span>{formatAmount(amount)}</span>
  </span>
);
