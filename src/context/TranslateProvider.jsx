// TranslateProvider.jsx
import React, { useContext, useEffect } from 'react';
import { LanguageProvider, LanguageContext } from './LanguageContext';
import { CurrencyProvider, useCurrency } from './CurrencyContext';
import languageCurrencyMap from '../data/languageCurrencymap';

// Create reverse map: currency -> language
const currencyLanguageMap = Object.entries(languageCurrencyMap).reduce((acc, [lang, curr]) => {
  acc[curr] = lang;
  return acc;
}, {});

export const TranslateProvider = ({ children }) => {
  return (
    <LanguageProvider>
      <CurrencyProvider>
        <SyncLanguageCurrency />
        {children}
      </CurrencyProvider>
    </LanguageProvider>
  );
};

const SyncLanguageCurrency = () => {
  const { language, setLanguage } = useContext(LanguageContext);
  const { currency, setCurrency } = useCurrency();

  useEffect(() => {
    console.log("SyncLanguageCurrency running");
    console.log("Current language:", language);
    console.log("Current currency:", currency);

    const expectedCurrency = languageCurrencyMap[language];
    const expectedLanguage = currencyLanguageMap[currency];

    if (currency !== expectedCurrency) {
      console.log(`Setting currency from ${currency} to ${expectedCurrency}`);
      setCurrency(expectedCurrency);
    } else if (language !== expectedLanguage) {
      console.log(`Setting language from ${language} to ${expectedLanguage}`);
      setLanguage(expectedLanguage);
    }
  }, [language, currency, setCurrency, setLanguage]);

  return null;
};

