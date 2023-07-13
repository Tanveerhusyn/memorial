import { loadStripe } from '@stripe/stripe-js';

let stripePromise;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe('pk_test_51N4T41Bc97enoUfc9CDmr8QPhqJsO42Ra3IemthYc9540RNfNJM5lGEtGenUaKAX0pDoG2Kpdpd4RW3zqXzm8UGM00GMdRKWzk');
  }
  return stripePromise;
};

export default getStripe;