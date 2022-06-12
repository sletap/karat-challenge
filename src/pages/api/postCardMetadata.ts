import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import stripe from "src/utils/getStripe";
import { Metadata, CategoryMap, WrongMethod } from "src/utils/Types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Metadata | WrongMethod>
) {
  if (req.method == "POST") {
    // TODO: account for the case where there are multiple currencies
    const transactions: any = await stripe.issuing.transactions.list({
      card: process.env.CARD_ID,
    });
    const transactionsList: Stripe.Issuing.Transaction[] = transactions.data;

    // get amount spent
    const total_spend: number = transactionsList
      .map((transaction) => {
        return transaction.amount;
      })
      .reduce((previousValue, currentValue) => {
        return previousValue + currentValue;
      });
    const category_count: CategoryMap = {};

    // get categories of spending
    transactionsList.reduce((map, transaction) => {
      const category: string = transaction.merchant_data.category;
      if (!map.hasOwnProperty(category)) {
        map[category] = 1;
      } else {
        map[category] += 1;
      }
      return map;
    }, category_count);

    const metadata: Metadata = {
      total_transactions: transactionsList.length.toString(),
      total_spend: total_spend.toString(),
      categories: JSON.stringify(category_count),
    };

    await stripe.issuing.cards.update(process.env.CARD_ID, {
      metadata: metadata,
    });

    return res.status(200).json(metadata);
  }
  return res.status(405).send({ message: "Incorrect method request" });
}
