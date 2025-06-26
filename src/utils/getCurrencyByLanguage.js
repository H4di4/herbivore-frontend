import languageCurrencyMap from "../data/languageCurrencymap";
import currencies from "../data/currencyList";

// language → currency
export const getCurrencyByLanguage = (langCode) => {
  const currencyCode = languageCurrencyMap[langCode];
  return currencies.find(c => c.code === currencyCode);
};

// currency → language
export const getLanguageByCurrency = (currencyCode) => {
  const entry = Object.entries(languageCurrencyMap).find(
    ([lang, curr]) => curr === currencyCode
  );
  return entry ? entry[0] : null;
};
