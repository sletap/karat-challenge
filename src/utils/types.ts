interface Metadata {
  [key: string]: string;
  total_transactions: string;
  total_spend: string;
  categories: string;
}

interface WrongMethod {
  message: string;
}

interface CategoryMap {
  [key: string]: number;
}

export type { Metadata, WrongMethod, CategoryMap };
