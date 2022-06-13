import type { NextApiRequest, NextApiResponse } from "next";
import stripe from "src/utils/getStripe";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    const topup = await stripe.topups.create({
      destination_balance: "issuing",
      amount: 100,
      currency: "usd",
      description: "Top-up for Issuing",
      statement_descriptor: "Top-up",
    });
    return res.status(200).json(topup);
  }
  return res.status(405).send({ message: "Incorrect method request" });
}
