import React from 'react';
import { AboutShowroomSection } from '../components/sections/AboutShowroomSection';
import { WhyChooseUsSection } from '../components/sections/WhyChooseUsSection';
import { AcquisitionJourney } from '../components/sections/AcquisitionJourney';

export const AboutPage: React.FC = () => (
  <div className="pt-16">
    <AboutShowroomSection />
    <WhyChooseUsSection />
    <AcquisitionJourney />
  </div>
);
