const router = require('express').Router();

const stripe = require("stripe")(process.env.STRIPE_KEY)

router.posr("/payment", (req, res) => {
  stripe.charges.create({
    source: req.body.tokenId,
    amount: req.body.amount,
    currency: "usd",
  }, (stripeErr, stripeRes)=> {
    if(stripeErr){
      res.status(500).json(stripeErr);
    } else {
      res.status(200).json(stripeRes);
    }
  })
})

export default router;