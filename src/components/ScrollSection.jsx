import React from 'react';
import { useTranslation } from 'react-i18next';

const ScrollSection = () => {
  const { t } = useTranslation();

  const scrollingTexts = [
    t("scroll.cLeanBeauty"),
    t("scroll.hydration"),
    t("scroll.glowingSkin"),
    t("scroll.plantBased"),
    t("scroll.ninetyNinePercentNatural"),
    t("scroll.naturalIngredients"),
    t("scroll.sustainable"),
    t("scroll.vegan"),
    t("scroll.ecoConscious"),
    t("scroll.organicFormulas"),
    t("scroll.awardWinning"),
    t("scroll.parabenFree"),
  ];

  return (
    <div className="w-full overflow-hidden border-t border-b border-gray-200 bg-white">
      {/* Container for scrolling */}
      <div className="animate-scroll whitespace-nowrap flex space-x-10 py-4 px-6">
        {/* Repeat twice for smooth looping */}
        {[...scrollingTexts, ...scrollingTexts].map((text, idx) => (
          <span
            key={idx}
            className="inline-block text-xs tracking-wide uppercase cursor-pointer text-black"
          >
            {text}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          display: inline-flex;
          animation: scroll 50s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default ScrollSection;
