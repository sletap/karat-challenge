const stripe = require("stripe")(process.env.SECRET_KEY, {
  apiVersion: "2020-03-02",
  typescript: true,
});

export default stripe;
