// Find a decent currency library, or port commerceguys/intl to JavaScript. 😱

const currencySymbols = {
  USD: '$',
  GBP: '£',
  CAD: 'CA$',
  EUR: '€',
};
const currencyFormat = {
  USD: '¤#',
  GBP: '#¤',
  CAD: '¤#',
  EUR: '# ¤',
};

export function formatCurrency(currencyCode, number) {
  let formatted = currencyFormat[currencyCode].replace('¤', currencySymbols[currencyCode]);
  formatted = formatted.replace('#', parseFloat(number).toFixed(2).toLocaleString());
  return formatted
}
