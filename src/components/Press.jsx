import React from 'react';
import allureLogo from '../assets/Allure_Logo.avif';
import vogueLogo from '../assets/Vogue_Logo.avif';
import byrdieLogo from '../assets/byrdie-logo.webp';
import peopleLogo from '../assets/People_Logo.webp';
import refineryLogo from '../assets/Refinery29_Logo.webp';
import mindbodyLogo from '../assets/MindBodyGreen_logo.webp';
import { useTranslation } from 'react-i18next';

const Press = () => {
  const { t } = useTranslation();
  return (
    <section className="bg-white py-12 px-4 sm:px-6 lg:px-8 text-center mb-8">
      {/* Heading */}
      <h2 className="m-10 text-3xl font-normal uppercase text-gray-800 mb-14 tracking-wide ">
        {t('heading')}
      </h2>

      {/* Logos grid */}
      <div className="flex flex-wrap justify-between items-center gap-20 max-w-6xl mx-auto">
         <img src={byrdieLogo} alt="Byrdie" className="h-8 sm:h-8 object-contain" />
        <img src={allureLogo} alt="Allure" className="h-6 sm:h-8 object-contain" />
        <img src={vogueLogo} alt="Vogue" className="h-6 sm:h-8 object-contain" />
        <img src={peopleLogo} alt="People" className="h-6 sm:h-8 object-contain" />
        <img src={refineryLogo} alt="Refinery29" className="h-6 sm:h-8 object-contain" />
        <img src={mindbodyLogo} alt="mindbodygreen" className="h-6 sm:h-8 object-contain" />
      </div>
    </section>
  );
};

export default Press;
