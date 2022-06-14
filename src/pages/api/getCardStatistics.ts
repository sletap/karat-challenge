import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import stripe from "src/utils/getStripe";
import single from "src/utils/Single";
import { Metadata, WrongMethod, CardStatistics } from "src/utils/Types";
import { getMoneyInReadableForm } from "src/utils/helpers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CardStatistics | WrongMethod>
) {
  if (req.method == "GET") {
    // get card information
    const cardObject: Stripe.Issuing.Card = await stripe.issuing.cards.retrieve(
      process.env.CARD_ID
    );
    let metadata: Metadata = cardObject.metadata as Metadata;

    // create metadata if necessary
    // run once for sure, or run if the metadata keys get deleted
    if (single.done == false || Object.keys(metadata).length === 0) {
      const metadataResponse = await fetch(
        "http://localhost:3000/api/postCardMetadata",
        { method: "POST" }
      );
      metadata = await metadataResponse.json();
      single.done = true;
    }

    // set statistics
    let average_spend = 0;
    if (+metadata.total_transactions > 0) {
      average_spend = +metadata.total_spend / +metadata.total_transactions;
    }
    const cardStatistics: CardStatistics = {
      total_transactions: +metadata.total_transactions,
      total_spend: getMoneyInReadableForm(
        cardObject.currency,
        Math.abs(+metadata.total_spend)
      ),

      // convert both to numbers from strings
      // divide by 100 if its not a zero decimal currency
      // then make the precision to 2 decimal places
      average_spend: getMoneyInReadableForm(
        cardObject.currency,
        Math.abs(average_spend)
      ),

      // string of a map to object
      categories: JSON.parse(metadata.categories),
    };

    return res.status(200).json(cardStatistics);
  }
  return res.status(405).send({ message: "Incorrect method request" });
}
