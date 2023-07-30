const express = require('express');
const router = express.Router();
const stripe = require('stripe')('sk_test_51NSitcLZaqlFZMo5fBd2mzlIWKVE76NY95G8rqnVFG4tv4wpTxn8y0YQNy5voqtf8T75gDHDsYDRp6GfOUeoA9IT00lFRNqTbt');


router.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
      line_items: [
          {
            price: 'price_1NZhA4LZaqlFZMo5xgm73XYL',
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `http://localhost:3000/success`,
        cancel_url: `http://localhost:3000/cancel`,
    });
  
    res.send({url:session.url});
  });


  const endpointSecret = "whsec_8e676b5b9c60172c3d322b7708df4273c02c6cac28b3165fe141d0201eac3536";

  router.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
    let data;
    let eventType;
    let userid;
  
    // Check if webhook signing is configured.
    // let webhookSecret = 'whsec_2IYNsbMceoPw3T2w9TN19uP7Y6bVKcj1';
    // 'whsec_2IYNsbMceoPw3T2w9TN19uP7Y6bVKcj1';
  
    //webhookSecret = process.env.STRIPE_WEB_HOOK;
  
    if (endpointSecret) {
      // Retrieve the event by verifying the signature using the raw body and secret.
      let event;
      let signature = req.headers['stripe-signature'];
      let LogoImg;
  
      try {
        event = stripe.webhooks.constructEvent(req.rawBody, signature, endpointSecret);
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed:  ${err}`);
        return res.sendStatus(400);
      }
      // Extract the object from the event.
      data = event.data.object;
      eventType = event.type;
    //   userid = data.metadata.userid;
  
      if (eventType === 'checkout.session.completed') {
         console.log(data)
        // stripe.customers
        //   .retrieve(data.customer)
        //   .then(async (customer) => {
        //     try {
        //       // CREATE ORDER
        //       createOrder(customer, data);
        //     } catch (err) {
        //       console.log(typeof createOrder);
        //       console.log(err);
        //     }
        //   })
        //   .catch((err) => console.log(err.message));
      }
    } else {
      return res.status(400).send('Signing secret not found');
    }
  
    // Handle the checkout.session.completed event
  
    res.status(200).end();
  });

module.exports = router;