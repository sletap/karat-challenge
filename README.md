# Karat Financial Take Home Challenge

## Getting Started

0. Install the [stripe CLI tool](https://stripe.com/docs/stripe-cli) if you haven't already!

1. run `stripe listen --forward-to localhost:3000/api/getStripeWebhooks`

2. update `.env.local` with stripe keys and a stripe card id. The secret key can be retrieved [here](https://dashboard.stripe.com/test/apikeys). The webhook key can be found using the above `stripe listen` command, and CARD_ID takes any card_id (I've included two for testing purposes!)

3. install dependencies and run the development server!

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the dashboard!

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/{route}](http://localhost:3000/api/{route}). This endpoint can be edited in `pages/api/{route}.ts`.

![Dashboard Gif](https://media.giphy.com/media/6MXCuuo86CjFl7x9yf/giphy.gif)

<img width="1919" alt="image" src="https://user-images.githubusercontent.com/34560634/173299934-bfb60c68-0c6c-4861-8e71-3801cb2b211b.png">
<img width="1917" alt="image" src="https://user-images.githubusercontent.com/34560634/173299992-a4d24355-cfeb-4054-899c-d9146fafb1cd.png">
