import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import stripe from "src/utils/getStripe";
import { CategoryMap, Metadata } from "src/utils/Types";

// TODO: refactor in some way?
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    const event = req.body;
    if (event.type === "issuing_transaction.created") {
      const transaction: Stripe.Issuing.Transaction = event.data.object;
      if (event.data.object.card !== process.env.CARD_ID) {
        // don't waste time making calls if the webhook was on a different card
        return res.status(200).json({ received: true });
      }

      // get metadata
      const cardObject: Stripe.Issuing.Card =
        await stripe.issuing.cards.retrieve(process.env.CARD_ID);

      // update metadata
      // note: I wanted the typing for Metadata but this suggesion I found feels hacky?
      const metadata: Metadata = cardObject.metadata as unknown as Metadata;

      metadata.total_transactions = (
        +metadata.total_transactions + 1
      ).toString();

      metadata.total_spend = (
        +metadata.total_spend + transaction.amount
      ).toString();

      const category: string = transaction.merchant_data.category;
      const category_map: CategoryMap = JSON.parse(metadata.categories);
      if (category_map.hasOwnProperty(category)) {
        category_map[category] += 1;
      } else {
        category_map[category] = 1;
      }
      metadata.categories = JSON.stringify(category_map);

      // push metadata
      await stripe.issuing.cards.update(process.env.CARD_ID, {
        metadata: metadata,
      });
    }
    return res.status(200).json({ received: true });
  }
  return res.status(405).send({ message: "Incorrect method request" });
}
