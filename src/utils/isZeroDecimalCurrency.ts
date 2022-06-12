const zeroDecimalCurrencies = new Set<string>([
  "BIF",
  "CLP",
  "DJF",
  "GNF",
  "JPY",
  "KMF",
  "KRW",
  "MGA",
  "PYG",
  "RWF",
  "UGX",
  "VND",
  "VUV",
  "XAF",
  "XOF",
  "XPF",
]);

function isZeroDecimalCurrency(currency: string): boolean {
  return zeroDecimalCurrencies.has(currency);
}

export default { isZeroDecimalCurrency };
