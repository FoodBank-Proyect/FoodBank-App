require("dotenv").config();
const express = require("express");
const cors = require("cors");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();
const Port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Create a customer in Stripe
app.post("/create-customer", async (req, res) => {
  try {
    // Id a user with the email already exists, return the customer id
    const { email } = req.body;
    const customer = await stripe.customers.list({
      email: email,
    });
    if (customer.data.length) {
      res.json({ customer });
      console.log("Customer Already Exists!");
      return;
    }
    const customerToCreate = await stripe.customers.create({
      email: email,
    });
    // return the customer id
    res.json({ customerToCreate });
    console.log("Customer Created!");
  } catch (error) {
    console.log(error);
  }
});

app.post("/payment-methods", async (req, res) => {
  try {
    const { email } = req.body;
    const customer = await stripe.customers.list({
      email: email,
    });
    const customerID = customer.data[0].id;
    const paymentMethods = await stripe.paymentMethods.list({
      customer: customerID,
      type: "card",
    });
    res.json({ paymentMethods });
    console.log("Payment Methods Sent!");
  } catch (error) {
    console.log(error);
  }
});

app.post("/payment", async (req, res) => {
  try {
    const { email, amount } = req.body;
    const customer = await stripe.customers.list({
      email: email,
    });
    const customerID = customer.data[0].id;
    console.log("Customer ID: ", customerID);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      setup_future_usage: "off_session",
      customer: customerID,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    const clientSecret = paymentIntent.client_secret;
    res.json({ clientSecret });
  } catch (error) {
    console.log(error);
  }
});

app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});
