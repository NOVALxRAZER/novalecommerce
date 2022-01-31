const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("./verifyToken");

router.post("/payment", verifyTokenAndAuthorization, (req, res) => {
    stripe.charges.create({
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: "idr",
    }, 
    (stripeRes, stripeErr) => {
        if(stripeRes){
            res.status(200).json(stripeRes);
        }else{
            res.status(500).json(stripeErr);
        }
    });
});

module.exports = router;