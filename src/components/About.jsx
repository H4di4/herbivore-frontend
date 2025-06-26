import React from 'react';
import aboutImage from '../assets/about1.webp';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-white ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        {/* Left: Image */}
        <div className="w-full h-full">
          <img
            src={aboutImage}
            alt={t('about.alt')}
            className="w-full h-auto object-cover "
          />
        </div>

        {/* Right: Content */}
        <div className="text-left">
          <h3 className="text-sm font-normal uppercase text-gray-800 ">
            {t('about.title')}
          </h3>
          <h2 className="text-4xl font-normal text-gray-800 mb-4 leading-relaxed">
            {t('about.headingLine1')} <br /> {t('about.headingLine2')}
          </h2>
          <p className="text-black text-sm font-normal mb-4 whitespace-pre-line">
            {t('about.description')}
          </p>

          <a
            href="/about"
            className="inline-block text-sm border outline-0 border-gray-400 px-8 py-2"
          >
            {t('about.button')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
