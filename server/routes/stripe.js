import express from 'express';
import stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

const stripeWithToken = stripe(process.env.STRIPE_KEY)

router.post("/payment", (req, res) => {
  stripeWithToken.charges.create({
    source: req.body.tokenId,
    amount: req.body.amount,
    currency: "usd",
  }, (stripeErr, stripeRes)=> {
    if(stripeErr){
      console.error(stripeErr);
      res.status(500).json(stripeErr);
    } else {
      res.status(200).json(stripeRes);
    }
  })
})

export default router;