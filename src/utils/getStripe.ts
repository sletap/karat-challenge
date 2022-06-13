const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-03-02",
  typescript: true,
});

export default stripe;
