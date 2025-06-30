import React, { useState, useRef, useEffect, useContext } from "react";
import currencies from "../data/currencyList";
import { LanguageContext } from "../context/LanguageContext";
import { useCurrency } from "../context/CurrencyContext";
import { getLanguageByCurrency } from "../utils/getCurrencyByLanguage";
import i18n from "i18next";

function CurrencySelector() {
  const { currency, setCurrency } = useCurrency();
  const { language, setLanguage } = useContext(LanguageContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // This ref prevents infinite loops by ignoring updates from each other
  const isUpdatingFromLanguage = useRef(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isUpdatingFromLanguage.current) {
      // This update was triggered from language change, so ignore it here
      isUpdatingFromLanguage.current = false;
      return;
    }

    const newLang = getLanguageByCurrency(currency);
    if (newLang && newLang !== language) {
      setLanguage(newLang);
      i18n.changeLanguage(newLang);
    }
  }, [currency]);



  const selected = currencies.find((c) => c.code === currency) || { code: "USD", symbol: "$" };

  return (
    <div ref={dropdownRef} className="relative inline-block w-[100px] text-[12px]">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center justify-between gap-1 px-2 py-1 w-full text-left text-gray-600 border border-gray-300 rounded"
      >
        <span>
          {selected.code} {selected.symbol}
        </span>
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

      {dropdownOpen && (
        <ul className="absolute mt-1 right-0.5 py-2 border bg-white w-64 max-h-60 overflow-auto z-10 shadow-lg text-[13px]">
          {currencies.map(({ country, code, symbol }) => (
            <li
              key={code}
              className={`px-4 py-2 cursor-pointer hover:text-black ${code === currency ? "text-black font-semibold" : "text-gray-600"
                }`}
              onClick={() => {
                setCurrency(code);

                const newLang = getLanguageByCurrency(code);
                if (newLang && newLang !== language) {
                  setLanguage(newLang);
                  i18n.changeLanguage(newLang);
                }

                setDropdownOpen(false);
              }}

            >
              {country} ({code} {symbol})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CurrencySelector;
