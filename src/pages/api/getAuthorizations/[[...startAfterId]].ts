import type { NextApiRequest, NextApiResponse } from "next";
import { Authorization, Authorizations, WrongMethod } from "src/utils/Types";
import Stripe from "stripe";
import stripe from "src/utils/getStripe";
import { getMoneyInReadableForm } from "src/utils/helpers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Authorizations | WrongMethod>
) {
  const { startAfterId } = req.query;
  if (req.method == "GET") {
    // get 50 authorizations, which is a reasonable amount
    // max is 100 per call
    const maxAuths: any = await stripe.issuing.authorizations.list({
      limit: 50,
      card: process.env.CARD_ID,
      starting_after: startAfterId?.[0],
    });
    const authorizations: Stripe.Issuing.Authorization[] = maxAuths.data;
    const relevantAuthorizations: Authorization[] = [];

    authorizations.forEach((item) => {
      const transaction: Authorization = {
        id: item.id,
        amount: getMoneyInReadableForm(item.currency, item.amount),
        created: new Date(item.created * 1000).toLocaleString(),
        approved: item.approved,
        merchant_data: item.merchant_data,
      };

      relevantAuthorizations.push(transaction);
    });

    return res.status(200).json({
      has_more: maxAuths.has_more,
      authorizations: relevantAuthorizations,
    });
  }
  return res.status(405).send({ message: "Incorrect method request" });
}
