import React from 'react';
import { useTranslation } from 'react-i18next';
import bgImage from '../assets/Newsletter.jpg';

const Newsletter = () => {
  const { t } = useTranslation();

  return (
    <section
      className="relative bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Overlay to make text readable */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl md:text-3xl font-normal mb-6">
          {t('newsletter.heading')}
        </h2>
        <p className="text-sm md:text-base mb-8">
          {t('newsletter.description')}
        </p>

        {/* Email input and button */}
        <form className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto">
          <input
            type="email"
            placeholder={t('newsletter.emailPlaceholder')}
            className="w-full sm:w-auto px-4 py-2 text-black placeholder-gray-500 border border-gray-300 focus:outline-none"
            required
          />
          <button
            type="submit"
            className="px-6 py-2 w-52 bg-white text-black border border-black transition"
          >
            {t('newsletter.button')}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
