import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import stripe from "src/utils/getStripe";
import { CategoryMap, Metadata } from "src/utils/Types";
import { addCategoryToMap } from "src/utils/helpers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    const event = req.body;
    if (event.type === "issuing_transaction.created") {
      const transaction: Stripe.Issuing.Transaction = event.data.object;

      // don't waste time making stripe calls if the webhook was for a different card
      if (event.data.object.card !== process.env.CARD_ID) {
        return res.status(200).json({ received: true });
      }

      // get metadata
      const cardObject: Stripe.Issuing.Card =
        await stripe.issuing.cards.retrieve(process.env.CARD_ID);

      // update metadata
      const metadata: Metadata = cardObject.metadata as Metadata;

      // the metadata has to be in string form
      metadata.total_transactions = (
        +metadata.total_transactions + 1
      ).toString();

      metadata.total_spend = (
        +metadata.total_spend + transaction.amount
      ).toString();

      const category: string = transaction.merchant_data.category;
      const category_map: CategoryMap = JSON.parse(metadata.categories);
      metadata.categories = JSON.stringify(
        addCategoryToMap(category_map, category)
      );

      // push metadata
      await stripe.issuing.cards.update(process.env.CARD_ID, {
        metadata: metadata,
      });
    }
    return res.status(200).json({ received: true });
  }
  return res.status(405).send({ message: "Incorrect method request" });
}
