import React from 'react';
import { BrandsSection } from '../components/sections/BrandsSection';
import { BrandMarquee } from '../components/sections/BrandMarquee';

export const BrandsPage: React.FC = () => (
  <div className="pt-16">
    <BrandMarquee />
    <BrandsSection />
  </div>
);
