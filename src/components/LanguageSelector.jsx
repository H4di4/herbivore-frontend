import React, { useContext, useState, useRef, useEffect } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import languages from '../data/languageList';
import i18n from 'i18next';

export default function LanguageSelector() {
  const { language, setLanguage } = useContext(LanguageContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (code) => {
    setLanguage(code);
    i18n.changeLanguage(code);
    setDropdownOpen(false);
  };

  const selectedLang = languages.find((l) => l.code === language);

  return (
    <div ref={dropdownRef} className="relative inline-block w-[120px] text-[12px]">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center justify-between gap-1 px-2 py-1 w-full text-left text-gray-600 border border-gray-300 rounded"
      >
        <span>{selectedLang ? selectedLang.label : 'Select Language'}</span>
        <svg
          className={`h-4 w-4 transform transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : 'rotate-0'
            }`}
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
          {languages.map(({ code, label }) => (
            <li
              key={code}
              className={`px-4 py-2 cursor-pointer hover:text-black ${code === language ? 'text-black font-semibold' : 'text-gray-600'
                }`}
              onClick={() => handleSelect(code)}
            >
              {label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
