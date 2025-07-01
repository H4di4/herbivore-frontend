import React, { useState, useRef, useEffect, useContext } from "react";
import currencies from "../data/currencyList";
import { LanguageContext } from "../context/LanguageContext";
import { useCurrency } from "../context/CurrencyContext";
import { getLanguageByCurrency } from "../utils/getCurrencyByLanguage";
import i18n from "i18next";

function CurrencySelector() {
  // Access current currency and setter from currency context
  const { currency, setCurrency } = useCurrency();

  // Access current language and setter from language context
  const { language, setLanguage } = useContext(LanguageContext);

  // State to track whether dropdown is open or closed
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Ref to dropdown container to detect clicks outside
  const dropdownRef = useRef(null);

  // Ref flag to prevent infinite loops between language and currency updates
  const isUpdatingFromLanguage = useRef(false);

  // Effect to close dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Effect to sync language with currency when currency changes
  useEffect(() => {
    if (isUpdatingFromLanguage.current) {
      // Ignore update triggered from language change itself to avoid infinite loop
      isUpdatingFromLanguage.current = false;
      return;
    }

    // Get language corresponding to current currency
    const newLang = getLanguageByCurrency(currency);

    // If language needs to update, update context and i18n language
    if (newLang && newLang !== language) {
      setLanguage(newLang);
      i18n.changeLanguage(newLang);
    }
  }, [currency]);

  // Find the selected currency object or default to USD if not found
  const selected = currencies.find((c) => c.code === currency) || { code: "USD", symbol: "$" };

  return (
    <div ref={dropdownRef} className="relative inline-block w-[100px] text-[12px]">
      {/* Button that toggles dropdown */}
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center justify-between gap-1 px-2 py-1 w-full text-left text-gray-600 border border-gray-300 rounded"
      >
        {/* Show selected currency code and symbol */}
        <span>
          {selected.code} {selected.symbol}
        </span>
        {/* Dropdown arrow icon with rotation animation */}
        <svg
          className={`h-4 w-4 transform transition-transform duration-200 ${dropdownOpen ? "rotate-180" : "rotate-0"}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown menu showing list of currencies */}
      {dropdownOpen && (
        <ul className="absolute mt-1 right-0.5 py-2 border bg-white w-64 max-h-60 overflow-auto z-10 shadow-lg text-[13px]">
          {currencies.map(({ country, code, symbol }) => (
            <li
              key={code}
              className={`px-4 py-2 cursor-pointer hover:text-black ${
                code === currency ? "text-black font-semibold" : "text-gray-600"
              }`}
              onClick={() => {
                // Set selected currency in context
                setCurrency(code);

                // Also update language when currency changes
                const newLang = getLanguageByCurrency(code);
                if (newLang && newLang !== language) {
                  setLanguage(newLang);
                  i18n.changeLanguage(newLang);
                }

                // Close dropdown after selection
                setDropdownOpen(false);
              }}
            >
              {/* Show country name with currency code and symbol */}
              {country} ({code} {symbol})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CurrencySelector;
