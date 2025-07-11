import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Newsletter from './Newsletter';
import Footer from './Footer';
import aboutUs from '../assets/aboutUs.webp';
import valueImg1 from '../assets/value1.webp';
import valueImg2 from '../assets/value2.webp';
import valueImg3 from '../assets/value3.webp';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  const { t } = useTranslation();

  // Slides data for company values (images and text)
  const valuesSlides = [
    { img: valueImg1, text: "Cruelty-Free & Vegan" },
    { img: valueImg2, text: "Sustainably Sourced Ingredients" },
    { img: valueImg3, text: "Transparent & Ethical" },
  ];

  // State to track current slide index
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide effect every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % valuesSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [valuesSlides.length]);

  return (
    <div className="bg-white text-gray-900">
      <section className="bg-white text-gray-900 px-6 py-8 sm:px-12 lg:px-24 text-center">
        <div className="max-w-5xl mx-auto">
          {/* Section title */}
          <h2 className="text-2xl font-normal mb-8">{t('about.title')}</h2>

          {/* Introductory paragraph */}
          <p className="text-sm leading-relaxed tracking-wide mb-6">
            {t('about.intro')}
          </p>

          {/* Main about image */}
          <img
            src={aboutUs}
            alt="Herbivore Botanicals"
            className="w-full max-w-full mx-auto shadow-md rounded-lg mb-8"
          />

          {/* Detailed description */}
          <p className="text-sm text-black leading-relaxed tracking-wide mb-12">
            {t('about.description')}
          </p>

          {/* Link to skincare products */}
          <Link
            to='/skincare'
            className="mt-4 px-6 py-3 border text-sm uppercase bg-transparent text-black tracking-widest transition"
          >
            {t('about.button')}
          </Link>
        </div>
      </section>

      {/* Newsletter subscription section */}
      <Newsletter />

      {/* Footer section */}
      <Footer />
    </div>
  );
};

export default AboutUs;
