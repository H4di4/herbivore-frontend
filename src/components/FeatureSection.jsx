import React from 'react';
import webImg from "../assets/feature.webp";  // Import feature image asset
import { Link } from 'react-router-dom';      // For client-side routing
import { useTranslation } from 'react-i18next';  // For internationalization

const FeatureSection = () => {
  // useTranslation hook to get translation function `t`
  const { t } = useTranslation();

  return (
    // Section container with full width, light pink background,
    // flex layout switching from column (mobile) to row (md and up),
    // center alignment, and gap between children
    <section className="w-full bg-[rgb(255_249_250_/_1.0)] px-0 md:px-0 flex flex-col md:flex-row items-center gap-20">

      {/* Left side: Image container */}
      <div className="md:w-1/2">
        <img
          src={webImg}               // Image source imported above
          alt={t("feature.alt")}     // Alt text from translation for accessibility
          className="w-full m-0 p-0 object-cover"  // Responsive full width image with no margin/padding, cover cropping
        />
      </div>

      {/* Right side: Text content container */}
      <div className="md:w-1/2 w-full px-6 space-y-6">
        {/* Small subtitle, uppercase with tracking for spacing */}
        <h3 className="text-sm font-normal uppercase text-gray-800 tracking-widest">
          {t("feature.limitedEdition")}
        </h3>

        {/* Main title split into two lines, large text size, gray color */}
        <h2 className="text-4xl break-words font-normal text-gray-900 leading-tight">
          {t("feature.titleLine1")} <br /> {t("feature.titleLine2")}
        </h2>

        {/* Description paragraph with some bold text at the start */}
        <p className="text-sm text-gray-700 leading-relaxed max-w-md">
          <span className='font-bold'>{t("feature.savePercent")}</span> {t("feature.description")}
        </p>

        {/* Link to skincare page wrapping a button */}
        <Link to='/skincare'>
          <button className="mt-6 px-6 py-3 bg-transparent border text-black font-normal transition">
            {t("feature.shopNow")}
          </button>
        </Link>
      </div>
    </section>
  );
};

export default FeatureSection;
