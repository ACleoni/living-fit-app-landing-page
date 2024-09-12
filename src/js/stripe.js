import { getApp } from "@firebase/app";
import { 
  getStripePayments, 
  createCheckoutSession,
  onCurrentUserSubscriptionUpdate
 } from "@invertase/firestore-stripe-payments";


export async function getCheckoutSession() {
  const app = getApp();
  const payments = getStripePayments(app, {
    productsCollection: "products",
    customersCollection: "users",
  });

  const session = await createCheckoutSession(payments, {
    price: process.env.STRIPE_PRICE_ID,
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
    trial_period_days: 7,
    allow_promotion_codes: true,
  });

  const unsubscribe = onCurrentUserSubscriptionUpdate(
    payments,
    (snapshot) => {
      for (const change of snapshot.changes) {
        if (change.type === "added") {
          console.log(`New subscription added with ID: ${change.subscription.id}`);
        }
      }
    }
  );

  return {
    session,
    unsubscribe,
  };
}


