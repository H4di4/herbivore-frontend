import React from 'react';
import webImg from "../assets/feature.webp";
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const FeatureSection = () => {
  const { t } = useTranslation();

  return (
    <section className="w-full bg-[rgb(255_249_250_/_1.0)] px-0 md:px-0 flex flex-col md:flex-row items-center gap-20">

      {/* Left side - Image */}
      <div className="md:w-1/2">
        <img
          src={webImg}
          alt={t("feature.alt")}
          className="w-full m-0 p-0 object-cover "
        />
      </div>

      {/* Right side - Text Content */}
      <div className=" md:w-1/2 w-full px-6 space-y-6">
        <h3 className="text-sm font-normal uppercase text-gray-800 tracking-widest">
          {t("feature.limitedEdition")}
        </h3>
        <h2 className="text-4xl  break-words font-normal text-gray-900 leading-tight  ">
          {t("feature.titleLine1")} <br /> {t("feature.titleLine2")}
        </h2>
        <p className="text-sm text-gray-700 leading-relaxed max-w-md">
          <span className='font-bold'>{t("feature.savePercent")}</span> {t("feature.description")}
        </p>
        <Link to='/skincare'>
          <button className="mt-6 px-6 py-3 bg-transparent border  text-black font-normal transition">
            {t("feature.shopNow")}
          </button>
        </Link>
      </div>
    </section>
  );
};

export default FeatureSection;
