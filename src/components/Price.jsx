import { useCurrency } from '../context/CurrencyContext';

export default function Price({ amount }) {
  const { currency, exchangeRates } = useCurrency();
  const baseCurrency = 'USD';

  const selectedCurrency = exchangeRates?.[currency] ? currency : baseCurrency;
  const rate = exchangeRates?.[selectedCurrency] || 1;
  const convertedAmount = amount * rate;

  const formattedPrice = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: selectedCurrency,
  }).format(convertedAmount);

  return <span>{formattedPrice}</span>;
}
