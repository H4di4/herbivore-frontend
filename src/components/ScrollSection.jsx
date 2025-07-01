import React from 'react';
import { useTranslation } from 'react-i18next';

const ScrollSection = () => {
  // useTranslation hook to get translation function `t`
  const { t } = useTranslation();

  // Array of texts to scroll, each translated using keys from translation files
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
    // Wrapper div with full width, overflow hidden to hide scroll overflow,
    // and border on top and bottom
    <div className="w-full overflow-hidden border-t border-b border-gray-200 bg-white">
      
      {/* 
        Container for the scrolling texts
        - whitespace-nowrap prevents line breaks so text stays in one line
        - flex layout to align items horizontally
        - space-x-10 adds horizontal spacing between each text span
        - py-4 px-6 adds vertical and horizontal padding
      */}
      <div className="animate-scroll whitespace-nowrap flex space-x-10 py-4 px-6">
        
        {/* 
          Mapping over an array that contains two copies of scrollingTexts to 
          create a seamless infinite scrolling effect
          Each text is rendered inside a span with styling:
          - inline-block so spacing works correctly
          - text-xs for small font size
          - tracking-wide to increase letter spacing
          - uppercase to make all letters capital
          - cursor-pointer to show pointer cursor on hover
          - text-black for black text color
        */}
        {[...scrollingTexts, ...scrollingTexts].map((text, idx) => (
          <span
            key={idx}
            className="inline-block text-xs tracking-wide uppercase cursor-pointer text-black"
          >
            {text}
          </span>
        ))}
      </div>

      {/* Inline CSS styles for scroll animation */}
      <style>{`
        /* Define the keyframes for horizontal scroll animation */
        @keyframes scroll {
          0% {
            transform: translateX(0); /* start fully visible */
          }
          100% {
            transform: translateX(-50%); /* move left by 50% of container width */
          }
        }

        /* Animate the scroll container using the defined keyframes */
        .animate-scroll {
          display: inline-flex; /* keep children in a row */
          animation: scroll 50s linear infinite; /* scroll continuously over 50 seconds */
        }
      `}</style>
    </div>
  );
};

export default ScrollSection;
