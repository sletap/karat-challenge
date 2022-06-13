# Karat Financial Take Home Challenge

## Getting Started

0. Install the [stripe CLI tool](https://stripe.com/docs/stripe-cli) if you haven't already!

1. run `stripe listen --forward-to localhost:3000/api/getStripeWebhooks`

2. update `.env.local` with stripe keys and a stripe card id. The secret key can be retrieved [here](https://dashboard.stripe.com/test/apikeys). The webhook key can be found using the above `stripe listen` command, and CARD_ID takes any card_id (I've included two for testing purposes!)

3. run the development server!

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the dashboard!

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/{route}](http://localhost:3000/api/{route}). This endpoint can be edited in `pages/api/{route}.ts`.

![Dashboard Gif](https://media.giphy.com/media/6MXCuuo86CjFl7x9yf/giphy.gif)

<img width="1919" alt="image" src="https://user-images.githubusercontent.com/34560634/173299934-bfb60c68-0c6c-4861-8e71-3801cb2b211b.png">
<img width="1917" alt="image" src="https://user-images.githubusercontent.com/34560634/173299992-a4d24355-cfeb-4054-899c-d9146fafb1cd.png">

# Questions:

## How would I optimize load time more:

Use a cache! On first load, store all of the information that we're displaying in redis. If we get more authorizations by clicking the `get more` button, we can store these in the cache as well

Now on a fresh new page load, display all of the information that we have in the cache, and then update both the cache and the page once we've done a fetch and seen whether there's more data that we need to show on the screen

## How much time did I spend?

probably somewhere around 15 hours, split up across a few days

It was my first time using Next, TypeScript, Chakra, and the Stripe API so there was a little bit of a fun learning curve there!

## Things I enjoyed:

Working with NextJS, Typescript and Stripe for the first time! These are all things that I've been wanting to try for a while but I hadn't spent the time to make it happen, so this was a great opportunity to do so!

While I was refactoring parts of the backend, Typescript saved me time multiple times. For example, I changed a type definition, and I instantly knew which files I needed to make changes in because of type mismatches it warns me about!

Things I did not enjoy:
I thought that Stripe would have some sort of api to get common statistics, but I could find no such thing. As a result, I ended up using the metadata object to store useful info and manipulating that with webhooks.

## How else might you have improved your solution given more time?

I'd think about being able to sort or filter the table in some way. It doesn't look like the ui library I used makes that super easy, but with the support of a helper library it would be doable.

The caching of data as mentioned above

Getting a code review from someone who is more familiar with typescript would be great to learn more about best practices as well!

Writing tests -- I would definitely write them if this were to go out in production, but didn't in the interest of time. Would definitely do this as a follow up if required!

## Open Questions:

Can a single card have charges in multiple currencies? I couldn't see an example of this nor could I add one from the console, but if this is true than the average and sum functions would need to be changed. This is definitely something that I would spend more time looking into if I worked on this project more!

## Thank you!

Thank you for taking the time to take a look at this! I'm happy to make changes and improvements based on your comments :)
