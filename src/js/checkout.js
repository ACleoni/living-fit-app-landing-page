import { 
  getApp 
} from "@firebase/app";
import {
  getStripePayments, 
  createCheckoutSession,
 } from "@invertase/firestore-stripe-payments";

export async function getCheckoutSession() {
  const app = getApp();
  const payments = getStripePayments(app, {
    productsCollection: "products",
    customersCollection: "users",
  });

  const session = await createCheckoutSession(payments, {
    price: process.env.STRIPE_PRICE_ID,
    success_url: `${window.location.origin}?success=true&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${window.location.origin}?cancel`,
    trial_period_days: 7,
    allow_promotion_codes: true,
  });
  return session
}


