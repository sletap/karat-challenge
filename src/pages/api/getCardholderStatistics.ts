import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import stripe from "src/utils/getStripe";
import single from "src/utils/Single";
import { Metadata, WrongMethod, CategoryMap } from "src/utils/Types";

interface CardStatistics {
  currency: string;
  total_transactions: number;
  total_spend: number;
  average_spend: number;
  categories: CategoryMap;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CardStatistics | WrongMethod>
) {
  if (req.method == "GET") {
    const cardObject: Stripe.Issuing.Card = await stripe.issuing.cards.retrieve(
      process.env.CARD_ID
    );
    let metadata: Metadata = cardObject.metadata as Metadata;

    if (single.done == false || Object.keys(metadata).length === 0) {
      const metadataResponse = await fetch(
        "http://localhost:3000/api/postCardMetadata",
        { method: "POST" }
      );
      metadata = await metadataResponse.json();
      single.done = true;
    }

    const cardStatistics: CardStatistics = {
      currency: cardObject.currency,
      total_transactions: +metadata.total_transactions,
      total_spend: +metadata.total_spend,

      // convert both to numbers from strings
      // divide by 100 if its not a zero decimal currency
      // then make the precision to 2 decimal places
      average_spend: +(
        +metadata.total_spend /
        +metadata.total_transactions /
        100
      ).toFixed(2),

      categories: JSON.parse(cardObject.metadata.categories),
    };

    return res.status(200).json(cardStatistics);
  }
  return res.status(405).send({ message: "Incorrect method request" });
}
