import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import stripe from "src/utils/getStripe";
import { Metadata, CategoryMap, WrongMethod } from "src/utils/Types";
import { addCategoryToMap } from "src/utils/helpers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Metadata | WrongMethod>
) {
  if (req.method == "POST") {
    // Loop through all transactions. The max is 100,
    // so you may have to go through the object multiple times
    let has_more = true;
    let startAfterId = undefined;
    const transactionsList: Stripe.Issuing.Transaction[] = [];
    while (has_more) {
      const transactions = await stripe.issuing.transactions.list({
        card: process.env.CARD_ID,
        limit: 100,
        starting_after: startAfterId,
      });
      transactionsList.push(...transactions.data);
      if (transactions.has_more == false) {
        has_more = false;
      } else {
        const finalIndex = transactionsList.length - 1;
        startAfterId = transactionsList[finalIndex].id;
      }
    }

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
      return addCategoryToMap(map, category);
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
