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

app.post("/getKeys", async (req, res) => {
  try {
    const { email, amount } = req.body;
    const customer = await stripe.customers.list({
      email: email,
    });
    const customerID = customer.data[0].id;
    console.log("Customer ID: ", customerID);

    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customerID },
      { apiVersion: "2020-08-27" }
    );
    const setupIntent = await stripe.setupIntents.create({
      customer: customerID,
      automatic_payment_methods: {
        enabled: true,
      },
    });
    res.json({
      setupIntent: setupIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customerID,
      publishableKey:
        "pk_test_51KOZh6FdnCXohRp9VBt2xN8tznUqyorgUVyXDZxuTgL8LaCyOCl1FjbGxX1UXOl7KUZhBiigOTamG7SmtpI0QqA300dQwmgauG",
    });

    // const clientSecret = paymentIntent.client_secret;
    // res.json({ clientSecret });
  } catch (error) {
    console.log(error);
  }
});

app.post("/add-payment-method", async (req, res) => {
  try {
    const { email, cardNumber } = req.body;
    const customer = await stripe.customers.list({
      email: email,
    });
    const customerID = customer.data[0].id;
    console.log("Customer ID: ", customerID);

    const paymentMethod = await stripe.paymentMethods.create({
      type: "card",
      card: {
        number: cardNumber,
        exp_month: 8,
        exp_year: 2021,
        cvc: "314",
      },
    });
    console.log("Payment Method Created!");

    const paymentMethodToAttach = await stripe.paymentMethods.attach(
      paymentMethod.id,
      {
        customer: customerID,
      }
    );
    console.log("Payment Method Attached!");
    res.json({ paymentMethodToAttach });
  } catch (error) {
    console.log(error);
  }
});

app.post("/payment", async (req, res) => {
  try {
    const { email, amount, method } = req.body;
    const customer = await stripe.customers.list({
      email: email,
    });
    const customerID = customer.data[0].id;
    console.log("Customer ID: ", customerID);
    console.log("Method: ", method);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "mxn",
      customer: customerID,
      payment_method_types: ["card"],
      payment_method: method,
      off_session: true,
      confirm: true,
    });

    const clientSecret = paymentIntent.client_secret;
    console.log("Payment Successful!");
    res.json({ clientSecret });
  } catch (error) {
    console.log(error);
  }
});

app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});
