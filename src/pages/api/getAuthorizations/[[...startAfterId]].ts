import type { NextApiRequest, NextApiResponse } from "next";
import { WrongMethod } from "src/utils/Types";
import Stripe from "stripe";
import stripe from "src/utils/getStripe";

interface Authorization {
  id: string;
  amount: number;
  created: number;
  currency: string;
  approved: boolean;
  merchant_data: Stripe.Issuing.Authorization.MerchantData;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Authorization[] | WrongMethod>
) {
  const { startAfterId } = req.query;
  if (req.method == "GET") {
    const fullAuths: any = await stripe.issuing.authorizations.list({
      limit: 100,
      card: process.env.CARD_ID,
      starting_after: startAfterId?.[0],
    });
    const authorizations: Stripe.Issuing.Authorization[] = fullAuths.data;
    const relevantAuthorizations: Authorization[] = [];

    authorizations.forEach((item) => {
      const transaction: Authorization = {
        id: item.id,
        amount: item.amount,
        currency: item.currency,
        created: item.created,
        approved: item.approved,
        merchant_data: item.merchant_data,
      };
      relevantAuthorizations.push(transaction);
    });

    return res.status(200).json(relevantAuthorizations);
  }
  return res.status(405).send({ message: "Incorrect method request" });
}
