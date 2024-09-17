
const stripe = require('stripe')

export default function Stripe() {
  return stripe(process.env.STRIPE_API_KEY);
}
