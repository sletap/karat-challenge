import getSymbolFromCurrency from "currency-symbol-map";
import { CategoryMap } from "./Types";

// Gathered from Stripe Documentation
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

// example: turns amusement_park into Amusement Park
export function snakeCaseToReadableString(str: string): string {
  return str
    .split("_")
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export function getMoneyInReadableForm(currency: string, amount: number) {
  const symbol = getSymbolFromCurrency(currency);
  if (!isZeroDecimalCurrency(currency)) {
    return symbol + (amount / 100).toFixed(2).toString();
  } else {
    return symbol + amount.toString();
  }
}
export function addCategoryToMap(category_map: CategoryMap, category: string) {
  if (category_map.hasOwnProperty(category)) {
    category_map[category] += 1;
  } else {
    category_map[category] = 1;
  }
  return category_map;
}
