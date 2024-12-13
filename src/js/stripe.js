
const stripe = require('stripe')

let stripeObject;

function initializeStripe(apiKey, priceId) {
  stripeObject = {
    instance: stripe(apiKey),
    priceId
  }
}

export { initializeStripe, stripeObject}
