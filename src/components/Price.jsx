import { useCurrency } from '../context/CurrencyContext';

export default function Price({ amount }) {
  // Get current currency and exchange rates from context
  const { currency, exchangeRates } = useCurrency();
    console.log('Price.jsx:', { amount, currency, exchangeRates });  // <-- DEBUG HERE

  // Define base currency fallback (usually the currency the amount is originally in)
  const baseCurrency = 'USD';

  // Check if exchange rate for the selected currency exists; otherwise fallback to baseCurrency
  const selectedCurrency = exchangeRates?.[currency] ? currency : baseCurrency;

  // Get exchange rate for selected currency, fallback to 1 (no conversion)
  const rate = exchangeRates?.[selectedCurrency] || 1;

  // Convert amount using exchange rate
  const convertedAmount = amount * rate;

  // Format the converted amount as currency string according to locale and selected currency
  const formattedPrice = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: selectedCurrency,
  }).format(convertedAmount);

  // Render the formatted price
  return <span>{formattedPrice}</span>;
}
