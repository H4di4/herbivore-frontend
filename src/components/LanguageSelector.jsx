import React, { useContext, useState, useRef, useEffect } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import languages from '../data/languageList';
import i18n from 'i18next';

export default function LanguageSelector() {
  // Access the current language and its setter function from context
  const { language, setLanguage } = useContext(LanguageContext);

  // State to track whether dropdown is open or closed
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Ref for the dropdown container to detect clicks outside it
  const dropdownRef = useRef(null);

  // Effect to handle clicks outside the dropdown and close it
  useEffect(() => {
    function handleClickOutside(e) {
      // If click happens outside dropdown, close the dropdown
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }

    // Attach event listener for clicks
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup event listener on component unmount
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handler for when a language is selected from dropdown
  const handleSelect = (code) => {
    setLanguage(code);        // Update language context
    i18n.changeLanguage(code); // Change language for i18next translation
    setDropdownOpen(false);   // Close dropdown after selection
  };

  // Find the currently selected language object for display
  const selectedLang = languages.find((l) => l.code === language);

  return (
    <div ref={dropdownRef} className="relative inline-block w-[120px] text-[12px]">
      {/* Button that toggles dropdown */}
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center justify-between gap-1 px-2 py-1 w-full text-left text-gray-600 border border-gray-300 rounded"
      >
        {/* Show selected language label or default text */}
        <span>{selectedLang ? selectedLang.label : 'Select Language'}</span>

        {/* Dropdown arrow icon that rotates when open */}
        <svg
          className={`h-4 w-4 transform transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : 'rotate-0'}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown list of languages */}
      {dropdownOpen && (
        <ul className="absolute mt-1 right-0.5 py-2 border bg-white w-64 max-h-60 overflow-auto z-10 shadow-lg text-[13px]">
          {languages.map(({ code, label }) => (
            <li
              key={code}
              className={`px-4 py-2 cursor-pointer hover:text-black ${code === language ? 'text-black font-semibold' : 'text-gray-600'}`}
              onClick={() => handleSelect(code)} // Select language on click
            >
              {label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
