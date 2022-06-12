import Stripe from "stripe";

interface Authorization {
  id: string;
  amount: string;
  created: string;
  approved: boolean;
  merchant_data: Stripe.Issuing.Authorization.MerchantData;
}

interface Authorizations {
  has_more: boolean;
  authorizations: Authorization[];
}

interface CardStatistics {
  total_transactions: number;
  total_spend: string;
  average_spend: string;
  categories: CategoryMap;
}

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

export type {
  Authorization,
  Authorizations,
  CardStatistics,
  Metadata,
  WrongMethod,
  CategoryMap,
};
